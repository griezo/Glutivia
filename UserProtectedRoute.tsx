
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface UserProtectedRouteProps {
  children: React.ReactNode;
}

const UserProtectedRoute: React.FC<UserProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login and pass the current location and a message in state
    return <Navigate 
      to="/login" 
      state={{ 
        from: location, 
        message: 'Please log in to continue' 
      }} 
      replace 
    />;
  }

  return <>{children}</>;
};

export default UserProtectedRoute;
