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

    function sendMessage() {
        const messageText = messageInput.value;
        if (messageText.trim() !== "") {
            appendMessage("sender", messageText);
            messageInput.value = "";
        }
    }

    function appendMessage(sender, text) {
        const message = document.createElement("div");
        message.className = `message ${sender}`;
        if (sender === "sender") {
            message.textContent = `You: ${text}`;
        } else {
            message.textContent = text;
        }
        chatBox.appendChild(message);

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
