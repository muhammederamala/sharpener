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
            const groupId = urlParams.get("groupId")

            const payload = {
                message: messageText,
                token: token,
                groupIdToken: groupId
            };

            const baseURL = window.location.protocol + '//' + window.location.host;

            try {
                const response = await axios.post(`${baseURL}/chat/send-message`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            } catch (error) {
                // Handle errors, e.g., show an error message
                console.error("Error sending message:", error);
            }
        }
    }

    let messageContent = ''
    setInterval(fetchAllMessages,10000)

    async function fetchAllMessages(){
        const token = localStorage.getItem('Token');
        const urlParams = new URLSearchParams(window.location.search);
        const groupId = urlParams.get('groupId')
        const baseURL = window.location.protocol + '//' + window.location.host;

        const response = await axios.get(`${baseURL}/chat/get-all-messages`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
            params:{
                groupId : groupId
            }
        })
        chatBox.innerHTML = "";
        const messages = response.data.messages

        messages.forEach(message => {
            appendMessage(message.sender, message.text);
        });

    }

    function appendMessage(senderName, text) {

        const message = document.createElement("div");
        message.className = `message ${senderName}`;
        message.textContent = `${senderName}: ${text}`;
        chatBox.appendChild(message);
    }

    async function getAllParticipants(){
        const token = localStorage.getItem('Token');
        const urlParams = new URLSearchParams(window.location.search);
        const groupId = urlParams.get('groupId')
        const baseURL = window.location.protocol + '//' + window.location.host;

        try{
            const response = await axios.get(`${baseURL}/chat/get-all-participants`,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
                params:{
                    groupId:groupId
                }
            });

        }
        catch(err){
            console.log(err)
        }
    }

    getAllParticipants()
});