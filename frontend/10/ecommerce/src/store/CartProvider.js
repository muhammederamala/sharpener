import React, { useReducer, useCallback } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  products: [],
  totalQty: 0,
  showModal: false,
};

const cartReducer = (state, action) => {
  console.log("this ran")
  if (action.type === "ADD") {
    const existingProductIndex = state.products.findIndex(
      (product) => product.id === action.products.id
    );

    const updatedProducts = [...state.products];

    if (existingProductIndex !== -1) {
      updatedProducts[existingProductIndex].qty += 1;
      console.log(updatedProducts[existingProductIndex])
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
  }
  return state;
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addToCartHandler = useCallback((product) => {
    console.log("this ran")
    dispatchCartAction({ type: "ADD", products: product });
  }, [dispatchCartAction]);

  const showCartHandler = () => {
    dispatchCartAction({ type: "TOGGLE-SHOW" });
  };

  const hideCartHandler = () => {
    dispatchCartAction({ type: "TOGGLE-HIDE" });
  };

  const cartContext = {
    addToCart: addToCartHandler,
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
