import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  logIn: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const intitialToken = localStorage.getItem("token");
  const [token, setToken] = useState(intitialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    console.log("this ran")
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

//   useEffect(() => {
//     const logoutTimer = setTimeout(() => {
//       logoutHandler();
//     }, 5 * 60 * 1000);

//     return () => clearTimeout(logoutTimer);
//   }, [token]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    logIn: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
