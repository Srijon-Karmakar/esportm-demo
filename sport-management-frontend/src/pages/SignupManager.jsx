// import React from 'react';
// import './Signup.css';

// const SignupManager = () => {
//   return (
//     <div className="signup-popup">
//       <h2>Signup as Manager</h2>
//       <form>
//         <input type="text" placeholder="Name" />
//         <input type="email" placeholder="Email" />
//         <input type="password" placeholder="Password" />
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default SignupManager;

// update 
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import './Signup.css';

// const SignupManager = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//     club_id: '',
//   });

//   const location = useLocation();
//   const navigate = useNavigate();
  
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }
//     try {
//       const response = await axios.post('http://localhost:5000/manager/signup', {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         phone: formData.phone,
//         club_id: formData.club_id,
//       });
//       alert(response.data.message);
//        const redirectPath = location.state?.from || '/palyerDash';
//       navigate(redirectPath);
//     } catch (error) {
//       alert(error.response?.data?.message || 'Signup failed');
//     }
//   };

//   return (
//     <div className="signup-popup">
//       <h2>Signup as Manager</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <input type="password" name="confirmPassword" placeholder="Re-type Password" onChange={handleChange} required />
//         <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />
//         <input type="text" name="club_id" placeholder="Club ID" onChange={handleChange} required />
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default SignupManager;


// update 2
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // ✅ Shared neumorphic stylesheet
import { FaArrowLeft } from 'react-icons/fa'; 


const SignupManager = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    // club_id: '',
  });

  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/manager/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        club_id: formData.club_id,
      });
      alert(response.data.message);
      const redirectPath = location.state?.from || '/ManagerDash';
      navigate(redirectPath);
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-popup neumorphic">
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

        <h2 className="gradient-text">Signup as Manager</h2>
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

export default SignupManager;
