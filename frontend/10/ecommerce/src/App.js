import react, { Fragment, useState } from "react";

import Products from "./components/Products";
import Navbar from "./Header/Navbar";
import Cart from "./components/Cart";
import { CartProvider } from "./store/CartProvider";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <CartProvider>
      {showModal && <Cart showModal={showModal} handleClose={handleCloseModal}/> }
      <Navbar onShow={handleShowModal}/>
      <Products />
    </CartProvider>
  );
}

export default App;
