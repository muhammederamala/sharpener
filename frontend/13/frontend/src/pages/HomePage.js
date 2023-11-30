import React, { useState, useEffect } from "react";
import axios from "axios";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const idToken = localStorage.getItem("Token");
      if (idToken) {
        setIsLoggedIn(true);
        fetchExpenses();
      }
    };

    checkLoginStatus();
  }, []);

  const fetchExpenses = async () => {
    // Fetch expenses for the user (replace 'userId' with actual user identifier)
    try {
      const response = await axios.get(
        `https://your-api-url/expenses?userId=userId`, // Replace with your API endpoint
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );

      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses", error);
    }
  };

  const addExpense = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Add expense for the user (replace 'userId' with actual user identifier)
    try {
      await axios.post(
        `https://your-api-url/expenses?userId=userId`, // Replace with your API endpoint
        {
          moneySpent,
          description,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );

      // After adding an expense, refresh the list of expenses
      fetchExpenses();

      // Clear the form fields
      setMoneySpent("");
      setDescription("");
      setCategory("");
    } catch (error) {
      console.error("Error adding expense", error);
    }
  };

  if (!isLoggedIn) {
    return <p>Please log in to view and add expenses.</p>;
  }

  return (
    <div className="container mt-5">
      <h1>Expense Tracker</h1>
      <div style={{ maxWidth: "600px", marginBottom:"100px" }}>
        <form onSubmit={addExpense}>
          <div className="mb-3">
            <label htmlFor="moneySpent" className="form-label">
              Money Spent
            </label>
            <input
              type="text"
              className="form-control"
              id="moneySpent"
              value={moneySpent}
              onChange={(e) => setMoneySpent(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Add Expense
          </button>
        </form>
      </div>

      <h2 className="mt-4">Your Expenses</h2>
      {expenses.length === 0 ? (
        <p>You have no expenses.</p>
      ) : (
        <ul className="list-group">
          {expenses.map((expense) => (
            <li key={expense.id} className="list-group-item">
              <strong>{expense.category}</strong>: {expense.description} - $
              {expense.moneySpent}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseTracker;
