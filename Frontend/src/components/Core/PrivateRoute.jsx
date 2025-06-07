import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');  

  if (!isAuthenticated) {
    return <Navigate to="/signUp" replace />;
  }

  return children;
};

export default PrivateRoute;
