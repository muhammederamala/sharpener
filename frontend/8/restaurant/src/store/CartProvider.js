import React, { useState } from "react";

import CartContext from "./cart-context";

function CartProvider(props) {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addItemToCartHandler = (item) => {
    const existingCartItemIndex = cartItems.findIndex((i) => i.id === item.id);

    if (existingCartItemIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingCartItemIndex].amount += +item.amount;
      setCartItems(updatedItems);
    } else {
      setCartItems((prevItems) => [...prevItems, item]);
    }

    setTotalAmount((prevTotal) => prevTotal + item.price * item.amount);
  };

  const removeItemFromCartHandler = (id) => {
    const existingCartItem = cartItems.find((item) => item.id === id);

    if (!existingCartItem) {
      return;
    }

    setTotalAmount(
      (prevTotal) =>
        prevTotal - existingCartItem.price * existingCartItem.amount
    );
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const cartContext = {
    items: cartItems,
    totalAmount: totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
