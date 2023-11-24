import React, { useContext } from "react";

import CartContext from "../store/cart-context";

function Navbar(props) {
  const cartCtx = useContext(CartContext)

  const liStyle = { minWidth: "100px" };

  return (
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
            <a className="nav-link" href="/about">
              About Us
            </a>
          </li>
        </ul>
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          onClick={props.onShow}
        >
          Cart ({cartCtx.totalQty})
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
