
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  password?: string;
  plan?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string, password?: string) => void;
  logout: () => void;
  updatePassword: (newPassword: string) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('glutivia_customer_session');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, name: string, password?: string) => {
    // For simulation, we store the password in the session object to allow "current password" checks on the profile page
    const userData = { 
      email, 
      name, 
      password: password || 'password123', // Default if not provided
      plan: 'Explorer' // Default plan
    };
    setUser(userData);
    localStorage.setItem('glutivia_customer_session', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('glutivia_customer_session');
  };

  const updatePassword = (newPassword: string) => {
    if (user) {
      const updatedUser = { ...user, password: newPassword };
      setUser(updatedUser);
      localStorage.setItem('glutivia_customer_session', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updatePassword, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
