// src/pages/SignupAgent.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import { FaArrowLeft } from 'react-icons/fa';

const SignupAgent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/agent/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      alert(response.data.message);
      const redirectPath = location.state?.from || '/login2';
      navigate(redirectPath);
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-popup neumorphic">
        <FaArrowLeft className="back-icon" onClick={() => navigate('/')} />
        <h2 className="gradient-text">Signup as Agent</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="input-field" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="input-field" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input-field" />
          <input type="password" name="confirmPassword" placeholder="Re-type Password" onChange={handleChange} required className="input-field" />

          <button type="submit" className="neumorphic-btn-signup">Signup</button>
        </form>
        <p className="login-text">
          Already have an account?{' '}
          <span className="login-link" onClick={() => navigate('/login2')}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default SignupAgent;
