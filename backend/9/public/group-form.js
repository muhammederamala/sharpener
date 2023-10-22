async function addGroup(e){
    e.preventDefault();
    try{
        membersString = document.getElementById("members").value;
        const membersArray = membersString.split(',').map(member => member.trim());

        const groupDetails = {
            groupName: document.getElementById('group-name').value,
            groupMembers: membersArray
        }

        const token = localStorage.getItem("Token")

        const baseURL = window.location.protocol + '//' + window.location.host;
        const response = await axios.post(`${baseURL}/chat/add-group`,groupDetails,{
            headers:{
                Authorization:`Bearer ${token}`
            },
        });
        if(response.status === 201){
            window.location.href = `${baseURL}/chat`
        }

    }
    catch(err){
        console.log(err)
    }
}