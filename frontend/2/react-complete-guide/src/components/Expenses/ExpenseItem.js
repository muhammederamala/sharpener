import React, {useState} from "react";

import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

function ExpenseItem(props) {
  let expenseDate = props.expense.date
  

  let expenseTitle = props.expense.title
  const [title,setTitle] = useState(expenseTitle);
  const clickHandler = () =>{
    setTitle('Updated')
    console.log("Clicked")
  }

  let expenseAmount = props.expense.amount
  const [amount,setAmount] = useState(expenseAmount);
  const addExpenseHandler = () =>{
    setAmount(100)
  }

  return (
    <Card className="expense-item">
      <ExpenseDate date={expenseDate}/>
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${amount}</div>
        <button onClick={addExpenseHandler}>Change price</button>
      </div>
      <button onClick={clickHandler}>Change title</button>
    </Card>
  );
}

export default ExpenseItem;
