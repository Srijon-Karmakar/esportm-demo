// SplineBg.jsx
import React, { useEffect } from 'react';

const SplineBg = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.16/build/spline-viewer.js';
    document.body.appendChild(script);
  }, []);

  return (
    <div className="spline-bg">
      <spline-viewer url="https://prod.spline.design/BPNnv7HKUhyPsmdJ/scene.splinecode" />
    </div>
  );
};

export default SplineBg;
