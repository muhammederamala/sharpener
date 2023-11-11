import React from "react";

import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";

function ExpenseItem(props) {
  const expenseDate = props.expense.date
  const expenseTitle = props.expense.title
  const expenseAmount = props.expense.amount

  return (
    <div className="expense-item">
      <ExpenseDate date={expenseDate}/>
      <div className="expense-item__description">
        <h2>{expenseTitle}</h2>
        <div className="expense-item__price">${expenseAmount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
