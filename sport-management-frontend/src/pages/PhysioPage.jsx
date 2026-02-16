
// import React from 'react';
// import './PhysioPage.css';
// import Header from '../components/NmdHeader'; 
// import Footer from '../components/Footer'; 
// import physioImg from '../assets/images/physio.jpg';
// import { useNavigate } from 'react-router-dom';

// const PhysioPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="physio-page">
//       <Header title='Physio' />

//       <section className="hero-section">
//   <div className="hero-background">
//     <div className="hero-overlay-content">
//       <h1>Empowering Recovery with Professional Physio Support</h1>
//       <p>Your health, strength, and mobility — redefined.</p>
//       <div className="cta-buttons">
//         <button
//           className="neumorphic-btn"
//           onClick={() => navigate('/book-physio')}
//         >
//           Looking for Physio
//         </button>
//         <button
//           className="neumorphic-btn"
//           onClick={() => navigate('/login2')}
//         >
//           Are you a Physio? Log in
//         </button>
//       </div>
//     </div>
//   </div>
// </section>





//       <section className="services-section">
//         <h2>Our Services</h2>
//         <div className="services-cards">
//           <div className="neumorphic-card">
//             <h3>Injury Recovery</h3>
//             <p>Expert care and support to recover from physical injuries.</p>
//           </div>
//           <div className="neumorphic-card">
//             <h3>Mobility Therapy</h3>
//             <p>Customized rehab plans to enhance flexibility and range of motion.</p>
//           </div>
//           <div className="neumorphic-card">
//             <h3>Strength Training</h3>
//             <p>Targeted physiotherapy to build strength safely and efficiently.</p>
//           </div>
//         </div>
//       </section>

//       <section className="book-section">
//         <h2>Book a Physio Session</h2>
//         <form className="book-form neumorphic-form">
//           <input type="text" placeholder="Your Name" required />
//           <input type="email" placeholder="Email" required />
//           <input type="text" placeholder="Describe your issue" required />
//           <button type="submit" className="neumorphic-btn">Submit</button>
//         </form>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default PhysioPage;



import React from 'react';
import './PhysioPage.css';

const PhysioPage = () => {
  return (
    <div className="physio-page">
      {/* Header */}
      <header className="physio-header">
        <h1>Physio</h1>
        <div className="home-icon"></div>
      </header>

      {/* Hero Section */}
      <section className="physio-hero">
        <div className="hero-text">
          <h2>Empowering Recovery with Professional Physio Support</h2>
          <p>Your health, strength, and mobility — redefined.</p>
          <div className="hero-buttons">
            <button className="neumorph-button">Looking for Physio</button>
            <button className="neumorph-button">Work as Physio</button>
          </div>
        </div>
        <div className="hero-image" />
      </section>

      {/* Services Section */}
      <section className="physio-services">
        <h3>Our Services</h3>
        <div className="services-list">
          <div className="service-card">
            <div className="icon">🏥</div>
            <h4>Injury Recovery</h4>
            <p>Expert care and support to recover from physical injuries.</p>
          </div>
          <div className="service-card">
            <div className="icon">🧘‍♂️</div>
            <h4>Mobility Therapy</h4>
            <p>Customized rehab plans to enhance flexibility and range of motion.</p>
          </div>
          <div className="service-card">
            <div className="icon">💪</div>
            <h4>Strength Training</h4>
            <p>Targeted physiotherapy to build strength safely and efficiently.</p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="book-physio">
        <h3>Book a Physio</h3>
        <form className="booking-form">
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Why do you need physio" required />
          <button className="neumorph-button" type="submit">Submit</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="physio-footer">
        <div className="footer-column">
          <h4>Sportbit</h4>
          <p>Helping athletes heal, recover, and perform better.</p>
        </div>
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Book a Physio</li>
            <li>Physio Login</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contact</h4>
          <p>Email: contact@sportbit.io</p>
          <p>Phone: 987654321</p>
          <p>Location: Esplanade, Kolkata<br />West Bengal, India</p>
        </div>
      </footer>
    </div>
  );
};

export default PhysioPage;
