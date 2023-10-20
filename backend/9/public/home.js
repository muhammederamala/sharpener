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

    async function getMessagesFromLocalStorage(){
        try{

        }
        catch(err){
            console.log(err)
        }
    }

    // Call fetchAndRenderAllMessages when the page loads
    fetchAndRenderAllMessages();

    setInterval(getMessagesFromLocalStorage, 2000);

    async function getMessagesFromLocalStorage() {
        try {
            // Get messages from localStorage
            const messagesFromStorage = JSON.parse(localStorage.getItem("messages")) || [];

            // Clear the chat box
            chatBox.innerHTML = "";

            // Render the messages from localStorage
            messagesFromStorage.forEach((message) => {
                appendMessage(message.name, message.content);
            });
        } catch (error) {
            console.error("Error fetching messages from localStorage:", error);
        }
    }

    setInterval(fetchAndRenderAllMessages, 2000);

    async function fetchAndRenderAllMessages() {
        // Assuming you have a user ID and token stored in local storage
        const token = localStorage.getItem("Token");
        
        // Get the stored messages from local storage
        const existingMessages = JSON.parse(localStorage.getItem("messages")) || [];
        
        // Get the last message ID from the last message in the stored messages
        const lastMessageId = existingMessages.length > 0 ? existingMessages[existingMessages.length - 1].id : null;
        
        // Make an Axios GET request to fetch messages since the last message ID
        const baseURL = window.location.protocol + '//' + window.location.host;
        
        try {
            const response = await axios.get(`${baseURL}/get-all-messages`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    lastMessageId: lastMessageId
                }
            });
    
            // Handle the response and store the new messages in local storage
            const messages = response.data.messages;
    
            // Merge the new messages with existing messages in local storage
            const mergedMessages = [...existingMessages, ...messages];
    
            // Limit the stored messages to the most recent 10
            const storedMessages = mergedMessages.slice(-10);
    
            // Update the messages in local storage
            localStorage.setItem("messages", JSON.stringify(storedMessages));
        } catch (error) {
            // Handle errors, e.g., show an error message
            console.error("Error fetching messages:", error);
        }
    }
    

    async function sendMessage() {
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

            try {
                const response = await axios.post(`${baseURL}/send-message`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const { id, message, name } = response.data;

                const existingMessages = JSON.parse(localStorage.getItem("messages")) || [];

                const newMessage = { id:id, content: message, name: name };

                existingMessages.push(newMessage);

                localStorage.setItem("messages", JSON.stringify(existingMessages));

                // Handle the response, e.g., show a success message
                console.log("Message sent successfully.");
            } catch (error) {
                // Handle errors, e.g., show an error message
                console.error("Error sending message:", error);
            }
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
