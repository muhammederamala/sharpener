// Function to populate a table with data and column names
async function populateTable(tableId, title, columnNames, data) {
    const tableContainer = document.createElement("div");

    // Create a title for the table and apply CSS styling
    const titleElement = document.createElement("h2");
    titleElement.textContent = title;
    titleElement.style.marginTop = "20px"; // Add margin-top
    tableContainer.appendChild(titleElement);

    if(title === 'Monthly Report'){
        const downloadButton = document.createElement("button");
        downloadButton.textContent = 'Download';
        downloadButton.setAttribute('id', 'downloadMonthlyReportButton');

        downloadButton.style.backgroundColor = 'blue';
        downloadButton.style.color = 'white';
        downloadButton.style.border = 'none';
        downloadButton.style.padding = '5px 10px';
        downloadButton.style.cursor = 'pointer';
        tableContainer.appendChild(downloadButton)
    }
    else if(title === 'Yearly Report'){
        const downloadButton = document.createElement("button");
        downloadButton.textContent = 'Download';
        downloadButton.setAttribute('id', 'downloadYearlyReportButton');

        downloadButton.style.backgroundColor = 'blue';
        downloadButton.style.color = 'white';
        downloadButton.style.border = 'none';
        downloadButton.style.padding = '5px 10px';
        downloadButton.style.cursor = 'pointer';
        tableContainer.appendChild(downloadButton)
    }

    const table = document.createElement("table");
    table.id = tableId;
    table.className = "report-table";

    // Create a table header row and apply CSS styling
    const headerRow = table.insertRow();
    columnNames.forEach((columnName) => {
        const headerCell = document.createElement("th");
        headerCell.textContent = columnName;
        headerCell.style.backgroundColor = "#f2f2f2"; // Add background color to headers
        headerCell.style.padding = "8px"; // Add padding to headers
        headerRow.appendChild(headerCell);
    });

    // Loop through data and populate the table
    for (const report of data) {
        const row = table.insertRow();
        for (const columnName of columnNames) {
            const cell = row.insertCell();
            cell.textContent = report[columnName.toLowerCase()]; // Assuming data keys match column names
            cell.style.border = "1px solid #ddd"; // Add border to cells
            cell.style.padding = "8px"; // Add padding to cells
        }
    }

    // Apply CSS styling to the table container
    tableContainer.style.border = "1px solid #ddd"; // Add border to the table container
    tableContainer.style.padding = "10px"; // Add padding to the table container

    tableContainer.appendChild(table);
    document.body.appendChild(tableContainer);
}

// Function to make an Axios request to the backend and retrieve user data
async function getUserData() {
    const token = localStorage.getItem("Token");
    console.log(token, "This is the user token");
    const baseURL = window.location.protocol + '//' + window.location.host;

    try {
        const response = await axios.get(`${baseURL}/report/get-all-reports`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const responseData = response.data;
        console.log("Response Data:", responseData);

        // Define column names for your tables
        const monthlyColumnNames = ["Name", "Category", "Amount"];
        const yearlyColumnNames = ["Name", "Category", "Amount"];

        // Populate the tables with the response data and column names
        await populateTable('monthlyReport', 'Monthly Report', monthlyColumnNames, responseData.monthlyReport[0].expenses);
        await populateTable('yearlyReport', 'Yearly Report', yearlyColumnNames, responseData.yearlyReport[0].expenses);
    } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error, e.g., show an error message to the user
    }
}

// Call getUserData when the page is loaded or in response to an event
window.addEventListener('load', getUserData);

// JavaScript code to handle report download
// Add an event listener to a parent element that contains the download buttons
document.body.addEventListener('click', async function (event) {
    // Check if the clicked element is a download button with a specific id
    if (event.target.id === 'downloadMonthlyReportButton') {
        event.preventDefault(); // Prevent the default behavior of navigating to a new page

        try {
            const token = localStorage.getItem("Token");
            const reportType = "monthly" // Get the report type from the button's data attribute
            const baseURL = window.location.protocol + '//' + window.location.host;

            // Call the backend route to generate and upload the monthly or yearly CSV file based on reportType
            const response = await axios.get(`${baseURL}/report/upload-csv`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                params: {
                    reportType: reportType, // Use the report type from the button's data attribute
                },
            });

            // Get the S3 URL for the uploaded CSV file from the response
            const reportS3Url = response.data.reportUrl;

            // Trigger the download of the CSV file
            window.location.href = reportS3Url;
        } catch (error) {
            console.error(`Error downloading ${reportType} CSV:`, error);
            // Handle the error, e.g., show an error message to the user
        }
    } else if (event.target.id === 'downloadYearlyReportButton') {
        event.preventDefault(); // Prevent the default behavior of navigating to a new page

        try {
            const token = localStorage.getItem("Token");
            const reportType = "yearly" // Get the report type from the button's data attribute
            const baseURL = window.location.protocol + '//' + window.location.host;

            // Call the backend route to generate and upload the monthly or yearly CSV file based on reportType
            const response = await axios.get(`${baseURL}/report/upload-csv`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                params: {
                    reportType: reportType, // Use the report type from the button's data attribute
                },
            });

            // Get the S3 URL for the uploaded CSV file from the response
            const reportS3Url = response.data.reportUrl;

            // Trigger the download of the CSV file
            window.location.href = reportS3Url;
        } catch (error) {
            console.error(`Error downloading ${reportType} CSV:`, error);
            // Handle the error, e.g., show an error message to the user
        }
    }
});
