// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './Login.css';

// const LoginManager = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/manager/login', {
//         email: formData.email,
//         password: formData.password,
//       });
//       alert(response.data.message);
//       localStorage.setItem('token', response.data.token);
//        const redirectPath = location.state?.from || '/palyerDash';
//       navigate(redirectPath);
//     } catch (error) {
//       alert(error.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="login-popup">
//       <h2>Login as Manager</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         Don't have an account?{' '}
//         <span className="signup-link" onClick={() => navigate('/signup/manager')}>
//           Signup
//         </span>
//       </p>
//     </div>
//   );
// };

// export default LoginManager;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css'; // ✅ make sure you're using the shared neumorphic styles
import { FaArrowLeft } from 'react-icons/fa'; 


const LoginManager = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/manager/login', {
        email: formData.email,
        password: formData.password,
      });
      alert(response.data.message);
      localStorage.setItem('token', response.data.token);
      const redirectPath = location.state?.from || '/managerDash';
      navigate(redirectPath);
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
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
      
        <h2 className="gradient-text">Login as Manager</h2>
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
          <span className="signup-link" onClick={() => navigate('/signup/manager')}>
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginManager;
