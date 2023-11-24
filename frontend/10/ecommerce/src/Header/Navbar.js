import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
      <a className="navbar-brand" href="/">
        Ecommerce
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active mr-3">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item mr-3">
            <a className="nav-link" href="/products">
              Products
            </a>
          </li>
          <li className="nav-item mr-3">
            <a className="nav-link" href="/about">
              About Us
            </a>
          </li>
        </ul>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Cart
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
