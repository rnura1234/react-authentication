import { createContext, React, useState } from 'react';

const AuthContext = createContext({
  token: '',
  isLoggin: null,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  
  const [token, setToken] = useState(initialToken);
  const isLoggin = !!token;
  
  
  const calculateRemainingTime = (expirationTime) => {
    console.log(expirationTime);
      const currentTime = new Date().getTime();
     
      const adjExpirationTime = new Date(expirationTime).getTime();
      const remaningTime = adjExpirationTime - currentTime;
     
      return remaningTime;
    }
  
    const logoutHandler = () => {
      setToken(null);
      localStorage.clear('token');
      
    };
  const loginHandler = (token, expirationTime) => {
    localStorage.setItem('token', token);
  
    setToken(token);
    const expiringTime = calculateRemainingTime(expirationTime);
    
    setTimeout(logoutHandler, expiringTime);
  }
    
  const contextValue = {
    token,
    isLoggin,
    login: loginHandler,
    logout: logoutHandler,
  };
  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
