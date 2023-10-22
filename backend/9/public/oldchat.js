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

    async function sendMessage() {
        const messageText = messageInput.value;
        if (messageText.trim() !== "") {
            messageInput.value = "";

            const token = localStorage.getItem("Token");
            const urlParams = new URLSearchParams(window.location.search);
            const groupId = urlParams.get("groupId");

            const payload = {
                message: messageText,
                token: token,
                groupIdToken: groupId,
            };

            const baseURL = window.location.protocol + '//' + window.location.host;

            try {
                const response = await axios.post(`${baseURL}/chat/send-message`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Store the sent message in local storage
                const messages = JSON.parse(localStorage.getItem("storedMessages")) || [];
                const senderName = "You";
                messages.push({ sender: senderName, text: messageText });
                localStorage.setItem("storedMessages", JSON.stringify(messages));
            } catch (error) {
                // Handle errors, e.g., show an error message
                console.error("Error sending message:", error);
            }
        }
    }

    setInterval(fetchAllMessages, 2000);

    async function fetchAllMessages() {
        const token = localStorage.getItem("Token");
        const urlParams = new URLSearchParams(window.location.search);
        const groupId = urlParams.get("groupId");
        const baseURL = window.location.protocol + '//' + window.location.host;

        try {
            const response = await axios.get(`${baseURL}/chat/get-new-messages`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    groupId: groupId,
                },
            });

            const newMessages = response.data.messages;

            // Get and parse previously stored messages from local storage
            const storedMessages = JSON.parse(localStorage.getItem("storedMessages")) || [];

            // Filter only the new messages not present in storedMessages
            const uniqueNewMessages = newMessages.filter(
                (newMessage) => !storedMessages.some((storedMessage) => storedMessage.text === newMessage.text)
            );

            // Update the storedMessages with new messages
            storedMessages.push(...uniqueNewMessages);
            localStorage.setItem("storedMessages", JSON.stringify(storedMessages));

            // Append the new messages to the chat box
            uniqueNewMessages.forEach((message) => {
                appendMessage(message.sender, message.text);
            });
        } catch (error) {
            // Handle errors
            console.error("Error fetching messages:", error);
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
