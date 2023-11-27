import React, { Fragment, useContext } from "react";
import { Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

import CartContext from "../store/cart-context";
import AuthContext from "../store/auth-context";

function Navbar(props) {
  const navigate = useNavigate();

  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  const liStyle = { minWidth: "100px" };

  const showCartHandler = () => {
    cartCtx.showCartHandler();
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light py-3"
        style={{ borderBottom: "1px solid black" }}
      >
        <a className="navbar-brand p-2">
          <strong>MUSIC</strong>
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
            <li className="nav-item p-1" style={liStyle}>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            {authCtx.isLoggedIn && (
              <li className="nav-item p-1" style={liStyle}>
                <NavLink className="nav-link" to="/store">
                  Store
                </NavLink>
              </li>
            )}
            {!authCtx.isLoggedIn && (
              <li className="nav-item p-1" style={liStyle}>
                <NavLink className="nav-link" to="/login">
                  Store
                </NavLink>
              </li>
            )}
            <li className="nav-item p-1" style={liStyle}>
              <NavLink className="nav-link" to="/about">
                About Us
              </NavLink>
            </li>
            <li className="nav-item p-1" style={liStyle}>
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
            {authCtx.isLoggedIn && (
              <li className="nav-item p-1" style={liStyle}>
                <button className="nav-link" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            )}
            {!authCtx.isLoggedIn && (
              <li className="nav-item p-1" style={liStyle}>
                <NavLink className="nav-link" to="/signup">
                  Signup
                </NavLink>
              </li>
            )}
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
