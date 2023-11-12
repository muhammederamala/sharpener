import React from "react";

import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

function ExpenseItem(props) {
  const expenseDate = props.expense.date
  const expenseTitle = props.expense.title
  const expenseAmount = props.expense.amount

  const clickHandler = () =>{
    console.log("Clicked")
  }

  return (
    <Card className="expense-item">
      <ExpenseDate date={expenseDate}/>
      <div className="expense-item__description">
        <h2>{expenseTitle}</h2>
        <div className="expense-item__price">${expenseAmount}</div>
      </div>
      <button onClick={clickHandler}>Change title</button>
    </Card>
  );
}

export default ExpenseItem;
