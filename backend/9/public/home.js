
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
    // fetchAndRenderAllMessages();

    setInterval(getMessagesFromLocalStorage, 1000);

    async function getMessagesFromLocalStorage() {
        try {
            // Get messages from localStorage
            const messagesFromStorage = JSON.parse(localStorage.getItem("messages")) || [];
    
            if (messagesFromStorage.length === 0 || messagesFromStorage[0].id !== 1) {
                // Messages are missing in local storage, call the backend to fetch all messages
    
                // Assuming you have a user ID and token stored in local storage
                const token = localStorage.getItem("Token");
    
                // Make an Axios GET request to fetch all messages
                const baseURL = window.location.protocol + '//' + window.location.host;
    
                try {
                    const response = await axios.get(`${baseURL}/get-all-messages`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                
                    // Handle the response and store the messages in local storage
                    const messages = response.data.messages;

                    // Update the messages in local storage
                    const storedMessages = messages.map((message) => ({
                        id: message.id,
                        content: message.text,
                        name: message.sender,
                    }));
                    console.log("this is the stored message",storedMessages)
                
                    localStorage.setItem("messages", JSON.stringify(storedMessages));
                } catch (error) {
                    // Handle errors, e.g., show an error message
                    console.error("Error fetching and storing messages:", error);
                }   
            }
    
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

    setInterval(fetchAndRenderAllMessages, 1000);

    async function fetchAndRenderAllMessages() {
        // Assuming you have a user ID and token stored in local storage
        const token = localStorage.getItem("Token");
        
        // Get the stored messages from local storage
        const existingMessages = JSON.parse(localStorage.getItem("messages")) || [];
        
        // Get the last message ID from the last message in the stored messages
        const lastMessageId = existingMessages.length > 0 ? existingMessages[existingMessages.length - 1].id : 0;
        
        // Make an Axios GET request to fetch messages since the last message ID
        const baseURL = window.location.protocol + '//' + window.location.host;
        
        try {
            const response = await axios.get(`${baseURL}/get-new-messages`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    lastMessageId: lastMessageId
                }
            });
            console.log(response.data.messages)

            // Handle the response and store the new messages in local storage
            if(response.data.messages.length > 0)
            { 
                const messages = response.data.messages;

                const mappedMessages = messages.map((message) => ({
                    id: message.id,
                    content: message.text,
                    name: message.sender,
                }));

                // Retrieve the existing messages from local storage
                const existingMessagesJSON = localStorage.getItem("messages");

                // Check if there are existing messages
                if (existingMessagesJSON) {
                    console.log("appending to messages")
                    console.log(mappedMessages)
                    // Parse the JSON string back to an array
                    const existingMessages = JSON.parse(existingMessagesJSON);

                    // Merge the new messages with existing messages in local storage
                    existingMessages.push(...mappedMessages);

                    // Store the updated messages back in local storage
                    localStorage.setItem("messages", JSON.stringify(existingMessages));
                } else {
                    // If there are no existing messages, simply store the new messages
                    localStorage.setItem("messages", JSON.stringify(mappedMessages));
                }
            }
        }
        catch (error) {
            // Handle errors, e.g., show an error message
            console.error("Error fetching messages:", error);
        }
    }
    

    async function sendMessage() {
        const messageText = messageInput.value;
        if (messageText.trim() !== "") {
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

//     async function fetchAndStoreMessages(startingMessageId) {
//     // Assuming you have a user ID and token stored in local storage
//     const token = localStorage.getItem("Token");
    
//     // Make an Axios GET request to fetch messages starting from the specified message ID
//     const baseURL = window.location.protocol + '//' + window.location.host;
    
//     try {
//         const response = await axios.get(`${baseURL}/get-all-messages`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             params: {
//                 startingMessageId: startingMessageId
//             }
//         });

//         // Handle the response and store the new messages in local storage
//         const messages = response.data.messages;

//         // Merge the new messages with existing messages in local storage
//         const existingMessages = JSON.parse(localStorage.getItem("messages")) || [];
//         const mergedMessages = [...existingMessages, ...messages];

//         // Limit the stored messages to the most recent 10
//         const storedMessages = mergedMessages.slice(-10);

//         // Update the messages in local storage
//         localStorage.setItem("messages", JSON.stringify(storedMessages));
//     } catch (error) {
//         // Handle errors, e.g., show an error message
//         console.error("Error fetching and storing messages:", error);
//     }
// }

});

