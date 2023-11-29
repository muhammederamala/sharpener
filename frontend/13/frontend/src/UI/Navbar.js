import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate()
  const liStyle = { minWidth: "100px" };

  const [userData, setUserData] = useState({
    displayName: null,
    photoUrl: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "AIzaSyDXbZYq5uHCeDvfqOMDUJkbkWqIKj4op80";
        const idToken = localStorage.getItem("Token");

        if (idToken) {
          const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
            { idToken }
          );

          if (response.data.users && response.data.users.length > 0) {
            const user = response.data.users[0];
            if (user.displayName && user.photoUrl) {
              setUserData({
                displayName: user.displayName,
                photoUrl: user.photoUrl,
              });
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchData();
  }, []);

  const logoutHandler = () =>{
    localStorage.removeItem('Token')
    navigate('/login')
  }

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
            {userData.displayName && userData.photoUrl ? (
              <li className="nav-item" style={liStyle}>
                <NavLink to="/profile" className="nav-link">
                  <img
                    src={userData.photoUrl}
                    alt="User"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                    className="mr-2"
                  />
                  {userData.displayName}
                </NavLink>
              </li>
            ) : (
              <li className="nav-item p-1" style={liStyle}>
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
            )}
            <li className="nav-item p-1" style={liStyle}>
              <button className="nav-link" onClick={logoutHandler} >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
}

export default Navbar;
