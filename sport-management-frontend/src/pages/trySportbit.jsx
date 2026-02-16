import React from 'react';
import './trySportbit.css';
// import basketballVideo from '../assets/basketballVdo.mp4'; 
// import eventImg from '../assets/BasketballBg.jpg';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import basketballImg from '../assets/basketball.png';
// import eventImg from '../assets/BasketballBg.jpg'; 


// const BasketballModel = () => {
//   const  { scene } = useGLTF('/assets/basketball.glb');
//   return <primitive object={scene} scale={1.5} />;
  
// };



const StreetBallPage = () => {
  return (
    <div className="streetball-container">
      <div className="left-card">

      <div className="card-image-container">
          <img src={eventImg} alt="Basketball Event" className="card-image" />
          <div className="card-image-text">
            <h3>Exciting Basketball Match</h3>
            <p>Don't miss the action!</p>
            <p id='event-time'>sunday 7:30pm</p>
          </div>
        </div>

        <h2>Basketball Event</h2>
        <p>Join us for an exciting basketball match!</p>
        <button className="join-button">Join Now</button>
        <div className='card-brief'>
          <h3>Event Details</h3>
          <p>Get ready for an action-packed basketball event! Join us for a thrilling match that promises to be full of excitement and skill. Whether you're a player or a fan, this is an event you won't want to miss!
          Join us for a thrilling match that promises to be full of excitement and skill. Whether you're a player or a fan, this is an event you won't want to miss!
          Join us for a thrilling match that promises to be full of excitement and skill. Whether you're a player or a fan, this is an event you won't want to miss!
          </p>
        </div>
      </div>


       {/* Basketball Video */}
       <div className="basketball-video-container">
        <video
          src={basketballVideo}
          autoPlay
          loop
          muted
          className="basketball-video"
        ></video>
      </div>

      {/* Brand Slogan */}
      <div className="brand-slogan">
        <h1>Unleash <br></br> Your Potential</h1>
        <p>Join the game, be the star!</p>
      </div>


      {/* basketball image  */}
      {/* <img src={basketballImg} alt="Basketball" className="basketball-image" /> */}

      {/* 3D Basketball Model */}
      {/* <div className="basketball-3d">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <BasketballModel />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div> */}
    </div>
  );
};

export default StreetBallPage;
