import React, { useReducer, useCallback } from "react";
import axios from "axios";

import CartContext from "./cart-context";

const { email } = JSON.parse(localStorage.getItem("user")) || {
  email: null,
};

const defaultCartState = {
  email:email,
  products: [],
  totalQty: 0,
  showModal: false,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingProductIndex = state.products.findIndex(
      (product) => product.id === action.products.id
    );

    const updatedProducts = [...state.products];

    if (existingProductIndex !== -1) {
      updatedProducts[existingProductIndex].qty += 1;
      console.log(updatedProducts[existingProductIndex]);
    } else {
      updatedProducts.push({
        ...action.products,
        qty: 1,
      });
    }
    const updatedQty = state.totalQty + 1;
    return {
      ...state,
      products: updatedProducts,
      totalQty: updatedQty,
    };
  } else if (action.type === "TOGGLE-SHOW") {
    return {
      ...state,
      showModal: true,
    };
  } else if (action.type === "TOGGLE-HIDE") {
    return {
      ...state,
      showModal: false,
    };
  } else if (action.type === "USER") {
    return {
      ...state,
      email: action.email,
    };
  }
  return state;
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addToCartHandler = async (product, email) => {
    const updatedEmail = email.replace(/[@.]/g, "");
    dispatchCartAction({ type: "ADD", products: product });
    dispatchCartAction({ type: "USER", email: updatedEmail });

    const payload = {
      products: cartState.products,
      email: cartState.email,
    };

    const response = await axios.post(
      `https://crudcrud.com/api/b1d32e7455d140f2bf91105eb4e49c69/cart${updatedEmail}`,
      payload
    );
    console.log(response);
  };

  const showCartHandler = () => {
    dispatchCartAction({ type: "TOGGLE-SHOW" });
  };

  const hideCartHandler = () => {
    dispatchCartAction({ type: "TOGGLE-HIDE" });
  };

  const cartContext = {
    addToCart: addToCartHandler,
    email: cartState.email,
    products: cartState.products,
    totalQty: cartState.totalQty,
    showModal: cartState.showModal,
    showCartHandler: showCartHandler,
    hideCartHandler: hideCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};
