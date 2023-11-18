import React, { useContext } from "react";

import classes from "./HeaderCartbutton.module.css";
import CartIcon from "../Cart/CartIcons";
import CartContext from "../../store/cart-context";

function HeaderCartbutton(props) {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartbutton;
