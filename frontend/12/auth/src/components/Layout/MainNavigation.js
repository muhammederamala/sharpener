import React, { useContext } from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () =>{
    authCtx.logout()
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
      <Navbar.Brand href="#home">React Auth</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          {!isLoggedIn && (
            <NavLink to="/auth">
              <Button variant="outline-info" className="mx-2">
                Login
              </Button>
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink to='/profile'>
              <Button variant="outline-light" className="mx-2">
                Profile
              </Button>
            </NavLink>
          )}
          {isLoggedIn && (
            <Button onClick={logoutHandler} variant="outline-danger" className="mx-2">
              Logout
            </Button>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavigation;
