// import React from 'react';
// import './Signup.css';

// const SignupAdmin = () => {
//   return (
//     <div className="signup-popup">
//       <h2>Signup as Admin</h2>
//       <form>
//         <input type="text" placeholder="Name" />
//         <input type="email" placeholder="Email" />
//         <input type="password" placeholder="Password" />
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default SignupAdmin;


// update 
// import React, { useState } from 'react';
// import './Signup.css';

// const SignupAdmin = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }
    
//     alert('Signup successful!');
//   };

//   const handleGoogleSignup = () => {
    
//     alert('Signup with Google clicked!');
//   };

//   return (
//     <div className="signup-popup">
//       <h2>Signup as Admin</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="confirmPassword"
//           placeholder="Re-type Password"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Signup</button>
//       </form>
//       <p>Or</p>
//       <button className="google-signup-btn" onClick={handleGoogleSignup}>
//         Signup with Google
//       </button>
//     </div>
//   );
// };

// export default SignupAdmin;


// update nmd 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Reuse neumorphic style
import { FaArrowLeft } from 'react-icons/fa';

const SignupAdmin = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Signup successful!');
    navigate('/AdminDashboard'); // You can change this route as needed
  };

  const handleGoogleSignup = () => {
    alert('Signup with Google clicked!');
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

        <h2 className="gradient-text">Signup as Admin</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-type Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input-field"
            required
          />
          <button type="submit" className="neumorphic-btn-signup">Signup</button>
        </form>
        <p className="login-text">
        Already have an account?{' '}
        <span className="login-link" onClick={() => navigate('/login/admin')}>
          Login
        </span>
      </p>

        <p style={{ textAlign: 'center', margin: '20px 0 10px' }}>Or</p>

        <button className="neumorphic-btn google-signup" onClick={handleGoogleSignup}>
          Signup with Google
        </button>
      </div>
    </div>
  );
};

export default SignupAdmin;
