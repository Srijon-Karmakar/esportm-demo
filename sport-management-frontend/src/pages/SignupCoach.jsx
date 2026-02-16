import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import { FaArrowLeft } from 'react-icons/fa';

const SignupCoach = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    club_id: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

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
      const response = await axios.post('http://localhost:5000/coach/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        club_id: formData.club_id,
      });
      alert(response.data.message);
      // const redirectPath = location.state?.from || '/CoachDashboard';
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
        <h2 className="gradient-text">Signup as Coach</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input className="input-field" name="name" placeholder="Name" onChange={handleChange} required />
          <input className="input-field" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="input-field" name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <input className="input-field" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
          <input className="input-field" name="phone" placeholder="Phone Number" onChange={handleChange} />
          <input className="input-field" name="club_id" placeholder="Club ID" onChange={handleChange} required />
          <button type="submit" className="neumorphic-btn-signup">Signup</button>
        </form>
        <p className="login-text">
          Already have an account? <span className="login-link" onClick={() => navigate('/login2')}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default SignupCoach;
