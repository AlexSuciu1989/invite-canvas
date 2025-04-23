import React, { useState } from "react";
import "./Navigation.css";

function Navigation({ onAcasaClick, onProduseClick, onRegisterClick }) {
  const [itemClicked, setItemClicked] = useState(null); // Tracks the active menu item

  const handleClick = (item) => {
    setItemClicked(item); // Update state with the clicked item's identifier
  };

  return (
    <div className="Navigation d-flex justify-content-between p-2 m-2">
      <div>LOGO</div>
      <div className="d-flex">
      <ul className="list-group list-group-horizontal">
        <li
          className={`list-group-item menu-item ${
            itemClicked === "Acasa" ? "activeMenu" : ""
          }`}
          onClick={() => {
            onAcasaClick();
            handleClick("Acasa");
          }}
        >
          Acasa
        </li>

        <li
          className={`list-group-item menu-item ${
            itemClicked === "Produse" ? "activeMenu" : ""
          }`}
          onClick={() => {
            onProduseClick();
            handleClick("Produse");
          }}
        >
          Produse
        </li>

        <li
          className={`list-group-item menu-item ${
            itemClicked === "Despre Noi" ? "activeMenu" : ""
          }`}
          onClick={() => handleClick("Despre Noi")}
        >
          Despre Noi
        </li>

        <li
          className={`list-group-item menu-item ${
            itemClicked === "Contact" ? "activeMenu" : ""
          }`}
          onClick={() => handleClick("Contact")}
        >
          Contact
        </li>
      </ul>
      <ul className="list-group list-group-horizontal ms-2">
        <li className="list-group-item menu-item">Login</li>
        <li className={`list-group-item menu-item ${
            itemClicked === "Register" ? "activeMenu" : ""
          }`} onClick={()=>{onRegisterClick(); handleClick("Register")}}>Register</li>
        <li className="list-group-item menu-item">Logout</li>
      </ul>
      </div>
    </div>
  );
}

export default Navigation;
