import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoutes;
