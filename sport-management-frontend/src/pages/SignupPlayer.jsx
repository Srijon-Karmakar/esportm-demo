// import React, { useState} from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import './Signup.css';

// const SignupPlayer = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone_number: '',
//     position: '',
//     height: '',
//     weight: '',
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
//       const response = await axios.post('http://localhost:5000/player/signup', {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         phone_number: formData.phone_number,
//         position: formData.position,
//         height: formData.height,
//         weight: formData.weight,
//       });
//       alert(response.data.message);
//       const redirectPath = location.state?.from || '/';
//       navigate(redirectPath);
//     } catch (error) {
//       alert(error.response?.data?.message || 'Signup failed');
//     }
//   };

//   return (
//     <div className="signup-popup">
      
//       <svg
//         className="home-icon"
//         onClick={() => navigate('/')}
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//       >
//         <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
//       </svg>
//       <h2>Signup as Player</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <input type="password" name="confirmPassword" placeholder="Re-type Password" onChange={handleChange} required />
//         <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} />
//         <input type="text" name="position" placeholder="Position" onChange={handleChange} />
//         <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} />
//         <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} />
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default SignupPlayer;




import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // ✅ Use shared neumorphic stylesheet
import { FaArrowLeft } from 'react-icons/fa'; 

const SignupPlayer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    position: '',
    height: '',
    weight: '',
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
      const response = await axios.post('http://localhost:5000/player/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone_number,
        position: formData.position,
        height: formData.height,
        weight: formData.weight,
      });
      alert(response.data.message);
      // const redirectPath = location.state?.from || '/login/player';
      const redirectPath = location.state?.from || '/login2';
      navigate(redirectPath);
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-popup neumorphic">
        {/* Home Icon */}
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

        <h2 className="gradient-text">Signup as Player</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="input-field" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="input-field" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input-field" />
          <input type="password" name="confirmPassword" placeholder="Re-type Password" onChange={handleChange} required className="input-field" />
          <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} className="input-field" />
          <input type="text" name="position" placeholder="Position" onChange={handleChange} className="input-field" />
          <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} className="input-field" />
          <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} className="input-field" />

          <button type="submit" className="neumorphic-btn-signup">Signup</button>
        </form>
        <p className="login-text">
        Already have an account?{' '}
        {/* <span className="login-link" onClick={() => navigate('/login/player')}> */}
        <span className="login-link" onClick={() => navigate('/login2')}>
          Login
        </span>
      </p>
      </div>
    </div>
  );
};

export default SignupPlayer;
