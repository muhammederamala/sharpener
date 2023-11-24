import React from "react";
import CartIcon from "./CartIcon";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container" style={{ padding: "10px" }}>
        <a className="navbar-brand" href="/">
          Tshirts
        </a>
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
            <li className="nav-item">
              <CartIcon />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
