import { useContext, useEffect, useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// context
import { CartProvider } from "./store/CartProvider";
import ProductProvider from "./store/ProductProvider";
import AuthContext from "./store/auth-context";

// components and screens
import Cart from "./components/Cart";
import StoreScreen from "./screens/StoreScreen";
import ContactScreen from "./screens/ContactScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import Navbar from "./Header/Navbar";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

function App() {
  const authCtx = useContext(AuthContext);
  const [loggedInStatus , setLoggedInstatus] = useState()

  useEffect(()=>{
    setLoggedInstatus(authCtx.isLoggedIn)
  },[authCtx.isLoggedIn])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Navbar />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path='/store' element={loggedInStatus ? <StoreScreen /> : <LoginScreen/> } />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="/store/:id" element={<ProductDetailsScreen />} />
      </Route>
    )
  );
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
