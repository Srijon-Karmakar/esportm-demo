import React, { useEffect, useState, useRef } from 'react';
import './Home2.css';
// import { Canvas, useFrame } from '@react-three/fiber';
// import sportbitVideo from '../assets/sportbit_dot_black.json';
import Lottie from 'lottie-react';
// import bg1 from '../assets/images/bg1.jpg';
// import bg2 from '../assets/images/bg2.jpg';
// import bg3 from '../assets/images/bg3.jpg';

const sections = [
  { 
    id: 's1', 
    text: 'Welcome to SportBit',
    description: 'An AI-powered sports analytics platform designed to revolutionize how players, coaches, and clubs interact, train, and perform An AI-powered sports analytics platform designed to revolutionize how players, coaches, and clubs interact, train, and perform.',
    bg: '#E4E4E4',
    titleColor: '#bf42f5',
    textColor: '#8d1c9c'
  },

  { 
    id: 's2', 
    text: 'Performance & Stats',
    description: 'Track real-time statistics, analyze performance metrics, and get AI-powered insights to improve your game. Track real-time statistics, analyze performance metrics, and get AI-powered insights to improve your game.',
    bg: '#E4E4E4',
    titleColor: '#427bf5',
    textColor: '#1c5a9c'
    
  },
  { 
    id: 's3', 
    text: 'Injury Tracker & AI',
    description: 'Advanced injury prevention and recovery management system powered by artificial intelligence.Advanced injury prevention and recovery management system powered by artificial intelligence.',
    bg: '#E4E4E4',
    titleColor: '#42f548',
    textColor: '#299c1c'
    
  },
  { 
    // id: 's4', 
    // text: 'Health Services',
    // description: 'Advanced injury prevention and recovery management system powered by artificial intelligence.Advanced injury prevention and recovery management system powered by artificial intelligence.',
    // bg: '#E4E4E4',
    // titleColor: '#f5e642',
    // textColor: '#9c821c'

    id: 's4', 
  text: 'Why SportBit',
  description: `SportBit is more than just a sports analytics tool — it's a smart, AI-powered ecosystem built to elevate performance at every level. From real-time insights and predictive injury tracking to seamless team collaboration and mobile-first access, SportBit empowers athletes, coaches, and clubs to train smarter, recover faster, and achieve their full potential — all while keeping their data secure and under control.`,
  bg: '#E4E4E4',
  titleColor: '#f5e642',
  textColor: '#9c821c'
    
  },
  { 
    id: 's5', 
    text: 'Contact Us',
    // description: 'Advanced injury prevention and recovery management system powered by artificial intelligence.Advanced injury prevention and recovery management system powered by artificial intelligence.',
    bg: '#E4E4E4',
    titleColor: '#f57842',
    textColor: '#9c4b1c'
    
  },
];

// const SpinningCube = ({ sectionIndex }) => {
//   const ref = useRef();
//   useFrame(() => {
//     ref.current.rotation.x += 0.01 + sectionIndex * 0.005;
//     ref.current.rotation.y += 0.01 + sectionIndex * 0.005;
//   });

//   return (
//     <mesh ref={ref} position={[9, 0, 0]}>
//       <boxGeometry args={[1.2, 1.2, 1.2]} />
//       <meshStandardMaterial color="#6f2bd3" />
//     </mesh>
//   );
// };

