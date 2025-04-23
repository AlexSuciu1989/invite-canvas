import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import Products from "./Components/Products/Products";
import Register from "./Components/Auth/Register";

function App() {
  const [showProducts, setShowProducts] = useState(false);
  const [showAcasa, setShowAcasa] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleProduseClick = () => {
    setShowAcasa(false);
    setShowProducts(true);
    setShowRegister(false);

  };

  const handleAcasaClick = () => {
    setShowAcasa(true);
    setShowProducts(false);
    setShowRegister(false);

  };

  const handleRegisterClick = () => {
    setShowAcasa(false);
    setShowProducts(false);
    setShowRegister(true);
  };  
 

  return (
    <div className="App">
      <Navigation
        onAcasaClick={handleAcasaClick}
        onProduseClick={handleProduseClick}
        onRegisterClick={handleRegisterClick}
        
      />
      {showProducts && <Products />}
      {showAcasa && <div className="container mt-5">Acasa</div>}
      {showRegister && <Register />}
      
    </div>
  );
}

export default App;
