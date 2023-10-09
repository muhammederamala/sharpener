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


let currentPage = 2;
let totalPages = 1;
const itemsPerPage = 10; // Adjust this to your desired page size
// Function to load expenses (call when the page is reloaded)
async function loadExpenses(currentPage) {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userId');
        const response = await axios.get(`http://localhost:3000/load-expense?userId=${userId}&page=${currentPage}`);
        if (response.status === 200) {
            const expensesContainer = document.querySelector('.expenses-box'); // Select the expenses container

            // Clear existing expense elements
            expensesContainer.innerHTML = '';

            response.data.expenses.forEach(expense => {
                const expenseElement = createExpenseElement(expense);
                expensesContainer.appendChild(expenseElement);
            });

            // Update pagination controls
            currentPage = response.data.page;
            // Display Next and Previous buttons based on currentPage and response.data.pageCount
            updatePaginationControls(currentPage, response.data.totalPages);

            updateUrlWithPage(currentPage);

        } else {
            console.log("Error loading expenses");
        }
    } catch (err) {
        console.log(err);
    }
}

function updateUrlWithPage(pageNumber) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('page', pageNumber) || currentPage;
    console.log("this is the url params",pageNumber)
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, '', newUrl); // Update URL without reloading the page
}

function updatePaginationControls(currentPage, pageCount) {
    const previousButton = document.getElementById('previous-button');
    const nextButton = document.getElementById('next-button');

    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === pageCount;

    previousButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateUrlWithPage(currentPage); // Update URL when previous button is clicked
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < pageCount) {
            currentPage++;
            updateUrlWithPage(currentPage); // Update URL when next button is clicked
        }
    });
}


// Select the previous and next buttons by their IDs
const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');

// Add an event listener for the previous button
previousButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadExpenses(currentPage);
    }
});

// Add an event listener for the next button
nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        loadExpenses(currentPage);
    }
});


// Function to add an expense
async function addExpense(e) {
    try {
        e.preventDefault();
        // const urlParams = new URLSearchParams(window.location.search);
        // const userId = urlParams.get('userId');
        const userId = localStorage.getItem('Token');

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

document.getElementById("expense-form").addEventListener("click", async function(e) {
    e.preventDefault()
    // const urlParams = new URLSearchParams(window.location.search);
    // const userId = urlParams.get('userId');
    const userId = localStorage.getItem('Token');
    console.log(userId)

    const newURL = `http://localhost:3000/expense-form`;
    window.location.href = newURL;

})

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

document.getElementById("downloadHistory").addEventListener("click", async function(e){
    e.preventDefault()
    try{
        const baseURL = window.location.protocol + '//' + window.location.host;
        const newUrl = baseURL+'/report/recently-downloaded'
        window.location.href = newUrl;
    }
    catch(err){
        console.log(err)
    }
})


// Call loadExpenses when the page is loaded
window.addEventListener('load', () => {
    loadExpenses(currentPage);
});
