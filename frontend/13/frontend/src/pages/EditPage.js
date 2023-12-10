import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const userId = localStorage.getItem("Token");

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchExpenseDetails = async () => {
      try {
        const response = await axios.get(
          `https://expensetracker-fb08e-default-rtdb.firebaseio.com/expenses/${id}.json`
        );
        const expenseData = response.data;

        setAmount(expenseData.amount);
        setDescription(expenseData.description);
        setCategory(expenseData.category);
      } catch (error) {
        console.error("Error fetching expense details:", error);
      }
    };

    fetchExpenseDetails();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedExpense = {
      amount,
      description,
      category,
      userId
    };

    try {
      await axios.put(
        `https://expensetracker-fb08e-default-rtdb.firebaseio.com/expenses/${id}.json`,
        updatedExpense
      );

      console.log("Expense updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <div style={{ marginLeft: "100px", marginTop: "120px" }}>
      <div style={{ maxWidth: "500px" }}>
        <form onSubmit={handleFormSubmit}>
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
            Edit Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPage;
