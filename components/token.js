import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [d1, setD1] = useState([false]);

  const storeTokenInLS = (token) => {
    setToken(token);
    localStorage.setItem('authToken', token);
  };

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ token, d1, storeTokenInLS, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
