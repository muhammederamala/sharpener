import React, { createContext, useReducer } from "react";

const ProductContext = createContext({
  products: [],
  addProduct: () => {},
});

const defaultProductState = {
  products: [],
};

const productReducer = (state, action) => {
  let updatedProducts;
  if (action.type === "ADD") {
    updatedProducts = (state.products || []).concat(action.item);
    return {
      products: updatedProducts,
    };
  }
  return defaultProductState;
};

export const ProductProvider = ({ children }) => {
  const [productState, dispatchProductAction] = useReducer(
    productReducer,
    defaultProductState
  );

  const addProductHandler = (item) => {
    dispatchProductAction({ type: "ADD", item: item });
  };

  const productContext = {
    products: productState.products,
    addProduct: addProductHandler,
  };

  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
