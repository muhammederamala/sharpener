import { openIndexedDB, getFileFromIndexedDB } from './indexDBUtils.js';

document.addEventListener("DOMContentLoaded", async function() {

    var selectedFile = null;

    // When a file is selected, display it in the modal
    $('#fileInput').change(function() {
        selectedFile = $('#fileInput').prop('files')[0];
        if (selectedFile) {
            var mediaContainer = document.getElementById('mediaContainer');
            mediaContainer.innerHTML = ''; // Clear any previous content

            if (selectedFile.type.startsWith('image/')) {
                // Display image
                var imgElement = document.createElement('img');
                imgElement.src = URL.createObjectURL(selectedFile);
                imgElement.alt = 'Selected Image';
                imgElement.style.maxWidth = '100%';
                mediaContainer.appendChild(imgElement);
            } else if (selectedFile.type.startsWith('video/')) {
                // Display video
                var videoElement = document.createElement('video');
                videoElement.src = URL.createObjectURL(selectedFile);
                videoElement.controls = true; // Add video player controls
                videoElement.style.maxWidth = '100%';
                mediaContainer.appendChild(videoElement);
            }
        }
    });

    // When the user clicks "End," send the selected file to the server
    $('#submitFileBtn').click(async function() {
        if (selectedFile) {
            // Show the spinner and loading message
            $('#uploadingSpinner').removeClass('d-none');

            try {
                if (fileType === 'image') {
                    await uploadImage(selectedFile);
                } else if (fileType === 'video') {
                    await uploadVideo(selectedFile);
                } else {
                    await uploadFile(selectedFile);
                }

                // Close the modal after receiving a response
                $('#fileModal').modal('hide');
            } catch (error) {
                // Handle errors
                console.error('Error uploading file:', error);

                // Hide the spinner in case of an error
                $('#uploadingSpinner').addClass('d-none');
            }
        }
    });

    $('#imageModal').on('hidden.bs.modal', function() {
        selectedFile = null; // Clear the selected file
    });

    // Separate async function to upload the image using Axios
    async function uploadImage(image) {
        const token = localStorage.getItem("Token");
        const urlParams = new URLSearchParams(window.location.search);
        const groupId = urlParams.get("groupId");
        const baseURL = window.location.protocol + '//' + window.location.host;
        var formData = new FormData();
        formData.append('image', image);

        const response = await axios.post(`${baseURL}/chat/send-file`, formData,{
            headers:{
                Authorization:`Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            params:{
                groupIdToken:groupId,
                fileName:image.name
            }
        });
        const messageId = JSON.stringify(response.data.messageId)

        if(response.status === 201){
            const db = await openIndexedDB();
            const transaction = db.transaction('groupStore', 'readwrite');
            const objectStore = transaction.objectStore('groupStore');
            objectStore.put(image,messageId);
            db.close();
            }   
        return "succesful"
    }
});
