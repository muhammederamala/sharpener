document.getElementById("add-expense").addEventListener("click", function(){

    console.log("clicked")
    const expense = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    const expenseElement = document.createElement("div");
    expenseElement.className = "alert alert-info";
    expenseElement.innerHTML = `<strong>Amount:</strong> $${expense}<br><strong>Description:</strong> ${description}<br><strong>Category:</strong> ${category}`;

    document.getElementById("expense-list").appendChild(expenseElement);

    document.getElementById("amount").value = "";
    document.getElementById("description").value = ""
})