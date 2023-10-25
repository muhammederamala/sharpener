// fileUpload.js

// Function to display the selected file in a modal
function displaySelectedFile(file) {
    const modalContent = document.createElement('div');
    modalContent.innerHTML = `
        <div class="modal fade" id="fileModal" tabindex="-1" role="dialog" aria-labelledby="fileModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="fileModalLabel">${file.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- Display the selected file (video or image) -->
                        ${getFileDisplay(file)}
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" id="send-file-modal-button" data-dismiss="modal">Send</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Append the modal content to the body
    document.body.appendChild(modalContent);

    // Show the modal
    const modal = $('#fileModal');
    modal.on('hidden.bs.modal', function () {
        // When the modal is closed, remove it and stop the video
        modal.remove();
    });

    // Add an event listener to the "Send" button within the modal
    document.getElementById('send-file-modal-button').addEventListener('click', function() {
        // Send the file to the backend using Axios
        postFileMessage(file);
    });

    modal.modal('show');
}

// Function to determine the type of file and return appropriate HTML
function getFileDisplay(file) {
    if (file.type.startsWith('image/')) {
        // Display the image
        return `<img src="${URL.createObjectURL(file)}" style="max-width: 100%;">`;
    } else if (file.type.startsWith('video/')) {
        // Display the video with a thumbnail
        return `
            <video controls style="max-width: 100%;">
                <source src="${URL.createObjectURL(file)}" type="${file.type}">
                Your browser does not support the video tag.
            </video>
        `;
    } else {
        // Display a message for unsupported file types
        return `<p>Unsupported file type: ${file.type}</p>`;
    }
}

async function postFileMessage(file) {
    try {
        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('file', file);

        const token = localStorage.getItem("Token");
        const urlParams = new URLSearchParams(window.location.search);
        const groupId = urlParams.get("groupId")
        const baseURL = window.location.protocol + '//' + window.location.host;

        const payload = {
            message: formData,
            token: token,
            groupIdToken: groupId
        };

        // Make a POST request to your backend API using Axios
        const response = await axios.post(`${baseURL}/chat/send-message`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Handle the response from the backend, if needed
        console.log('File sent successfully:', response.data);
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error sending file:', error);
    }
}

