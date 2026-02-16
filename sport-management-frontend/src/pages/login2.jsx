import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { FaArrowLeft } from 'react-icons/fa';
import { FaUser, FaUsers, FaChalkboardTeacher, FaUserTie, FaHeartbeat, FaUtensils, FaRunning, FaMapMarkerAlt } from 'react-icons/fa';
import Lottie from 'lottie-react';
// import sportbitVideo from '../assets/sportbit_dot_black.json';

const ROLE_OPTIONS = [
  { key: 'player', label: 'Player', icon: <FaRunning />, api: '/player/login', redirect: '/NmdDashboard' },
  { key: 'club', label: 'Club', icon: <FaUsers />, api: '/club/login', redirect: '/clubDashboard' },
  { key: 'manager', label: 'Manager', icon: <FaUserTie />, api: '/manager/login', redirect: '/ManagerDash' },
  { key: 'agent', label: 'Agent', icon: <FaUser />, api: '/agent/login', redirect: '/AgentDashboard' },
  { key: 'physio', label: 'Physio', icon: <FaHeartbeat />, api: '/physio/login', redirect: '/PhysioDashboard' },
  { key: 'coach', label: 'Coach', icon: <FaChalkboardTeacher />, api: '/coach/login', redirect: '/CoachDashboard' },
  { key: 'nutritionist', label: 'Nutritionist', icon: <FaUtensils />, api: '/nutritionist/login', redirect: '/NutriDashboard' },
  { key: 'pitchmanager', label: 'Pitch Manager', icon: <FaMapMarkerAlt />, api: '/pitchmanager/login', redirect: '/PitchManagerDash' },
];

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!role) {
      alert('Please select your role.');
      return;
    }

    const current = ROLE_OPTIONS.find(r => r.key === role);
    setLoading(true);
    try {
      const { data } = await axios.post(
        `http://localhost:5000${current.api}`,
        { email, password }
      );

      alert(data.message);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', role);

      if ((role === 'club' || role === 'manager') && data.club_id) {
        localStorage.setItem('club_id', data.club_id); 
        localStorage.setItem('club_name', data.club_name || data.name || '');    
      }
      if (role === 'manager' && data.manager_name) {
        localStorage.setItem('manager_name', data.manager_name);
      }
      if (role === 'physio' && data.physio?.name) {
        localStorage.setItem('physio_name', data.physio.name);
      }
      if (role === 'agent' && data.agent?.name) {
        localStorage.setItem('agent_name', data.agent.name);
      }
      if (role === 'coach' && data.coach?.name) {
        localStorage.setItem('coach_name', data.coach.name);
      }
      if (role === 'nutritionist' && data.nutritionist?.name) {
        localStorage.setItem('nutritionist_name', data.nutritionist.name);
      }
      if (role === 'pitchmanager' && data.pitchmanager?.name) {
        localStorage.setItem('pitchmanager_name', data.pitchmanager.name);
      }

      if (data.username) localStorage.setItem('username', data.username);

      navigate(current.redirect);
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <FaArrowLeft className="back-icon" onClick={() => navigate('/')} />
      <div className="login-popup neumorphic">
        <div className="logo">
          <div style={{ width: 70, height: 40 }}>
            <Lottie animationData={sportbitVideo} loop />
          </div>
        </div>

        <h2 className="gradient-text">Login</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* Role Selector Button */}
          <button
            type="button"
            className="input-field role-dropdown"
            onClick={() => setShowRoleModal(true)}
          >
            {role ? `Role: ${ROLE_OPTIONS.find(r => r.key === role)?.label}` : 'Select Your Role'}
          </button>
          
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPass(e.target.value)}
            required
          />

          <button
            type="submit"
            className="neumorphic-btn-login"
            disabled={loading}
          >
            {loading
              ? 'Please wait…'
              : role
                ? `Login as ${ROLE_OPTIONS.find(r => r.key === role)?.label}`
                : 'Login'}
          </button>
        </form>

        <p className="signup-text">
          <span className="signup-link" onClick={() => navigate('/forgot-password')}>
            Forgot Password?
          </span>
        </p>

        {role !== 'admin' && (
          <p className="signup-text">
            Don&apos;t have an account?{' '}
            <span
              className="signup-link"
              onClick={() => role ? navigate(`/signup/${role}`) : alert('Please select a role first')}
            >
              Signup
            </span>
          </p>
        )}
      </div>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div className="role-modal-overlay">
          <div className="role-modal">
            <h3>Select Your Role</h3>
            <div className="role-grid">
              {ROLE_OPTIONS.map(option => (
                <div
                  key={option.key}
                  className="role-card"
                  onClick={() => {
                    setRole(option.key);
                    setShowRoleModal(false);
                  }}
                >
                  <div className="role-icon">{option.icon}</div>
                  <div className="role-label">{option.label}</div>
                </div>
              ))}
            </div>
            <button
              className="close-modal"
              onClick={() => setShowRoleModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
