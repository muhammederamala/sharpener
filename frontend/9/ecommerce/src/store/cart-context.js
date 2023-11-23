import React, { createContext, useReducer } from "react";

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
});

const defaultCartState = {
  products: [],
};

const cartReducer = (state,action) =>{
    if(action.type ==="ADD"){
        
    }
}

export const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addToCartHandler = (product) =>{
    dispatchCartAction({type:"ADD",product:product})
  }

  const cartContext = {
    cart: cartState.products,
    addToCart: addToCartHandler
  }

  return (
    <ProductContext.Provider value={cartContext}>
      {children}
    </ProductContext.Provider>
  );
};
