import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import axios from 'axios';

function PasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setSuccess(false); // Reset success status when the email changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        email:email,
        requestType: "PASSWORD_RESET"
      }

      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDXxzjI1NKvI10Yz_uSoJbvlohynnXe6lE',payload)
      setLoading(false)
      setSuccess(true);
    } catch (error) {
      console.error('Error submitting email:', error);
      setLoading(false)
    }
  };

  return (
    <div className="container mt-4">
      <div className="border p-4" style={{ maxWidth: '400px', margin: 'auto' }}>
        <h2>Forgot Password</h2>
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
              value={email}
              onChange={handleChange}
              required
              disabled={loading} // Disable the input while loading
            />
          </div>
          {loading ? (
            <button type="submit" className="btn btn-primary" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          ) : success ? (
            <button type="submit" className="btn btn-success" disabled>
              <FaCheck style={{ marginRight: '5px' }} />
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default PasswordPage;
