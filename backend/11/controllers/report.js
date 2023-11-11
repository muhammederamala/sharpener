const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs'); // Import the 'fs' module
const path = require('path');
const mongoose = require('mongoose')


const User = require('../models/user');
const Expense = require('../models/expense');
const File = require('../models/files')

// Define a function to get the yearly report
async function getYearlyReport(userId) {
    const expenses = await Expense.find({userId: userId,})
    .select('name category amount createdAt')
    .exec();

    const expensesByYear = {};
    expenses.forEach((expense) => {
        const date = new Date(expense.createdAt);
        const year = date.getFullYear();
        if (!expensesByYear[year]) {
            expensesByYear[year] = [];
        }
        expensesByYear[year].push(expense);
    });

    const report = [];
    for (const [year, yearExpenses] of Object.entries(expensesByYear)) {
        const yearData = {
            year: year,
            expenses: yearExpenses.map((expense) => ({
                name: expense.name,
                category: expense.category,
                amount: expense.amount,
            })),
        };
        report.push(yearData);
    }

    return report;
}

async function getMonthlyReport(userId) {
    const expenses = await Expense.find({userId: userId,})
    .select('name category amount createdAt')
    .exec();

    const expensesByMonth = {};
    expenses.forEach((expense) => {
        const date = new Date(expense.createdAt);
        const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
        if (!expensesByMonth[monthYear]) {
            expensesByMonth[monthYear] = [];
        }
        expensesByMonth[monthYear].push(expense);
    });

    const report = [];
    for (const [monthYear, monthExpenses] of Object.entries(expensesByMonth)) {
        const monthData = {
            monthYear: monthYear,
            expenses: monthExpenses.map((expense) => ({
                name: expense.name,
                category: expense.category,
                amount: expense.amount,
            })),
        };
        report.push(monthData);
    }

    return report;
}

exports.getAllReports = async (req, res, next) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id)

        // Find the user's username
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const monthlyReport = await getMonthlyReport(userId);
        const yearlyReport = await getYearlyReport(userId);

        // Return both reports as a JSON object
        const reports = {
            monthlyReport,
            yearlyReport,
        };


        // Return the JSON object
        return res.status(200).json(reports);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


// Load environment variables from .env file
dotenv.config();

// Initialize AWS SDK with your credentials
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1', // Specify the region code 'us-east-1'
});

// Create an S3 instance
const s3 = new aws.S3();

// Set up Multer for handling file uploads to S3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'expensetracker10',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read', // Set the appropriate ACL for your use case
        key: function (req, file, cb) {
            // Generate a unique key for the file (e.g., a timestamped filename)
            const uniqueFileName = Date.now() + '-' + file.originalname;
            cb(null, uniqueFileName);
        },
    }),
});

exports.uploadCSV = async (req, res) => {
    try {
        const userId = req.user.id;

        // Generate CSV data for the monthly report
        const monthlyReport = await getMonthlyReport(userId);
        
        // Generate CSV data for the yearly report
        const yearlyReport = await getYearlyReport(userId);

        // Define headers for the CSV files
        const monthlyCsvHeader = [
            { id: 'name', title: 'Name' },
            { id: 'category', title: 'Category' },
            { id: 'amount', title: 'Amount' },
        ];

        const yearlyCsvHeader = [
            { id: 'year', title: 'Year' },
            { id: 'name', title: 'Name' },
            { id: 'category', title: 'Category' },
            { id: 'amount', title: 'Amount' },
        ];

        // Create a CSV writer for the monthly report
        const monthlyCsvWriter = createCsvWriter({
            path: 'monthly_report.csv', // Temporary file to store the monthly report
            header: monthlyCsvHeader,
        });

        // Create a CSV writer for the yearly report
        const yearlyCsvWriter = createCsvWriter({
            path: 'yearly_report.csv', // Temporary file to store the yearly report
            header: yearlyCsvHeader,
        });

        // Write the monthly and yearly report data to the temporary CSV files
        await monthlyCsvWriter.writeRecords(monthlyReport[0].expenses);
        await yearlyCsvWriter.writeRecords(yearlyReport);

        let reportType = req.query.reportType; // Get the report type from the query parameter

        let s3Key, fileName;
        if (reportType === 'monthly') {
            s3Key = `monthly_report_${Date.now()}.csv`;
            fileName = 'monthly_report.csv';
        } else if (reportType === 'yearly') {
            s3Key = `yearly_report_${Date.now()}.csv`;
            fileName = 'yearly_report.csv';
        } else {
            return res.status(400).json({ error: 'Invalid report type' });
        }

        // Upload the monthly and yearly CSV files to S3
        const uploadParams = {
            Bucket: 'expensetracker10', // S3 bucket name
            Key: s3Key, // S3 key for the monthly report file
            Body: fs.createReadStream('monthly_report.csv'), // Read the file from local storage
            ContentType: 'text/csv', // Set the content type
            ACL: 'public-read',
        };

        // Upload the files to S3
        const response = await s3.upload(uploadParams).promise()

        await File.create({
            link:response.Location,
            type:reportType,
            userId:userId
        })

        // Respond with success
        res.status(200).json({
            reportUrl: response.Location,
        });
    } catch (error) {
        console.error('Error generating and uploading CSV files to S3:', error);
        res.status(500).json({ error: 'Failed to generate and upload CSV files to S3' });
    }
};

exports.getAllDownloads = async (req,res,next) =>{
    try{
        const userId = req.user.id
        const response = await File.find({userId:userId})
        res.status(200).json(response)
    }
    catch(err){
        console.log(err)
    }
}

exports.getDownloadPage = async (req,res,next) =>{
    try{
        const filePath = path.join(__dirname, '../public/expense/downloads.html');
        res.sendFile(filePath)
    }
    catch(err){
        console.log(err)
    }
}