// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import './Signup.css';

// const SignupClub = () => {
//   const [formData, setFormData] = useState({
//     club_name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     location: '',
//     establish_date: '',
//     phone_number: '',
//     description: '',
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
//       const response = await axios.post('http://localhost:5000/club/signup', {
//         club_name: formData.club_name,
//         email: formData.email,
//         password: formData.password,
//         location: formData.location,
//         establish_date: formData.establish_date,
//         phone_number: formData.phone_number,
//         description: formData.description,
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
//       <h2>Signup as Club</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="club_name" placeholder="Club Name" onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <input type="password" name="confirmPassword" placeholder="Re-type Password" onChange={handleChange} required />
//         <input type="text" name="location" placeholder="Location" onChange={handleChange} />
//         <input type="date" name="establish_date" placeholder="Establish Date" onChange={handleChange} />
//         <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} />
//         <input type="text" name="description" placeholder="Description" onChange={handleChange} />
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default SignupClub;



// update nmd 
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // ✅ Shared neumorphic stylesheet
import { FaArrowLeft } from 'react-icons/fa';


const SignupClub = () => {
  
  const [formData, setFormData] = useState({
    club_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    establish_date: '',
    phone_number: '',
    description: '',
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
      const response = await axios.post('http://localhost:5000/club/signup', {
        club_name: formData.club_name,
        email: formData.email,
        password: formData.password,
        location: formData.location,
        establish_date: formData.establish_date,
        phone_number: formData.phone_number,
        description: formData.description,
      });
      alert(response.data.message);
      const redirectPath = location.state?.from || '/login2';
      navigate(redirectPath);
    } catch (error) {
      // alert(error.response?.data?.message || 'Signup failed');
      console.error('Signup error:', error);
      // res.status(500).json({ error: error.message });
      alert(error.response?.data?.message || error.message || 'Signup failed');

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

        <h2 className="gradient-text">Signup as Club</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="club_name"
            placeholder="Club Name"
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
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="date"
            name="establish_date"
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="input-field"
          />

          <button type="submit" className="neumorphic-btn-signup">Signup</button>
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

export default SignupClub;
