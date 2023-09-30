// Function to create an expense element
function createExpenseElement(expense) {
    // Create a Bootstrap card container
    const cardContainer = document.createElement('div');
    cardContainer.className = 'col-md-4 mb-4'; // Use Bootstrap grid classes

    // Create a card element
    const expenseCard = document.createElement('div');
    expenseCard.className = 'card';

    // Apply a color theme to the card
    expenseCard.style.backgroundColor = '#f0f0f0'; // Change the background color to your desired color
    expenseCard.style.border = '1px solid #ccc'; // Add a border for better separation

    // Create card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Create card title
    const nameElement = document.createElement('h5');
    nameElement.textContent = `Name: ${expense.name}`;
    nameElement.className = 'card-title';

    // Apply font styles to the card title
    nameElement.style.fontFamily = 'Arial, sans-serif'; // Set your desired font family
    nameElement.style.color = '#333'; // Set the font color

    // Create amount element
    const amountElement = document.createElement('p');
    amountElement.textContent = `Amount:$ ${expense.amount}`;
    amountElement.className = 'card-text text-success';

    // Create category element
    const categoryElement = document.createElement('p');
    categoryElement.textContent = `Category: ${expense.category}`;
    categoryElement.className = 'card-text';

    // Edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'btn btn-primary mr-2';
    
    // Add an event listener to the edit button
    editButton.addEventListener('click', function () {
        // Call the editExpense function when the "Edit" button is clicked
        editExpense(expense.id); // Pass the expense ID as an argument
    });

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'btn btn-danger';

    // Add an event listener to the delete button
    deleteButton.addEventListener('click', function () {
        // Call the deleteExpense function when the "Delete" button is clicked
        deleteExpense(expense.id); // Pass the expense ID as an argument
    });

    // Append elements to card body
    cardBody.appendChild(nameElement);
    cardBody.appendChild(amountElement);
    cardBody.appendChild(categoryElement);
    cardBody.appendChild(editButton);
    cardBody.appendChild(deleteButton);

    // Append card body to card
    expenseCard.appendChild(cardBody);

    // Append the card to the card container
    cardContainer.appendChild(expenseCard);

    return cardContainer;
}

// Function to load expenses (call when the page is reloaded)
async function loadExpenses() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userId');
        const response = await axios.get(`http://localhost:3000/load-expense?userId=${userId}`);
        if (response.status === 200) {
            const expensesContainer = document.querySelector('.expenses-box'); // Select the expenses container

            // Clear existing expense elements
            expensesContainer.innerHTML = '';

            response.data.expenses.forEach(expense => {
                const expenseElement = createExpenseElement(expense);
                expensesContainer.appendChild(expenseElement);
            });
        } else {
            console.log("Error loading expenses");
        }
    } catch (err) {
        console.log(err);
    }
}

// Function to add an expense
async function addExpense(e) {
    try {
        e.preventDefault();
        console.log("Hello world")
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userId');

        const expenseData = {
            name: e.target.name.value,
            amount: e.target.amount.value,
            category: e.target.category.value,
            userId: userId
        }

        const response = await axios.post('http://localhost:3000/add-expense', expenseData)
        if (response.status === 200) {
            console.log("Expense added successfully");

            // Call the loadExpenses function to refresh the expense list
            window.history.back(-1);
            loadExpenses();
        } else {
            console.log("Error")
        }
    }
    catch (err) {
        console.log(err)
    }
}

async function deleteExpense(expenseId) {
    try{
        await axios.delete(`http://localhost:3000/delete-expense/?expenseId=${expenseId}`)
        window.location.reload();
        loadExpenses();
    }
    catch(err){
        console.log(err)
    }
}

document.getElementById("expense-form").addEventListener("click", async function(e) {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    console.log(userId)

    const newURL = `http://localhost:3000/expense-form?userId=${userId}`;
    window.location.href = newURL;

})

document.getElementById("razor-pay").addEventListener("click", async function(e) {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    axios

    const newURL = `http://localhost:3000/expense-form?userId=${userId}`;
    window.location.href = newURL;

})

// Call loadExpenses when the page is loaded
window.addEventListener('load', loadExpenses);

