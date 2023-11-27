import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  email:'',
  isLoggedIn: false,
  logIn: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const intitialToken = JSON.parse(localStorage.getItem("user")) || {token:null,email:null}
  const [token, setToken] = useState(intitialToken.token);
  const [email, setEmail] = useState(intitialToken.email)

  const userIsLoggedIn = !!token;

  const loginHandler = (token,email) => {
    setToken(token);
    setEmail(email)
    const user = {
      token:token,
      email:email
    }
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logoutHandler = () => {
    setToken(null);
    setEmail(null)
    localStorage.removeItem("user");
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
    email:email,
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
