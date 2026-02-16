import React, { useState, useEffect, useRef } from 'react';
import './NmdAbout.css';
// import sportbitIcon from './assets/icons/CallIcon.png';
// import sportbitVideo from '../assets/sportbit_dot_white.json';
import Lottie from 'lottie-react';
const sections = [
  { id: 'about', title: 'About SportBit App', content: 'Discover what SportBit offers…' },
  { id: 'players', title: 'Player Services', content: 'Services tailored for players…' },
  { id: 'managers', title: 'Manager Services', content: 'Tools for managers…' },
  { id: 'clubs', title: 'Club Services', content: 'Benefits for clubs…' },
  { id: 'training', title: 'Training & Health Services', content: 'Optimize training & wellness…' },
  { id: 'ai', title: 'AI & ML Services', content: 'Smart analytics, next‑gen features…' },
  { id: 'contact', title: 'Contact Us', content: 'Get in touch…' },
];

export default function App() {
  const [active, setActive] = useState(0);
  const [dark, setDark] = useState(false);
  const wrapperRef = useRef();

  const onWheel = (e) => {
    if (e.deltaY > 0 && active < sections.length - 1) setActive((i) => i + 1);
    else if (e.deltaY < 0 && active > 0) setActive((i) => i - 1);
  };

  useEffect(() => {
    const wr = wrapperRef.current;
    wr.addEventListener('wheel', onWheel, { passive: false });
    return () => wr.removeEventListener('wheel', onWheel);
  }, [active]);

  return (
    <div className={`app ${dark ? 'dark' : ''}`} ref={wrapperRef}>
      <header className="header neumorphic">
        {/* <div className="logo">
          <img src={sportbitIcon} alt="SportBit" width="40" />
          <span>SportBit</span>
        </div> */}
        <div className="logo" onClick={() => navigate('/AdminDashboard')}>
                 
        
                  <div style={{ width: 160, height: 150 }}>
              <Lottie animationData={sportbitVideo} loop={true} />
            </div>
                </div>
        <div className="hdr-controls">
          <button className="btn neumorphic">Home</button>
          <button className="btn neumorphic" onClick={() => setDark((d) => !d)}>
            {dark ? 'Light 🌞' : 'Dark 🌜'}
          </button>
        </div>
      </header>

      {sections.map((sec, i) => (
        <section
          key={sec.id}
          id={sec.id}
          className={`section ${active === i ? 'active' : ''}`}
          style={{ transform: `translateY(${(i - active) * 100}%)` }}
        >
          <div className="section-inner neumorphic">
            <h2 className="gradient-text">{sec.title}</h2>
            <p>{sec.content}</p>
            <div className="card-container">
              {[1, 2, 3].map((n) => (
                <div key={n} className="card neumorphic">
                  <img src={`https://picsum.photos/seed/${sec.id + n}/200`} alt="" />
                  <h3>{sec.title} Item {n}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
