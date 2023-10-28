const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

const s3 = new AWS.S3();
const bucketName = 'chatapp112';


async function uploadFileToS3(file,fileName,messageId) {

  const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file.data,
      ACL: 'public-read',
      Metadata:{
        'messageId':messageId
      },
  };

  try {
      const data = await s3.upload(params).promise();
      console.log("uploaded")
      return data.Location; // URL of the uploaded file
  } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw error;
  }
}

// Function to retrieve a file from S3
function retrieveFileFromS3(fileName) {
  const params = {
    Bucket: bucketName,
    Key: fileName,
  };

  return new Promise((resolve, reject) => {
    s3.getObject(params, (err, data) => {
      if (err) {
        console.error('Error retrieving file from S3:', err);
        reject(err);
      }

      resolve(data);
    });
  });
}

module.exports = {
  uploadFileToS3,
  retrieveFileFromS3,
};
