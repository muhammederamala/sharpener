// Function to make an Axios request to the backend and retrieve user data
function getUserData() {
    return axios.get('/api/userdata'); // Replace '/api/userdata' with your actual backend endpoint
}

// Function to generate the yearly report table
function generateYearlyReport(data) {
    const yearlyReportTable = document.createElement('table');
    yearlyReportTable.classList.add('table', 'table-bordered');

    // Create table headers
    const tableHeaders = `
      <thead>
        <tr>
          <th>Month</th>
          <th>Income</th>
          <th>Expense</th>
          <th>Savings</th>
        </tr>
      </thead>
    `;

    yearlyReportTable.innerHTML = tableHeaders;

    // Create table body
    const tableBody = document.createElement('tbody');
    data.forEach((entry) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${entry.month}</td>
        <td>${entry.income}</td>
        <td>${entry.expense}</td>
        <td>${entry.income - entry.expense}</td>
      `;
        tableBody.appendChild(row);
    });

    yearlyReportTable.appendChild(tableBody);

    // Append the table to the desired container
    const container = document.getElementById('yearly-report-container');
    container.appendChild(yearlyReportTable);
}

// Function to generate the monthly report table
function generateMonthlyReport(data) {
    const monthlyReportTable = document.createElement('table');
    monthlyReportTable.classList.add('table', 'table-bordered');

    // Create table headers
    const tableHeaders = `
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Income</th>
          <th>Expense</th>
        </tr>
      </thead>
    `;

    monthlyReportTable.innerHTML = tableHeaders;

    // Create table body
    const tableBody = document.createElement('tbody');
    data.forEach((entry) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${entry.date}</td>
        <td>${entry.description}</td>
        <td>${entry.category}</td>
        <td>${entry.income}</td>
        <td>${entry.expense}</td>
      `;
        tableBody.appendChild(row);
    });

    monthlyReportTable.appendChild(tableBody);

    // Append the table to the desired container
    const container = document.getElementById('monthly-report-container');
    container.appendChild(monthlyReportTable);
}

// Fetch user data and generate reports
getUserData()
    .then((response) => {
        const userData = response.data;
        generateYearlyReport(userData.yearlyData);
        generateMonthlyReport(userData.monthlyData);

        // Check if the user is premium before showing download buttons
        if (userData.premium) {
            document.getElementById('download-yearly-report').style.display = 'block';
            document.getElementById('download-monthly-report').style.display = 'block';
        }
    })
    .catch((error) => {
        console.error('Error fetching user data:', error);
    });

// Function to download a table as a CSV file
function downloadCSV(tableId, fileName) {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll('tr');
    const csvData = [];

    // Extract table data
    rows.forEach((row) => {
        const rowData = [];
        const cells = row.querySelectorAll('td');
        cells.forEach((cell) => {
            rowData.push(cell.innerText);
        });
        csvData.push(rowData.join(','));
    });

    // Create a Blob containing the CSV data
    const csvContent = csvData.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}

// Add click event listeners for download buttons
document.getElementById('download-yearly-report').addEventListener('click', () => {
    downloadCSV('yearly-report-container', 'yearly_report.csv');
});

document.getElementById('download-monthly-report').addEventListener('click', () => {
    downloadCSV('monthly-report-container', 'monthly_report.csv');
});
