import react, { Fragment, useContext, useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Navbar from "./Header/Navbar";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import { CartProvider } from "./store/CartProvider";
import CartContext from "./store/cart-context";
import Cart from "./components/Cart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Navbar />}>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/about" element={<AboutScreen />} />
    </Route>
  )
);

function App() {
  const cartCtx = useContext(CartContext);
  
  return (
    <CartProvider>
      <Cart/>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
