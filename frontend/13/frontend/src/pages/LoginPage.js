import React, { Fragment, useContext, useState } from "react";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [incorrect, setIncorrect] = useState();
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

    const loginDetails = {
      email: formData.email,
      password: formData.password,
      returnSecureToken: true,
    };
    try {
      setIncorrect(false);
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXxzjI1NKvI10Yz_uSoJbvlohynnXe6lE",
        loginDetails
      );
      localStorage.setItem("Token", response.data.idToken);
      navigate("/");
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setIncorrect(true);
    }
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
          <div className="mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          {incorrect && (
            <div className="alert alert-danger mt-3" role="alert">
              Incorrect email or password
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default LoginPage;
