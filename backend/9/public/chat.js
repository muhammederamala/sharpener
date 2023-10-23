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

    // handles adding new participant. calls addnewparticipant function
    // after splitting th emembers phone number
    const addParticipantForm = document.getElementById("add-participant-form");
    const phoneNumberInput = document.getElementById("phone-number")
    addParticipantForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission behavior

        const membersString = phoneNumberInput.value;
        const membersArray = membersString.split(',').map(member => member.trim());
        console.log(membersArray)
        // Perform an Axios POST request to add a new participant
        addNewParticipant(membersArray);
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
    let isChatBoxScrolledToBottom = true;
    setInterval(fetchAllMessages,1000)

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
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message-container", "d-flex", "align-items-start", "mb-3"); // Use Bootstrap's "mb-3" for margin-bottom
        
        const senderCol = document.createElement("div");
        senderCol.classList.add("col-md-3", "font-weight-bold");
    
        // Check if senderName is "You" to assign different colors
        if (senderName === "You") {
            senderCol.classList.add("text-danger"); // Set color to green for "You"
        } else {
            senderCol.classList.add("text-dark"); // Set color to blue for others
        }
    
        senderCol.textContent = senderName;
        
        const messageCol = document.createElement("div");
        messageCol.classList.add("col-md-6");
        
        const messageBubble = document.createElement("div");
        messageBubble.textContent = text;
        messageBubble.classList.add("message-bubble", "bg-light", "p-2", "rounded");
        
        messageCol.appendChild(messageBubble);
        
        messageContainer.appendChild(senderCol);
        messageContainer.appendChild(messageCol);
        
        chatBox.appendChild(messageContainer);

        const scrollPosition = localStorage.getItem('chatBoxScrollPosition');

        if (scrollPosition !== null) {
            chatBox.scrollTop = parseInt(scrollPosition);
        }
        else {
            chatBox.scrollTop = chatBox.scrollHeight;
        }

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
            })

            const participants = response.data.participants;
            const currentUserIsAdmin = response.data.currentUser
            const userId = response.data.userId

            // Get the 'participants-list' div
            const participantsListDiv = document.getElementById('participants-list');
    
            // Create an unordered list element to display participants
            const ul = document.createElement('ul');

            participants.forEach((participant) => {
                const li = document.createElement('li');
                li.classList.add('list-group-item', 'list-group-item-action');
            
                const content = document.createElement('div');
                content.classList.add('d-flex', 'justify-content-between', 'align-items-center');
                content.innerHTML = `
                <span class="font-weight-bold small">${participant.name}</span>
                <small class="text-muted small">${participant.phone}</small>
                <span class="badge badge-primary badge-pill small">${participant.membership}</span>
                `;
            
                const buttons = document.createElement('div');
                buttons.classList.add('buttons');
            
                if (currentUserIsAdmin && participant.id !== userId) {
                    const removeButton = document.createElement('button');
                    removeButton.innerText = 'Remove';
                    removeButton.classList.add('btn', 'btn-danger', 'small-button', 'mr-2'); // Added 'small-button' class
                    removeButton.addEventListener('click', () => {
                        removeMember(participant.id)
                    });
            
                    const makeAdminButton = document.createElement('button');
                    makeAdminButton.innerText = 'Make Admin';
                    if(participant.membership === 'admin'){
                        makeAdminButton.classList.add('btn', 'btn-success', 'small-button', 'disabled')
                    }
                    else{
                        makeAdminButton.classList.add('btn', 'btn-success', 'small-button'); // Added 'small-button' class
                    }
                    makeAdminButton.addEventListener('click', () => {
                        makeAdmin(participant.id);
                    });
            
                    buttons.appendChild(removeButton);
                    buttons.appendChild(makeAdminButton);
                } else {
                    // If the current user is not an admin, disable the buttons
                    const removeButton = document.createElement('button');
                    removeButton.innerText = 'Remove';
                    removeButton.classList.add('btn', 'btn-danger', 'small-button', 'mr-2', 'disabled');
                    
                    const makeAdminButton = document.createElement('button');
                    makeAdminButton.innerText = 'Make Admin';
                    makeAdminButton.classList.add('btn', 'btn-success', 'small-button', 'disabled');
                    
                    buttons.appendChild(removeButton);
                    buttons.appendChild(makeAdminButton);
                }
            
                content.appendChild(buttons);

                li.appendChild(content);
                ul.appendChild(li);
            });
            
            // Append the list to the 'participants-list' div
            participantsListDiv.appendChild(ul);

            return ("succesfull")

        }
        catch(err){
            console.log(err)
        }
    }

    // display the form to add new participants
    const addParticipantButton = document.getElementById("add-participant-button-anchor")
    addParticipantButton.addEventListener("click", function () {
        // Toggle the visibility of the form
        if (addParticipantForm.style.display === "none" || addParticipantForm.style.display === "") {
            addParticipantForm.style.display = "block";
        } else {
            addParticipantForm.style.display = "none";
        }
    });

    async function addNewParticipant(phoneNumber) {
        const token = localStorage.getItem("Token");
        const urlParams = new URLSearchParams(window.location.search);
        const groupId = urlParams.get("groupId");
        const baseURL = window.location.protocol + "//" + window.location.host;

        console.log("this is running")
        const payload = {
            phoneNumber: phoneNumber,
        };
        try {        
            const response = await axios.post(`${baseURL}/chat/add-new-participant`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params:{
                    groupId: groupId
                }
            });
        }
        catch(err){
            console.log(err)
        }
    }
    
    chatBox.addEventListener("scroll", function () {
        // Check if the chat box is manually scrolled
        isChatBoxScrolledToBottom = chatBox.scrollHeight - chatBox.scrollTop === chatBox.clientHeight;
        localStorage.setItem('chatBoxScrollPosition', chatBox.scrollTop.toString());

    })

    async function makeAdmin(participantId){
        const token = localStorage.getItem("Token");
        const urlParams = new URLSearchParams(window.location.search);
        const groupId = urlParams.get("groupId");
        const baseURL = window.location.protocol + "//" + window.location.host;

        const payload = {
            participantId: participantId,
            groupId: groupId
        }
        
        const response = await axios.patch(`${baseURL}/chat/make-admin`,payload,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        getAllParticipants();
    }

    async function removeMember(participantId){
        const token = localStorage.getItem("Token");
        const urlParams = new URLSearchParams(window.location.search);
        const groupId = urlParams.get("groupId");
        const baseURL = window.location.protocol + "//" + window.location.host;

        const payload = {
            participantId: participantId,
            groupId: groupId
        }

        const response = await axios.delete(`${baseURL}/chat/delete-member`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
            params:{
                participantId: participantId,
                groupId: groupId
            }
        });
        location.reload();
    }

    window.onload = async function () {
        const scrollPosition = localStorage.getItem('chatBoxScrollPosition');
        if (scrollPosition !== null) {
            chatBox.scrollTop = parseInt(scrollPosition);
        }
        await getAllParticipants();
    }
});