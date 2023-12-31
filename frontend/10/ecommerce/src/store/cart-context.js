import React, { createContext } from "react";

const CartContext = createContext({
  email:'',
  products: [],
  totalQty: 0,
  showModal: false,
  showCartHandler: () =>{},
  addToCart: () => {},
  hideCartHandler: () => {},
  removeFromCart: () => {}
});

export default CartContext