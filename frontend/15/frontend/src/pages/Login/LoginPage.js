import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        formData
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError("Account Already exists");
      console.log(err);
    }
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-5 mt-5">
        <div className="card">
          <div className="card-body">
            <h2 className="mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
            <p className="mt-3">
              Don't have an account? <Link to="/signup">Click here</Link>
            </p>
          </div>
        </div>
        {error && (
          <div class="alert alert-danger mt-2" role="alert">
            Incorrect email or password
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
