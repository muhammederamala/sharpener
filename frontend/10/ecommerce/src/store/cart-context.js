import React, { createContext } from "react";

const CartContext = createContext({
  products: [],
  totalQty: 0,
  showModal: false,
  showCartHandler: () =>{},
  addToCart: () => {},
  hideCartHandler: () => {},
});

export default CartContext