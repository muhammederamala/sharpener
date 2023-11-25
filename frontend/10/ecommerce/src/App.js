import react, { Fragment, useContext, useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// context
import { CartProvider } from "./store/CartProvider";
import CartContext from "./store/cart-context";
import ProductContext from "./store/product-context";
import ProductProvider from "./store/ProductProvider";

// components and screens
import Cart from "./components/Cart";
import StoreScreen from "./screens/StoreScreen";
import ContactScreen from "./screens/ContactScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import Navbar from "./Header/Navbar";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Navbar />}>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/store" element={<StoreScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      <Route path="/contact" element={<ContactScreen />} />
      <Route path="/store/:id" element={<ProductDetailsScreen />} />
    </Route>
  )
);

function App() {
  const cartCtx = useContext(CartContext);

  return (
    <ProductProvider>
      <CartProvider>
        <Cart />
        <RouterProvider router={router} />
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
