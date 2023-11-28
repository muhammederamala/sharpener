import React, { Fragment, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


function Navbar(props) {

  const liStyle = { minWidth: "100px" };


  return (
    <Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light py-3 fixed-top"
        style={{ borderBottom: "1px solid black" }}
      >
        <a className="navbar-brand p-2">
          <strong>Expense tracker</strong>
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
            <li className="nav-item p-1" style={liStyle}>
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
}

export default Navbar;
