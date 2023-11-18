import React, { useState } from "react";

import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

function MealItemForm(props) {

  // const [selectedAmount, setSelectedAmount] = useState(1)

  // const amountChangeHandler = (event) =>{
  //   setSelectedAmount(event.target.value)
  //   props.onChange(selectedAmount)
  // }

  const submitHandler = (event)=>{
    event.preventDefault()
    props.onSubmit()
  }

  return (
    <form className={classes.form} onSubmit={submitHandler} >
      <Input
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
        }}
        value={props.value}
        onChange={props.onChange}
      />
      <button>+ Add</button>
    </form>
  );
}

export default MealItemForm;
