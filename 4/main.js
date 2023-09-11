function loadExpenses(){
    const expenseList = JSON.parse(localStorage.getItem("expenses") || [])
    
    const expenseListElement = document.getElementById("expense-list")

    expenseList.forEach((expense) =>{
        const expenseElement = document.createElement("div")
        expenseElement.className = "alert alert-info";
        expenseElement.innerHTML = `<strong>Amount:</strong> ${expense.amount}<br><strong>Description:</strong> ${expense.description}<br><strong>Category:</strong> ${expense.category}`;
        expenseListElement.appendChild(expenseElement)
    })
}


document.getElementById("add-expense").addEventListener("click", function(){

    console.log("clicked")
    const expense = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    const expenseObj = {
        amount: expense,
        description: description,
        category: category
    }

    const expenseList = JSON.parse(localStorage.getItem("expenses")) || [];

    expenseList.push(expenseObj);

    localStorage.setItem("expenses", JSON.stringify(expenseList))

    document.getElementById("amount").value = "";
    document.getElementById("description").value = ""

    loadExpenses()
})

loadExpenses()