import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // your shared neumorphic stylesheet
import { FaArrowLeft } from 'react-icons/fa';

const SignupPitchManager = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    club_id: '',
  });

  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/pitchmanager/signup', formData);
      alert(response.data.message);
      const redirectPath = location.state?.from || '/login2';
      navigate(redirectPath);
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-popup neumorphic">
        <FaArrowLeft className="back-icon" onClick={() => navigate('/')} />
        <h2 className="gradient-text">Signup as Pitch Manager</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-type Password"
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="club_id"
            placeholder="Club ID"
            onChange={handleChange}
            required
            className="input-field"
          />
          <button type="submit" className="neumorphic-btn-signup">
            Signup
          </button>
        </form>
        <p className="login-text">
          Already have an account?{' '}
          <span className="login-link" onClick={() => navigate('/login2')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPitchManager;
