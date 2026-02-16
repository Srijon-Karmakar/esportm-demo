import React, { useState } from 'react';
import './ForgotPassword.css';
import { FaArrowLeft } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate();

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle password reset (e.g., API call)
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className="forgot-password-popup">
      <FaArrowLeft 
              className="back-icon"
              onClick={() => navigate('/')}
            />
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;