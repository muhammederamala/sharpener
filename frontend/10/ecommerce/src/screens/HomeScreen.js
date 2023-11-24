import React, { Fragment } from "react";

import Products from "../components/Products";
import Navbar from "../Header/Navbar";
import Cart from "../components/Cart";

function HomeScreen(props) {
  return (
    <Fragment>
      {/* {props.showModal && (
        <Cart showModal={props.showModal} handleClose={props.handleCloseModal} />
      )} */}
      {/* <Navbar onShow={handleShowModal} /> */}
      <Products />
    </Fragment>
  );
}

export default HomeScreen;
