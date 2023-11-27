import React, { Fragment, useContext, useState } from "react";
import axios from "axios";

import Footer from "../Header/Footer";
import { useNavigate } from "react-router";

import AuthContext from "../store/auth-context";

function LoginScreen() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email: formData.email,
      password: formData.password,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXbZYq5uHCeDvfqOMDUJkbkWqIKj4op80",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      authCtx.logIn(response.data.idToken,body.email);
      navigate("/");
    } catch (err) {
      console.log(err);
    }

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };
  return (
    <Fragment>
      <div style={{ marginBottom: "80px", marginTop: "50px" }}>
        <div
          className="container mt-4 border p-4"
          style={{ maxWidth: "600px", margin: "auto" }}
        >
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default LoginScreen;
