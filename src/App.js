import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import Products from "./Components/Products/Products";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import ResetPassword from "./Components/Auth/ResetPassword";

function App() {
  const [showProducts, setShowProducts] = useState(false);
  const [showAcasa, setShowAcasa] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [resetToken, setResetToken] = useState("");

  useEffect(() => {
    // ✅ Extract token from URL manually
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
        setResetToken(token); // ✅ Store token in state
    }
}, []);

  const handleProduseClick = () => {
    setShowAcasa(false);
    setShowProducts(true);
    setShowRegister(false);
    setShowLogin(false);

  };

  const handleAcasaClick = () => {
    setShowAcasa(true);
    setShowProducts(false);
    setShowRegister(false);
    setShowLogin(false);

  };

  const handleRegisterClick = () => {
    setShowAcasa(false);
    setShowProducts(false);
    setShowRegister(true);
    setShowLogin(false);
  };
  
  const handleLoginClick = () => {
    setShowAcasa(false);
    setShowProducts(false);
    setShowRegister(false);
    setShowLogin(true);
  } 
 

  return (
    <div className="App">
      <Navigation
        onAcasaClick={handleAcasaClick}
        onProduseClick={handleProduseClick}
        onRegisterClick={handleRegisterClick}
        onLoginClick={handleLoginClick}
        
      />
      {showProducts && <Products />}
      {showAcasa && <div className="container mt-5">Acasa</div>}
      {showRegister && <Register />}
      {showLogin && <Login/>}
      {resetToken ? <ResetPassword token={resetToken} /> : ""}
    </div>
  );
}

export default App;
