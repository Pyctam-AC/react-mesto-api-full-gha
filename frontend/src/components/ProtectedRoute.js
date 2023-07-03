import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({element, loggedIn}) => {
  return (
    loggedIn ? element : <Navigate to="/signup" replace/>
  )
};

export default ProtectedRoute;
