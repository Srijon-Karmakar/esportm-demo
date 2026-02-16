// import React from 'react';
// import './training.css';
// import trainer1 from './assets/trainer1.jpg';
// import trainer1 from '../assets/images/trainer1.jpg';
// import trainer2 from '../assets/images/yoga_trainer.jpg';

import React from 'react';
import './training.css';
// import trainer1 from '../assets/images/trainer1.jpg';
// import yogaTrainer from '../assets/images/yoga_trainer.jpg';
import Lottie from 'lottie-react';
// import sportbitVideo from '../assets/sportbit_dot_white.json';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const navigate = useNavigate();
     return (
        <motion.div 
            className="trainer-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            >
         <div className="container">
           {/* <main className="main-content"> */}
             <motion.div className="glass-effect-container">
                <motion.header 
                   className="header"
                   initial={{ y: -50, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ duration: 0.8 }}
                   >
                 <div className="logo">
                         
                
                        <div style={{ width: 160, height: 150 }}>
                           <Lottie animationData={sportbitVideo} loop={true} />
                        </div>
                 </div>
                {/* <h1 className="brand">SportBit</h1> */}
                <nav className="nav">
                    <motion.a href="#home" whileHover={{ scale: 1.1 }}
                    onClick={() => navigate('/')}>Home</motion.a>
                    <motion.a href="#login" whileHover={{ scale: 1.1 }}
                    onClick={() => navigate('/login/player')}>Login </motion.a>
                    <motion.button className="get-started" whileHover={{ scale: 1.1 }} >Get Started</motion.button>
                </nav>
            </motion.header>

            {/* <main className="main-content"> */}
              {/* <div className="glass-effect-container"> */}
                <h2 id='slogan' className="main-title">Precision Training for <br /> peak performance</h2>
                 <div className="buttons">
                    <motion.button className="explore-button" whileHover={{ scale: 1.1 }} >Explore Now</motion.button>
                    <motion.button className="schedule-button" whileHover={{ scale: 1.1 }} >Create Schedule</motion.button>
                 </div>
                 </motion.div>

                <motion.section className="offerings" initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }} >
                    <h3>What we offer</h3>
                    <p id='offerDetails' >From personalised training to diet plans ,get everything in one place</p>
                    <div className="offer-cards">

                        <motion.div className="card" whileHover={{ scale: 1.05 }} >
                        <h1>Personal Training</h1>
                        <p>Get personla reachouts to reach your goals</p>
                        </motion.div>

                        <motion.div className="card"  whileHover={{ scale: 1.05 }} >
                        <h1>Group Classes</h1>
                        <p>Join dynamic seasons,from yoga to hit.</p>
                        </motion.div>

                        <motion.div className="card"  whileHover={{ scale: 1.05 }} >
                        <h1>Nutrition Guidance</h1>
                        <p>Discover Smarter eating for healthier life</p>
                        </motion.div>

                        <motion.div className="card"  whileHover={{ scale: 1.05 }} >
                        <h1>Online Coaching</h1>
                        <p>Train anytime, anywhere, with expert guidance</p>
                        </motion.div>
                    </div>
                </motion.section>

                <motion.section className="trainers-section" 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }} >
                    <h3>Meet Our Trainers</h3>
                    <div className="trainers">

                        <motion.div className="trainer-card" 
                         whileHover={{ scale: 1.05 }} >
                        <img src= { trainer1 } alt="Trainer 1" className="trainer-image" />
                        <p>Demo Trainer Name<br />Yoga Trainer</p>
                        </motion.div>

                        <motion.div className="trainer-card" whileHover={{ scale: 1.05 }} >
                        <img src= { yogaTrainer } alt="Trainer 2" className="trainer-image" />
                        <p>Demo Trainer Name<br />Fitness Trainer</p>
                        </motion. div>

                        <motion.div className="trainer-card" whileHover={{ scale: 1.05 }} >
                        <img src= { trainer1 } alt="Trainer 3" className="trainer-image" />
                        <p>Demo Trainer Name<br />Nutrition Expert</p>
                        </motion.div>

                        <motion.div className="trainer-card" whileHover={{ scale: 1.05 }} >
                        <img src= { yogaTrainer } alt="Trainer 4" className="trainer-image" />
                        <p>Demo Trainer Name<br />Strength Coach</p>
                        </motion.div>

                    </div>
                </motion.section>
            {/* </main> */}

            <motion.footer className="footer"                   initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }} >
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
            </motion.footer>
        </div>
    </motion.div>
    );
};

export default App;

