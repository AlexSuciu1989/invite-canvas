import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import Products from "./Components/Products/Products";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import ResetPassword from "./Components/Auth/ResetPassword";
import Home from "./Components/Home/Home";
import InvitatiileMele from "./Components/InvitatiileMele/InvitatiileMele";

function App() {
  const [currentView, setCurrentView] = useState("Acasa");
  const [resetToken, setResetToken] = useState("");

  useEffect(() => {
    // ✅ Extract token from URL only once on mount
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      setResetToken(token);
    }
  }, []);

  return (
    <div className="App">
      {/* If resetToken exists, only show ResetPassword */}
      {resetToken ? (
        <ResetPassword token={resetToken} />
      ) : (
        <>
          <Navigation
            onAcasaClick={() => setCurrentView("Acasa")}
            onProduseClick={() => setCurrentView("Produse")}
            onRegisterClick={() => setCurrentView("Register")}
            onLoginClick={() => setCurrentView("Login")}
            onInvitatiileMeleClick={() => setCurrentView("InvitatiileMele")}
          />

          {currentView === "Acasa" && <Home onButtonClick={() => setCurrentView("Produse")} />}
          {currentView === "Produse" && <Products />}
          {currentView === "Register" && <Register />}
          {currentView === "Login" && <Login />}
          {currentView === "InvitatiileMele" && <InvitatiileMele />}
        </>
      )}
    </div>
  );
}

export default App;
