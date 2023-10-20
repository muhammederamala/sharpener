document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");

    sendButton.addEventListener("click", function () {
        sendMessage();
    });

    messageInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // Call fetchAndRenderAllMessages when the page loads
    fetchAndRenderAllMessages();

    setInterval(fetchAndRenderNewMessages, 2000);

    function fetchAndRenderNewMessages() {
        // Assuming you have a user ID and token stored in local storage
        const token = localStorage.getItem("Token");

        // Make an Axios GET request to fetch new messages
        const baseURL = window.location.protocol + '//' + window.location.host;
        axios.get(`${baseURL}/get-all-messages`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            const newMessages = response.data.messages;

            chatBox.innerHTML = "";

            // Render only the new messages
            newMessages.forEach((message) => {
                appendMessage(message.sender, message.text);
            });
        })
        .catch((error) => {
            // Handle errors, e.g., show an error message
            console.error("Error fetching new messages:", error);
        });
    }

    function fetchAndRenderAllMessages() {
        // Assuming you have a user ID and token stored in local storage
        const token = localStorage.getItem("Token");

        // Make an Axios GET request to fetch all messages
        const baseURL = window.location.protocol + '//' + window.location.host;
        axios.get(`${baseURL}/get-all-messages`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            // Handle the response and render the messages
            const messages = response.data.messages;
            messages.forEach((message) => {
                appendMessage(message.sender, message.text);
            });
        })
        .catch((error) => {
            // Handle errors, e.g., show an error message
            console.error("Error fetching messages:", error);
        });
    }

    function sendMessage() {
        const messageText = messageInput.value;
        if (messageText.trim() !== "") {
            appendMessage("sender", messageText);
            messageInput.value = "";

            // Assuming you have a user ID and token stored in local storage
            const token = localStorage.getItem("Token");

            // Create a payload with the message and user ID
            const payload = {
                message: messageText,
                token: token,
            };

            // Make an Axios POST request with the payload and token
            const baseURL = window.location.protocol + '//' + window.location.host;
            axios.post(`${baseURL}/send-message`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                // Handle the response, e.g., show a success message
                console.log("Message sent successfully.");
            })
            .catch((error) => {
                // Handle errors, e.g., show an error message
                console.error("Error sending message:", error);
            });
        }
    }

    function appendMessage(senderName, text) {
        const message = document.createElement("div");
        message.className = `message ${senderName}`;
        message.textContent = `${senderName}: ${text}`;
        chatBox.appendChild(message);
    
        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
});
