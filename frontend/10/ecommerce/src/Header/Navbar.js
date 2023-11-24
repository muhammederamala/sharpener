import React, { Fragment, useContext } from "react";

import CartContext from "../store/cart-context";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  const cartCtx = useContext(CartContext);

  const liStyle = { minWidth: "100px" };

  const showCartHandler = () =>{
    cartCtx.showCartHandler()
  }

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
        <a className="navbar-brand">Ecommerce</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item active" style={liStyle}>
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item" style={liStyle}>
              <a className="nav-link" href="/products">
                Products
              </a>
            </li>
            <li className="nav-item" style={liStyle}>
              <NavLink className="nav-link pending" to='/about'>
                About Us
              </NavLink>
            </li>
          </ul>
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={showCartHandler}
          >
            Cart ({cartCtx.totalQty})
          </button>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
}

export default Navbar;
