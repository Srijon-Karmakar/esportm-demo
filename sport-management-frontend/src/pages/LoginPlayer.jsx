import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import { FaArrowLeft } from 'react-icons/fa'; 

const LoginPlayer = () => { 
  const { setUser } = useContext(UserContext);//update for sidebar dynamic isername
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/player/login', {
        email: formData.email,
        password: formData.password,
      });
      alert(response.data.message);
      localStorage.setItem('token', response.data.token); 
      localStorage.setItem('username', response.data.username); // Save the username
      // const redirectPath = location.state?.from || '/dashboard/player';
      // const redirectPath = location.state?.from || '/pages/playerstats.jsx';
      const redirectPath = '/NmdDashboard';
      navigate(redirectPath);
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }

    // update for dynamic username 
    // const data = await response.json();

      
    // setUser({
    //   username: data.username,
    //   avatar: data.avatar || require('../assets/images/default.png'),
    //   userId: data.userId,
    // });

    // navigate('/NmdDashboard');
  };
  

  

  return (
    // <div className="login-popup">
    //   <h2>Login as Player</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
    //     <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
    //     <button type="submit">Login</button>
    //   </form>
    //   <p>
    //     Don't have an account?{' '}
    //     <span className="signup-link" onClick={() => navigate('/signup/player')}>
    //       Signup
    //     </span>
    //   </p>
    // </div>

    <div className="login-wrapper">
      <div className="login-popup neumorphic">
      {/* <svg
          className="home-icon"
          onClick={() => navigate('/')}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg> */}
        <FaArrowLeft 
        className="back-icon"
        onClick={() => navigate('/')}
      />
      
        <h2 className="gradient-text">Login as Player</h2>
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit" className="neumorphic-btn-login">Login</button>
          <p className="signup-text">
          <span className="signup-link" onClick={() => navigate('/forgot-password')}>
            Forgot Password?
          </span>
        </p>
        </form>
        <p className="signup-text">
          Don't have an account?{' '}
          <span className="signup-link" onClick={() => navigate('/signup/player')}>
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPlayer;