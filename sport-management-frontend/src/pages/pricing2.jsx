import React, { useState } from 'react';
import './pricing2.css';
// import logo from '../assets/sportbit_dot_white.json';
import Lottie from 'lottie-react';
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NmdHeader from '../components/NmdHeader';




// const navigate = useNavigate();

const plans = [
  {
    title: 'Beginner',
    price: '₹599/mo',
    features: ['Basic Dashboard', 'Community Support', 'Limited Stats'],
  },
  {
    title: 'Pro',
    price: '₹1299/mo',
    features: ['Full Dashboard', 'Advanced Analytics', 'Priority Support'],
  },
  {
    title: 'Elite',
    price: '₹2499/mo',
    features: ['Pro + API Access', 'Custom Reports', 'Personal Coach Insights'],
  },
];



const PricingPage = () => {
  const handleGoHome = () => navigate('/');
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const toggleDark = () => setDarkMode(!darkMode);

  return (
    <div className={`pricing-wrapper ${darkMode ? 'dark' : 'light'}`}>
      {/* <nav id='header' className="topbar neumorphic">
        <div className="logo">
          <Lottie animationData={logo} loop={true} style={{ height: 80 }} />
         
        </div>
        <div className="actions">
          <button className="nav-btn neumorphic" onClick={handleGoHome}>Home</button>
          <button className="nav-btn neumorphic" onClick={toggleDark}>
            {darkMode ? 'Light' : ' Dark'}
          </button>
        </div>
      </nav> */}
      <NmdHeader title='Pricing' />

      <main className="pricing-container">
        <h2 className="gradient-text">Choose Your Plan</h2>
        <div className="cards ">
          {plans.map((plan, i) => (
            <div className="pricing-card neumorphic " key={i}>
              <h3>{plan.title}</h3>
              <p className="price">{plan.price}</p>
              <ul>
                {plan.features.map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </ul>
              <button className="subscribe-btn">Subscribe</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PricingPage;