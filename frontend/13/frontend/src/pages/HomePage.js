import React from 'react';
import axios from 'axios';

function HomePage() {
  const sendVerificationEmail = async () => {
    const apiKey = 'AIzaSyDXbZYq5uHCeDvfqOMDUJkbkWqIKj4op80';
    const idToken = localStorage.getItem("Token");

    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
        {
          requestType: 'VERIFY_EMAIL',
          idToken,
        }
      );

      console.log('Verification email sent:', response.data);
    } catch (error) {
      console.error('Error sending verification email', error);
    }
  };

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={sendVerificationEmail}>Verify Email</button>
    </div>
  );
}

export default HomePage;
