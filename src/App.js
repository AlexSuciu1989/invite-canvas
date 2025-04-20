import React, { useState } from "react";
import "./custom.scss";
import "./App.css";

import Navigation from "./Components/Navigation/Navigation";
import Products from "./Components/Products/Products";

function App() {
  const [showProducts, setShowProducts] = useState(false);
  const [showAcasa, setShowAcasa] = useState(false);

  const handleProduseClick = () => {
    setShowAcasa(false);
    setShowProducts(true);
  };

  const handleAcasaClick = () => {
    setShowAcasa(true);
    setShowProducts(false);
  };

  return (
    <div className="App">
      <Navigation
        onAcasaClick={handleAcasaClick}
        onProduseClick={handleProduseClick}
      />
      {showProducts && <Products />}
    </div>
  );
}

export default App;
