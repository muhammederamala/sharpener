async function getAllDownloads (){

    const token = localStorage.getItem("Token")

    const response = await axios.get('http://localhost:3000/report/get-recently-downloaded',{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    console.log(response.data)
    const downloadData = response.data

    const container = document.getElementById('download-list')

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2); // Get the last 2 digits of the year
        return `${day}/${month}/${year}`;
    }

    // Iterate over the download data and create a box for each entry
    downloadData.forEach((download, index) => {
        // Create a container div for the download box
        const downloadBox = document.createElement('div');
        downloadBox.className = 'download-box'; // You can add CSS class for styling

        // Create elements for displaying download information
        const dateElement = document.createElement('p');
        const formattedDate = formatDate(download.createdAt);
        dateElement.textContent = `Date: ${formattedDate}`;

        const typeElement = document.createElement('p');
        typeElement.textContent = `Type: ${download.type}`;

        // Create a link element for downloading the file
        const downloadLink = document.createElement('a');
        downloadLink.textContent = 'Download';
        downloadLink.href = download.link;
        downloadLink.target = '_blank'; // Open the link in a new tab

        // Append the elements to the download box container
        downloadBox.appendChild(dateElement);
        downloadBox.appendChild(typeElement);
        downloadBox.appendChild(downloadLink);

        // Append the download box to the container
        container.appendChild(downloadBox);
    });
}

getAllDownloads()