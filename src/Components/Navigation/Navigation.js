import React, { useState, useEffect } from "react";
import "./Navigation.css";

function Navigation({ onAcasaClick, onProduseClick, onRegisterClick, onLoginClick, onInvitatiileMeleClick }) {
  const [itemClicked, setItemClicked] = useState(null);
  const [username, setUsername] = useState("");

  // ✅ Read username from cookies
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : "";
  };

  useEffect(() => {
    const storedUsername = getCookie("username");
    setUsername(storedUsername); // Update state based on cookie
  }, []);

  const handleClick = (item) => {
    setItemClicked(item);
  };

  const handleLogout = () => {
    // ✅ Remove cookies by setting them to expire
    document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    // ✅ Force UI re-render after logout
    setUsername(""); 
    window.location.reload();
  };

  return (
    <div className="Navigation d-flex justify-content-between p-2 m-2">
      <div>LOGO</div>
      <div className="d-flex">
        <ul className="list-group list-group-horizontal">
          <li
            className={`list-group-item menu-item ${itemClicked === "Acasa" ? "activeMenu" : ""}`}
            onClick={() => {
              onAcasaClick();
              handleClick("Acasa");
            }}
          >
            Acasa
          </li>

          <li
            className={`list-group-item menu-item ${itemClicked === "Produse" ? "activeMenu" : ""}`}
            onClick={() => {
              onProduseClick();
              handleClick("Produse");
            }}
          >
            Produse
          </li>

          <li
            className={`list-group-item menu-item ${itemClicked === "Despre Noi" ? "activeMenu" : ""}`}
            onClick={() => handleClick("Despre Noi")}
          >
            Despre Noi
          </li>

          <li
            className={`list-group-item menu-item ${itemClicked === "Contact" ? "activeMenu" : ""}`}
            onClick={() => handleClick("Contact")}
          >
            Contact
          </li>
        </ul>
        <ul className="list-group list-group-horizontal ms-2">
          {username ? (
            // ✅ Show "Logged in as" if username exists
            <>
              <li className="list-group-item menu-item">Bine ai venit, <strong>{username}</strong></li>
              <li className={`list-group-item menu-item ${itemClicked === "InvitatiileMele" ? "activeMenu" : ""}`} onClick={() =>{onInvitatiileMeleClick(); handleClick("InvitatiileMele")}}>Invitatiile Mele</li>
            </>
          ) : (
            // ✅ Show Login & Register buttons if not logged in
            <>
              <li className={`list-group-item menu-item ${itemClicked === "Login" ? "activeMenu" : ""}`} onClick={() => { onLoginClick(); handleClick("Login") }}>Login</li>
              <li className={`list-group-item menu-item ${itemClicked === "Register" ? "activeMenu" : ""}`} onClick={() => { onRegisterClick(); handleClick("Register") }}>Inregistreaza-te</li>
            </>
          )}
          <li className="list-group-item menu-item" onClick={handleLogout}>Iesire</li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
