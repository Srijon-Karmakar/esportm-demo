// import React from 'react';
// import './training.css';
// import trainer1 from './assets/trainer1.jpg';
// import trainer1 from '../assets/images/trainer1.jpg';
// import trainer2 from '../assets/images/yoga_trainer.jpg';

import React from 'react';
import './training.css';
import trainer1 from '../assets/images/trainer1.jpg';
import yogaTrainer from '../assets/images/yoga_trainer.jpg';
import Lottie from 'lottie-react';
import sportbitVideo from '../assets/sportbit_dot_white.json';
// import { motion } from 'framer-motion';

const App = () => {
     return (
        <div className="trainer-page">
         <div className="container">
           <main className="main-content">
             <div className="glass-effect-container">
                <header className="header">
                 <div className="logo">
                         
                
                        <div style={{ width: 160, height: 150 }}>
                           <Lottie animationData={sportbitVideo} loop={true} />
                        </div>
                 </div>
                {/* <h1 className="brand">SportBit</h1> */}
                <nav className="nav">
                    <a href="#home">Home</a>
                    <a href="#login">Login</a>
                    <button className="get-started">Get Started</button>
                </nav>
            </header>

            {/* <main className="main-content"> */}
              {/* <div className="glass-effect-container"> */}
                <h2 id='slogan' className="main-title">Precision Training for <br /> peak performance</h2>
                 <div className="buttons">
                    <button className="explore-button">Explore Now</button>
                    <button className="schedule-button">Create Schedule</button>
                 </div>
                </div>

                <section className="offerings">
                    <h3>What we offer</h3>
                    <p id='offerDetails' >From personalised training to diet plans ,get everything in one place</p>
                    <div className="offer-cards">

                        <div className="card">
                        <h1>Personal Training</h1>
                        <p>Get personla reachouts to reach your goals</p>
                        </div>

                        <div className="card">
                        <h1>Group Classes</h1>
                        <p>Join dynamic seasons,from yoga to hit.</p>
                        </div>

                        <div className="card">
                        <h1>Nutrition Guidance</h1>
                        <p>Discover Smarter eating for healthier life</p>
                        </div>

                        <div className="card">
                        <h1>Online Coaching</h1>
                        <p>Train anytime, anywhere, with expert guidance</p>
                        </div>
                    </div>
                </section>

                <section className="trainers-section">
                    <h3>Meet Our Trainers</h3>
                    <div className="trainers">

                        <div className="trainer-card">
                        <img src= { trainer1 } alt="Trainer 1" className="trainer-image" />
                        <p>Demo Trainer Name<br />Yoga Trainer</p>
                        </div>

                        <div className="trainer-card">
                        <img src= { yogaTrainer } alt="Trainer 2" className="trainer-image" />
                        <p>Demo Trainer Name<br />Fitness Trainer</p>
                        </div>

                        <div className="trainer-card">
                        <img src= { trainer1 } alt="Trainer 3" className="trainer-image" />
                        <p>Demo Trainer Name<br />Nutrition Expert</p>
                        </div>

                        <div className="trainer-card">
                        <img src= { yogaTrainer } alt="Trainer 4" className="trainer-image" />
                        <p>Demo Trainer Name<br />Strength Coach</p>
                        </div>

                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="quick-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li>Home</li>
                        <li>Services</li>
                        <li>About</li>
                        <li>Careers</li>
                        <li>Terms and Conditions</li>
                        <li>Social Links</li>
                        <li>Blog</li>
                        <li>Advertising</li>
                        <li>Support</li>
                    </ul>
                </div>
                <p>@2025 SportBit all rights reserved</p>
            </footer>
        </div>
    </div>
    );
};

export default App;

