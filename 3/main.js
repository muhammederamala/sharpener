// // Function to retrieve existing user data from local storage
function getUsersFromCrud() {
  return axios("https://crudcrud.com/api/94a2e041edc144ef9b746700ccea140c/create")
  .then(res => {
    console.log(res)
    return res.data || []
  })
  .catch(error => {
    console.error(error);
    return [];
  });

  // const usersJSON = localStorage.getItem('users');
  // return JSON.parse(usersJSON) || [];
}

// Function to save user data to local storage
function saveUsersToLocalStorage(users) {
  const usersJSON = JSON.stringify(users);
  localStorage.setItem('users', usersJSON);
}

// Function to display users in the DOM
function displayUsersInDOM(users) {
  const userList = document.getElementById('userList');
  userList.innerHTML = '';

  users.forEach((user, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `User ${index + 1}: Name: ${user.name}, Email: ${user.email}, Phone: ${user.phone}`;

    // Create an "Edit Email" button for each user
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function () {
      editUserEmail(users[0]);
    });

    // Create a delete button for each user
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
      deleteUser(users[0]);
    });

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    userList.appendChild(listItem);
  });
}

// Function to add a new user
function addUser(name, email, phone) {
  const users = {
    name, email, phone
  }

  axios.post("https://crudcrud.com/api/94a2e041edc144ef9b746700ccea140c/create",users)
  .then(res => {
    console.log(res.data)
    displayUsersInDOM([res.data])
  })
  .catch(error => console.error(error))
}

// Function to delete a user
function deleteUser(user) {
  axios.delete(`https://crudcrud.com/api/94a2e041edc144ef9b746700ccea140c/create/${user._id}`)
  .then(res => {
    console.log("deleted",res)
  })
  .catch(error => console.error(error))
}

// Function to edit a user's email
function editUserEmail(user) {
  const newEmail = prompt('Enter the new email address:');
  const newName = user.name
  const newPhone = user.phone
  const payload = {
    email :newEmail,
    name : newName ,
    phone : newPhone,
  }
  if (newEmail !== null) {
    user.email = newEmail;

    axios.put(`https://crudcrud.com/api/94a2e041edc144ef9b746700ccea140c/create/${user._id}`,payload)
    .then(res =>{
      console.log(res)
      console.log(res.data)
      displayUsersInDOM([res.data])
    })
    .catch(error => console.error(error))
  }
}

// Event listener for form submission
document.getElementById('userForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (name !== '' && email !== '' && phone !== '') {
    addUser(name, email, phone);
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
  }
});


window.onload = function () {
  getUsersFromCrud()
    .then(users => {
      displayUsersInDOM(users);
    });
};