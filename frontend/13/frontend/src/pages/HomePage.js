import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      const idToken = localStorage.getItem("Token");
      if (idToken) {
        setUserId(idToken);
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const idToken = localStorage.getItem("Token");

        const response = await axios.get(
          "https://expensetracker-fb08e-default-rtdb.firebaseio.com/expenses.json"
        );

        if (response.data) {
          const expensesData = Object.keys(response.data).map((key) => ({
            id: key,
            ...response.data[key],
          }));

          const userExpenses = expensesData.filter(
            (expense) => expense.userId === userId
          );
          setExpenses(userExpenses);
        }
      } catch (error) {
        console.error("Error fetching expenses", error);
      }
    };

    if (userId) {
      fetchExpenses();
    }
  }, [userId]);

  const addExpense = async (e) => {
    e.preventDefault();

    try {
      const idToken = localStorage.getItem("Token");

      const body = {
        amount,
        description,
        category,
        userId,
      };

      await axios.post(
        "https://expensetracker-fb08e-default-rtdb.firebaseio.com/expenses.json",
        body
      );

      setAmount("");
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
      <h1 className="mb-4">Expense Tracker</h1>
      <div style={{maxWidth:"500px"}}>
        <form onSubmit={addExpense}>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="text"
              className="form-control"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{expense.category}</h5>
                  <p className="card-text">{expense.description}</p>
                  <p className="card-text">Amount: ${expense.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;
