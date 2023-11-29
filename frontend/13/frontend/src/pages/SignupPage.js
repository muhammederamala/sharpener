import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function SignupPage() {
  const [formValid, setFormValid] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.email.includes("@") &&
      formData.password.length >= 6 &&
      formData.password === formData.confirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setFormValid(false);
      return;
    }
    // Continue with form submission logic
    const signUpDetails = {
      email: formData.email,
      password: formData.password,
      returnSecureToken: true
    };

    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXbZYq5uHCeDvfqOMDUJkbkWqIKj4op80', signUpDetails);
      localStorage.setItem('Token',response.data.idToken)
      navigate("/");
    } catch (err) {
      console.log(err)
    }

    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Fragment>
      <div style={{ marginBottom: "80px", marginTop: "50px" }}>
        <div
          className="container mt-4 border p-4"
          style={{ maxWidth: "600px", margin: "auto" }}
        >
          <h2>Signup</h2>
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
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          {!formValid && (
            <div className="alert alert-danger mt-3" role="alert">
              Please enter valid credentials
            </div>
          )}
          <p className="mt-3">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default SignupPage;
