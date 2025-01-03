import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuthenticated(true);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  };

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    setAuthenticated(!!token);
    setLoading(false); // Set loading to false after checking auth
  };

  const authContextValue = {
    isAuthenticated,
    loading, // Add loading to context value
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children} {/* Only render children if not loading */}
    </AuthContext.Provider>
  );
};
