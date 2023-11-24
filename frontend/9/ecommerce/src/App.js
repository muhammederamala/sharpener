import react from "react";

import AddProductForm from "./components/AddProductForm";
import Navbar from "./Layout/Navbar";
import Products from "./components/Products";
import { ProductProvider } from "./store/product-context";
import { CartProvider } from "./store/cart-context";

function App() {
  return (
    <CartProvider>
      <ProductProvider>
        <Navbar />
        <AddProductForm />
        <Products />
      </ProductProvider>
    </CartProvider>
  );
}

export default App;
