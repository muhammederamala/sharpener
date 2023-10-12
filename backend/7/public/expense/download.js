async function getAllDownloads() {
    const token = localStorage.getItem("Token");
    const baseURL = window.location.protocol + '//' + window.location.host;

    const response = await axios.get(`${baseURL}/report/get-recently-downloaded`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const downloadData = response.data;
    const tableBody = document.getElementById('download-list');

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2); // Get the last 2 digits of the year
        return `${day}/${month}/${year}`;
    }

    // Iterate over the download data and populate the table
    downloadData.forEach(download => {
        const row = document.createElement('tr');

        // Create table data for Date
        const dateCell = document.createElement('td');
        const formattedDate = formatDate(download.createdAt);
        dateCell.textContent = formattedDate;

        // Create table data for Type
        const typeCell = document.createElement('td');
        typeCell.textContent = download.type;

        // Create table data for the Download button
        const actionCell = document.createElement('td');
        const downloadButton = document.createElement('a');
        downloadButton.textContent = 'Download';
        downloadButton.href = download.link;
        downloadButton.target = '_blank'; // Open the link in a new tab

        // Append table data to the row
        row.appendChild(dateCell);
        row.appendChild(typeCell);
        actionCell.appendChild(downloadButton);
        row.appendChild(actionCell);

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

// Call the function to load and populate the table
getAllDownloads();
