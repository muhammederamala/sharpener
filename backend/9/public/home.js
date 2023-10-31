const socket = io();

socket.on('new-invitation',()=>{
    fetchInvites(); 
})

window.onload = function () {
    fetchInvites();
    fetchGroups();
};

document.getElementById("reload-invites").addEventListener("click",function (){
    fetchInvites()
})

async function fetchInvites() {

    const baseURL = window.location.protocol + '//' + window.location.host;
    const token = localStorage.getItem("Token");

    try {
        const response = await axios.post(`${baseURL}/chat/get-all-invites`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // response.data.invites is an array of invitation objects
        const invites = response.data.invites;

        const userName = response.data.userName.name

        const invitationsContainer = document.getElementById("invitations-container");

        // Clear the previous content
        invitationsContainer.innerHTML = '';

        if (invites.length === 0) {
            // If there are no invitations, display a message
            invitationsContainer.innerHTML = '<p>No invitations available.</p>';
        } else {
            // Loop through each invitation and create a card for each
            invites.forEach((invite) => {
                if (invite.status === 'pending') {
                    const card = document.createElement("div");
                    card.className = "card";
            
                    const cardBody = document.createElement("div");
                    cardBody.className = "card-body";
            
                    const message = document.createElement("p");
                    message.textContent = `${invite.sender.name} invited you to join group "${invite.group.GroupName}"`;
            
                    const acceptButton = document.createElement("button");
                    acceptButton.className = "btn btn-success";
                    acceptButton.textContent = "Accept";
                    acceptButton.id = "acceptButton";
                    acceptButton.value = "accepted";
                    acceptButton.addEventListener("click", function () {
                        let statusMessage = "accepted"
                        handleInvites(invite.groupId,statusMessage);
                    });
            
                    const rejectButton = document.createElement("button");
                    rejectButton.className = "btn btn-danger";
                    rejectButton.textContent = "Reject";
                    rejectButton.id = "rejectButton";
                    rejectButton.value = "declined";
                    rejectButton.addEventListener("click", function () {
                        let statusMessage = "declined"
                        handleInvites(invite.groupId,statusMessage);
                    });
            
                    // Append elements to the card
                    cardBody.appendChild(message);
                    cardBody.appendChild(acceptButton);
                    cardBody.appendChild(rejectButton);
                    card.appendChild(cardBody);
            
                    // Append the card to the invitations container
                    invitationsContainer.appendChild(card);
                }
            });
        }
    } catch (error) {
        console.error("Error fetching invitations:", error);
    }
}

async function handleInvites(GroupId,statusMessage) {
    const acceptButton = document.getElementById("acceptButton");
    const rejectButton = document.getElementById("rejectButton");
  
    let payload;

    if (statusMessage === "accepted") {
        payload = {
            status: acceptButton.value,
            GroupId: GroupId
        };
    } else if (statusMessage === "declined") {
        payload = {
            status: rejectButton.value,
            GroupId: GroupId
        };
    }

    const token = localStorage.getItem("Token");
    const baseURL = window.location.protocol + '//' + window.location.host;

    const response = await axios.post(`${baseURL}/chat/handle-invitation`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    location.reload();
}

async function fetchGroups() {
    try {
      const token = localStorage.getItem('Token');
      const baseUrl = window.location.protocol + '//' + window.location.host;
  
      const response = await axios.get(`${baseUrl}/chat/get-all-groups`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const groupList = document.getElementById('group-list-ul'); // Select the <ul> element

      response.data.groups.forEach((group) => {
          const groupItem = document.createElement('a');
          groupItem.href = `/chat/group?groupId=${group.Token}`;
          groupItem.className = 'list-group-item list-group-item-action';
      
          const groupName = document.createElement('h5');
          groupName.textContent = group.GroupName;
          groupName.className = 'group-name';
      
          // Add custom CSS to remove left padding/margin
          groupItem.style.marginLeft = '0'; // Set left margin to 0
      
          // Append the group name element to the group item
          groupItem.appendChild(groupName);
      
          // Append the group item to the group list container (the <ul>)
          groupList.appendChild(groupItem);
      });
      
    } catch (err) {
      console.log(err);
    }
}