const ScrollTransitionPage = () => {
  const [active, setActive] = useState(0);
  const isScrolling = useRef(false);

  const handleScroll = (e) => {
    if (isScrolling.current) return;
    isScrolling.current = true;

    if (e.deltaY > 0 && active < sections.length - 1) {
      setActive((prev) => prev + 1);
    } else if (e.deltaY < 0 && active > 0) {
      setActive((prev) => prev - 1);
    }

    setTimeout(() => (isScrolling.current = false), 700);
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [active]);

  return (
    <div className="scroll-page">
      <header className="fixed-header">
        {/* <div className="logo">SportBit</div> */}

        {/* <div className="logo">
          <div style={{ width: 130, height: 130 }}>
            <Lottie animationData={sportbitVideo} loop={true} />
          </div>
        </div> */}

        <nav>
          <a className='neumorphic' href="/">Home</a>
          {/* <a className='neumorphic' href="#s2">Stats</a> */}
          <a className='neumorphic' href="login2">Get Started</a>
        </nav>
      </header>

      {/* <div className="three-container">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 5]} />
          <SpinningCube sectionIndex={active} />
        </Canvas>
      </div> */}

      {/* {sections.map((section, index) => (
        <div
          key={section.id}
          id={section.id}
          className={`section ${index === active ? 'active' : ''}`}
          style={{
            
          }}
        >
          <h1>{section.text}</h1>
        </div>
      ))} */}
      {sections.map((section, index) => (
  <div
    key={section.id}
    id={section.id}
    className={`section ${index === active ? 'active' : ''}`}
    style={{
      backgroundColor: section.bg,
      // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${section.bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transform: `translateY(${index <= active ? '0%' : '100%'})`,
      zIndex: index === active ? 2 : 1,
    }}
  >
    <div className="section-content">
      <h1 style={{ color: section.titleColor }}>{section.text}</h1>
      {/* <p style={{ color: section.textColor }}>{section.description}</p> */}


      {section.id === 's1' ? (
      <div className="intro-wrapper">
          <h2 className="intro-subtitle">Your team, your data. Your performance engine.</h2>
          <p id='welcome-p' >Sportbit is not just software—it's your digital coach, planner, and manager.</p>
          <p id='welcome-p'>We help you organize, optimize, and elevate everything — from training drills to match stats, from health tracking to team communication.</p>

    <div className="features">
      <div className="feature-item">
        <span className="feature-icon">🔒</span>
        <span>100% Secure</span>
      </div>
      <div className="feature-item">
        <span className="feature-icon">📱</span>
        <span>Mobile Ready</span>
      </div>
      <div className="feature-item">
        <span className="feature-icon">🤖</span>
        <span>AI-Powered</span>
      </div>
    </div>

    <p id='welcome-p' className="final-line">
      Designed for real sportspeople who want to work smart, win big.
      <br />
      From club admins to athletes — <strong>everyone wins with Sportbit</strong>.
    </p>{section.id === 's1' ? (
  <div className="intro-wrapper">
    

    {/* <div className="features">
      <div className="feature-item">
        <span className="feature-icon">🔒</span>
        <span>100% Secure</span>
      </div>
      <div className="feature-item">
        <span className="feature-icon">📱</span>
        <span>Mobile Ready</span>
      </div>
      <div className="feature-item">
        <span className="feature-icon">🤖</span>
        <span>AI-Powered</span>
      </div>
    </div> */}

    
  </div>
) : (
  <p style={{ color: section.textColor }}>{section.description}</p>
)}

  </div>
) : (
  <p style={{ color: section.textColor }}>{section.description}</p>
)}






      {section.id === 's5' ? (
  <div className="contact-wrapper">
    <div className="contact-left">
      <h3>Got a question or ready to get started?</h3>
      <p>We'd love to hear from you!</p>
      <p><strong>Office:</strong> Sportbit Kolkata, India</p>
      <p><strong>Email:</strong> support@sportbit.ai</p>
      <p><strong>Call:</strong> +91 9876543210</p>
      <p><strong>Support Hours:</strong> Mon–Fri, 11 AM–6 PM IST</p>
      <p>Our support team usually replies within 24 hours.</p>
    </div>

    <form className="contact-right">
      <input type="text" name="name" placeholder="Your Name" required />
      <input type="email" name="email" placeholder="Your Email" required />
      <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
      <button type="submit" className="cta-button">Send Message</button>
    </form>
  </div>
) : (

<button id='learn-btn' className="cta-button "></button>
      )}
    </div>
  </div>
))}
    </div>
  );
};

export default ScrollTransitionPage;
