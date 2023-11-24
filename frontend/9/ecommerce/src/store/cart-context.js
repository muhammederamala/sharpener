import React, { createContext, useReducer } from "react";

const CartContext = createContext({
  cart: [],
  totalQty: 0,
  addToCart: () => {},
});

const defaultCartState = {
  products: [],
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingProductIndex = state.products.findIndex(
      (product) => product.id === action.product.id
    );

    const updatedProducts = [...state.products];

    if (existingProductIndex !== -1) {
      updatedProducts[existingProductIndex].qty += 1;
    } else {
      updatedProducts.push({
        ...action.product,
        qty: 1,
      });
    }

    return {
      ...state,
      products: updatedProducts,
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
    dispatchCartAction({ type: "ADD", product: product });
  };

  const cartContext = {
    cart: cartState.products,
    totalQty: cartState.products.reduce((total, product) => total + product.qty, 0),
    addToCart: addToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
