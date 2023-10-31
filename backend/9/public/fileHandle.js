import { openIndexedDB, getFileFromIndexedDB } from './indexDBUtils.js';

document.addEventListener("DOMContentLoaded", async function() {
    var selectedImage = null;

    // When a file is selected, display it in the modal
    $('#imageInput').change(function() {
        selectedImage = $('#imageInput').prop('files')[0];
        if (selectedImage) {
            var imageURL = URL.createObjectURL(selectedImage);
            $('#selectedImage').attr('src', imageURL);
            $('#selectedImage').show();
        }
    });

    // When the user clicks "End," send the selected image to the server
    $('#submitImageBtn').click(async function() {
        if (selectedImage) {
            // Show the spinner and loading message
            $('#uploadingSpinner').removeClass('d-none');

            try {
                await uploadImage(selectedImage);

                // Close the modal after receiving a response
                $('#imageModal').modal('hide');
            } catch (error) {
                // Handle errors
                console.error('Error uploading image:', error);

                // Hide the spinner in case of an error
                $('#uploadingSpinner').addClass('d-none');
            }
        }
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
