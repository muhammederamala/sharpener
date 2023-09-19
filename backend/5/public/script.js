// Function to handle user login
function login() {
    const usernameInput = document.getElementById("username");
    const username = usernameInput.value;

    if (username) {
        // Store the username in local storage
        localStorage.setItem("username", username);

        // Redirect to the home page
        window.location.href = "/";
    }
}

// Function to send a message
function sendMessage() {
    const username = localStorage.getItem("username");
    const messageInput = document.getElementById("message");
    const message = messageInput.value;

    if (message) {
        // Append the message to the chat box
        const chatBox = document.getElementById("chat-box");
        const newMessage = document.createElement("div");
        newMessage.textContent = `${username}: ${message}`;
        chatBox.appendChild(newMessage);

        // Store the message in the message.txt file (server-side)
        storeMessage(username, message);

        // Clear the message input
        messageInput.value = "";
    }
}

// Simulated function to store messages in a file (server-side)
const fs = require('fs');

function storeMessage(username, message) {
    // In a real application, you would use a server to store messages in a file.
    // For this example, we'll use the built-in 'fs' module.
    const messageToStore = `${username}: ${message}\n`;
    
    fs.appendFile('message.txt', messageToStore, (err) => {
        if (err) throw err;
        console.log('Message saved to message.txt');
    });
}
