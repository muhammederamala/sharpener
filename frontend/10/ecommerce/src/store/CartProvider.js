import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  products: [],
  totalQty: 0
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingProductIndex = state.products.findIndex(
      (product) => product.id === action.products.id
    );

    const updatedProducts = [...state.products];

    if (existingProductIndex !== -1) {
      updatedProducts[existingProductIndex].qty = +1;
    } else {
      updatedProducts.push({
        ...action.product,
        qty: 1,
      });
    }
    const updatedQty = state.totalQty + 1;
    return {
      ...state,
      products: updatedProducts,
      totalQty: updatedQty,
    };
  }
  return state;
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addToCartHandler = (product) => {
    dispatchCartAction({ type: "ADD", products: product });
  };

  const cartContext = {
    products: cartState.products,
    totalQty: cartState.totalQty,
    addToCart: addToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};
