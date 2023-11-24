import React, { createContext } from "react";

const CartContext = createContext({
  products: [],
  totalQty: 0,
  addToCart: () => {},
});

export default CartContext