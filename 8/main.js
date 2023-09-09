// function to load data when page loads
function loadAndRenderTasks() {
    axios.get("http://127.0.0.1:8000/tasks/")
        .then(res => {
            const tasks = res.data;
            // Clear existing tasks
            const taskList = document.getElementById("task-list");
            taskList.innerHTML = "";

            // Render each task
            tasks.forEach(task => {
                renderElements(task.title, task.description,task.id);
            });
        })
        .catch(error => {
            console.error('Error loading tasks:', error);
        });
}

// function to delete
function deleteTask(id){
    var _id = parseInt(id)
    console.log(_id)
    axios.delete(`http://127.0.0.1:8000/delete_task/${_id}`)
    .then(res =>{
        console.log(res,"deleted")
    })
}

function editTask(id){
    const description = prompt("edit description")
    payload = {
        description: description
    }
    var _id = parseInt(id)

    axios.patch(`http://127.0.0.1:8000/update_task/${_id}/`,payload)
    .then(res =>{
        console.log(res,'edited')
    })
    .catch(error => {
        console.error('Error editing task', error);
    })
}


// function to render html elements
function renderElements(name,description,id){
    const listItem = document.createElement("li");
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.width = '50px'
    deleteButton.addEventListener('click', function () {
        deleteTask(id);
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.style.width = '50px'
    editButton.addEventListener('click', function () {
        editTask(id);
    });

    listItem.innerHTML = `<strong>${name}:</strong> <br> ${description}`

    document.getElementById("task-list").appendChild(listItem)
    document.getElementById("task-list").appendChild(document.createElement("br"))
    document.getElementById("task-list").appendChild(editButton)
    document.getElementById("task-list").appendChild(deleteButton)

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
}


// obtain data from form
document.getElementById("todo-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    const payload = {
        name: name,
        description: description
    }

    axios.post("http://127.0.0.1:8000/create/",payload)
    .then(res => {
        renderElements(res.data.title,res.data.description)
    })
    
})


loadAndRenderTasks();

// Periodically reload and render tasks (e.g., every 5 seconds)
setInterval(loadAndRenderTasks, 5000);