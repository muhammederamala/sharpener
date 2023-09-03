// Function to retrieve existing user data from local storage
function getUsersFromLocalStorage() {
    const usersJSON = localStorage.getItem('users');
    return JSON.parse(usersJSON) || [];
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
  
      // Create a delete button for each user
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function () {
        deleteUser(index);
      });
  
      listItem.appendChild(deleteButton);
      userList.appendChild(listItem);
    });
  }
  
  // Function to add a new user
  function addUser(name, email, phone) {
    const users = getUsersFromLocalStorage();
    users.push({ name, email, phone });
    saveUsersToLocalStorage(users);
    displayUsersInDOM(users);
  }
  
  // Function to delete a user
  function deleteUser(index) {
    const users = getUsersFromLocalStorage();
    users.splice(index, 1);
    saveUsersToLocalStorage(users);
    displayUsersInDOM(users);
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
  
  // Initial display of users
  const initialUsers = getUsersFromLocalStorage();
  displayUsersInDOM(initialUsers);
  