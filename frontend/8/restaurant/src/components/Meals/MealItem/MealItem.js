import React, { useContext, useState } from "react";

import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

function MealItem(props) {
  const price = `$${props.price}`;

  const cartContext = useContext(CartContext);

  // const addToCartHandler = (amount) => {
  //   cartContext.addItem(amount);
  // };

  const [enteredAmount, setEnteredAmount] = useState(1);
  const [selectedItem, setSelectedItem] = useState([]);

  const amountChangeHandler = (value) => {
    console.log("this is running",value)
    setEnteredAmount(value);
  };

  const submitHandler = () => {
    console.log(props.id,props.name,props.price,enteredAmount)
    setSelectedItem({
      id:props.id,
      name:props.name,
      amount: +enteredAmount,
      price:props.price
    })
    
    cartContext.addItem(selectedItem)
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm
          // onAddToCart={addToCartHandler}
          value={enteredAmount}
          onSubmit={submitHandler}
          onChange={amountChangeHandler}
        />
      </div>
    </li>
  );
}

export default MealItem;
