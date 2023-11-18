import React, { useContext, useEffect, useState } from "react";

import classes from "./HeaderCartbutton.module.css";
import CartIcon from "../Cart/CartIcons";
import CartContext from "../../store/cart-context";

function HeaderCartbutton(props) {
  const [btnIsHighlighted, setBtnisHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ''
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnisHighlighted(true);

    const timer =  setTimeout(() => {
      setBtnisHighlighted(false)
    },300)

    return () =>{
      clearTimeout(timer)
    }
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartbutton;
