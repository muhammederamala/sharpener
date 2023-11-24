import react, { Fragment, useState } from "react";

import Products from "./components/Products";
import Navbar from "./Header/Navbar";
import Cart from "./components/Cart";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <Fragment>
      {showModal && <Cart showModal={showModal} handleClose={handleCloseModal}/> }
      <Navbar onShow={handleShowModal}/>
      <Products />
    </Fragment>
  );
}

export default App;
