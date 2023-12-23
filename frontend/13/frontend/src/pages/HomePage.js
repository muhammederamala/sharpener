import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { expenseActions, themeActions } from "../store";

const ExpenseTracker = () => {
  const dispatch = useDispatch();

  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  const higher = useSelector((state) => state.expense.higher);
  const totalExpense = useSelector((state) => state.expense.expense);
  const isDarkMode = useSelector((state) => state.theme.dark);

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
        const userExpenses = expensesData.filter((expense) => {
          return expense.userId === userId;
        });
        const totalExpenseSum = userExpenses.reduce((sum, expense) => {
          return sum + parseFloat(expense.amount);
        }, 0);
        setExpenses(userExpenses);
        dispatch(
          expenseActions.syncExpense({ expense: parseInt(totalExpenseSum, 10) })
        );
        return userExpenses;
      }
    } catch (error) {
      console.error("Error fetching expenses", error);
    }
  };

  const downloadCsv = async () => {
    try {
      // Fetch user expenses
      const userExpenses = await fetchExpenses();

      // Convert user expenses to CSV string
      const csvContent = convertToCsv(userExpenses);

      // Create a Blob with the CSV data
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      // Create a link element and trigger the download
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = "user_expenses.csv";
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  const convertToCsv = (data) => {
    // Create header row
    const header = Object.keys(data[0]).join(",");

    // Create data rows
    const rows = data.map((expense) => Object.values(expense).join(","));

    // Combine header and rows
    return `${header}\n${rows.join("\n")}`;
  };
  useEffect(() => {
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
      dispatch(expenseActions.addExpense({ expense: parseInt(amount, 10) }));
      fetchExpenses();
    } catch (error) {
      console.error("Error adding expense", error);
    }
  };

  const handleDeleteExpense = async (id, amount) => {
    try {
      const response = await axios.delete(
        `https://expensetracker-fb08e-default-rtdb.firebaseio.com/expenses/${id}.json`
      );
      dispatch(expenseActions.removeExpense({ expense: amount }));
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  if (!isLoggedIn) {
    return <p>Please log in to view and add expenses.</p>;
  }

  return (
    <div
      className={`container mt-5 ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className="mb-4">Expense Tracker</h1>
            <div style={{ maxWidth: "500px" }}>
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
          </div>
          <div className="col-md-6">
            <h1>Total Expense</h1>
            <p>{`$ ${totalExpense}`}</p>
            {higher && <button className="btn btn-warning">Premium</button>}
            {/* <button
              className="btn btn-success mt-3"
              onClick={() => dispatch(themeActions.switch())}
            >
              {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button> */}
            <br></br>
            <button className="btn btn-success mt-3" onClick={downloadCsv}>
              Download expenses
            </button>
          </div>
        </div>
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
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{expense.category}</h5>
                    <div>
                      <span className="mx-2">
                        <Link to={`/edit/${expense.id}`}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                      </span>
                      <span>
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() =>
                            handleDeleteExpense(expense.id, expense.amount)
                          }
                        />
                      </span>
                    </div>
                  </div>
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
