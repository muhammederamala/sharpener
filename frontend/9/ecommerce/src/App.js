import react from "react";

import AddProductForm from "./components/AddProductForm";
import Navbar from "./Layout/Navbar";
import Products from "./components/Products";
import { ProductProvider } from "./store/product-context";

function App() {
  return (
    <ProductProvider>
      <Navbar />
      <AddProductForm />
      <Products />
    </ProductProvider>
  );
}

export default App;
