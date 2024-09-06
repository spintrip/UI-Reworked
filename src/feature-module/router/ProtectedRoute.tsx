import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}
const authToken = localStorage.getItem("authToken")
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!authToken) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }
  // If authenticated, render the children (the protected component)
  return children;
};

export default ProtectedRoute;