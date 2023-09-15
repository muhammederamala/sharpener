function loadExpensesFromLocalStorage() {
    return new Promise((resolve) => {
        const expenseList = JSON.parse(localStorage.getItem("expenses")) || [];
        resolve(expenseList);
    });
}

function renderExpenses(expenseList) {
    const expenseListElement = document.getElementById("expense-list");
    expenseListElement.innerHTML = ""; 

    expenseList.forEach((expense, index) => {
        const expenseElement = document.createElement("div");
        expenseElement.className = "alert alert-info";
        expenseElement.innerHTML = `<strong>Amount:</strong> ${expense.amount}<br><strong>Description:</strong> ${expense.description}<br><strong>Category:</strong> ${expense.category}`;
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "btn btn-danger";
        
        deleteButton.addEventListener("click", () => {
            expenseList.splice(index, 1); 
            localStorage.setItem("expenses", JSON.stringify(expenseList)); // Update localStorage
            renderExpenses(expenseList); 
        });
        
        expenseElement.appendChild(deleteButton);
        expenseListElement.appendChild(expenseElement);
    });
}

document.getElementById("add-expense").addEventListener("click", async function () {
    const expense = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    const expenseObj = {
        amount: expense,
        description: description,
        category: category,
    };

    let expenseList = await loadExpensesFromLocalStorage();
    expenseList.push(expenseObj);

    localStorage.setItem("expenses", JSON.stringify(expenseList));

    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";

    renderExpenses(expenseList);
});

(async () => {
    const expenseList = await loadExpensesFromLocalStorage();
    renderExpenses(expenseList);
})();
