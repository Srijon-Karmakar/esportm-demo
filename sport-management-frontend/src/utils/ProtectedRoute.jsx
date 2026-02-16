
// import React, { useContext, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';

// const ProtectedRoute = ({ children }) => {
//   const { username } = useContext(UserContext);

//   useEffect(() => {
//     if (!username) {
//       alert('Please login to continue');
//     }
//   }, [username]);

//   if (!username) {
//     return <Navigate to="/login/player" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { username } = useContext(UserContext);

  // if (!username || username.trim() === '') {
  //   alert('Please login to continue');
  //   return <Navigate to="/login/player" replace />;
  // }

  if (typeof username !== 'string' || username.trim() === '') {
    alert('Please login to continue');
    return <Navigate to="/login/player" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

