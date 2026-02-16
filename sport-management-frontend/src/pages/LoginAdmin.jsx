// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const LoginAdmin = () => {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();


//     if (username === 'admin' && password === 'admin123') {
      
//       navigate('/admin/dashboard'); 
//       alert('Invalid admin credentials');
//     }
//   };
 


//   return (
//     <div className="login-popup">
//       <h2>Login as Admin</h2>
//       <form>
//         <input type="text" placeholder="Username" />
//         <input type="password" placeholder="Password" />
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         <span className="forgot-password-link" onClick={() => navigate('/forgot-password')}>
//           Forgot Password?
//         </span>
//       </p>
//       <p>
//         Don't have an account?{' '}
//         <span className="signup-link" onClick={() => navigate('/signup/admin')}>
//           Signup
//         </span>
//       </p>
//     </div>
//   );
// };

// export default LoginAdmin;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Reuse neumorphic style
import { FaArrowLeft } from 'react-icons/fa'; 

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      navigate('/AdminDashboard');
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="login-wrapper">
      <FaArrowLeft 
        className="back-icon"
        onClick={() => navigate('/')}
      />
      <div className="login-popup neumorphic">
      {/* <svg
          className="home-icon"
          onClick={() => navigate('/')}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg> */}
        {/* <FaArrowLeft 
        className="back-icon"
        onClick={() => navigate('/')}
      /> */}
      
        <h2 className="gradient-text">Login as Admin</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="neumorphic-btn-login">Login</button>
        </form>
        {/* <p className="signup-text">
          <span className="signup-link" onClick={() => navigate('/forgot-password')}>
            Forgot Password?
          </span>
        </p> */}
        {/* <p className="signup-text">
          Don't have an account?{' '}
          <span className="signup-link" onClick={() => navigate('/signup/admin')}>
            Signup
          </span>
        </p> */}
      </div>
    </div>
  );
};

export default LoginAdmin;
