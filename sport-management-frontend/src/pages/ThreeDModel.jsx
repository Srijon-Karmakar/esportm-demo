import React from 'react';

const ThreeDModel = ({ currentSection }) => {
  return (
    <div style={{ width: 150, height: 150 }}>
      <img
        src={`/assets/3dmodel${currentSection + 1}.gif`} // switch based on section
        alt="3D Animation"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default ThreeDModel;
