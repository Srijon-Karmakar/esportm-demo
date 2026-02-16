
import React from 'react';
import './Login.css';
// import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// import sportbitVideo from '../assets/sportbit_dot_black.json';
import Lottie from 'lottie-react';

const Login = () => {
  // const [activeTab, setActiveTab] = useState('login');
  // const [role, setRole] = useState('player');
  const { role } = useParams();

  return (
    <div className="login-popup">
      <div className="logo">
                {/* <img id="logo" src={sportbitLogo}  alt="Logo" /> */}
                {/* <video id="logo-video" src={sportbitVideo} autoPlay loop muted></video>  */}
      
                <div style={{ width: 150, height: 150 }}>
            <Lottie animationData={sportbitVideo} loop={true} />
          </div>
              </div>
    <h2>Login as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
    <form>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
);
}; 
  

export default Login;


