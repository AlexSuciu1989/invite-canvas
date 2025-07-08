import React, { useState, useEffect } from "react";
import "./Navigation.css";
import logo from "../../Resources/Logo Invite Canvas.png";

function Navigation({
  onAcasaClick,
  onProduseClick,
  onRegisterClick,
  onLoginClick,
  onInvitatiileMeleClick,
  onDesprenoiClick,
  onContactClick
}) {
  const [itemClicked, setItemClicked] = useState(null);
  const [username, setUsername] = useState("");
  const [showMenu, setShowMenu] = useState(false); // Mobile menu toggle

  // Read cookie
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : "";
  };

  useEffect(() => {
    const storedUsername = getCookie("username");
    setUsername(storedUsername);
  }, []);

  const handleClick = (item) => {
    setItemClicked(item);
    setShowMenu(false); // Close menu on mobile after click
  };

  const handleLogout = () => {
    document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setUsername("");
    window.location.reload();
  };

  return (
    <div className="Navigation d-flex justify-content-between p-2 m-2">
      <div className="logo-container d-flex justify-content-between align-items-center">
        <img src={logo} alt="Logo Invite Canvas" className="logo-img" />
        <button className="menu-toggle d-md-none" onClick={() => setShowMenu(!showMenu)}>
          ☰
        </button>
      </div>

      <div className={`menu-lists ${showMenu ? "show" : ""} d-lg-flex`}>
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
            onClick={() => {
              onDesprenoiClick();
              handleClick("Despre Noi");
            }}
          >
            Despre Noi
          </li>

          <li
            className={`list-group-item menu-item ${itemClicked === "Contact" ? "activeMenu" : ""}`}
            onClick={() => {
              onContactClick();
              handleClick("Contact");
            }}
          >
            Contact
          </li>
        </ul>

        <ul className="list-group list-group-horizontal ms-lg-2 mt-lg-0 mt-2">
          {username ? (
            <>
              <li className="list-group-item menu-item">
                Bine ai venit, <strong>{username}</strong>
              </li>
              <li
                className={`list-group-item menu-item ${itemClicked === "InvitatiileMele" ? "activeMenu" : ""}`}
                onClick={() => {
                  onInvitatiileMeleClick();
                  handleClick("InvitatiileMele");
                }}
              >
                Invitatiile Mele
              </li>
            </>
          ) : (
            <>
              <li
                className={`list-group-item menu-item ${itemClicked === "Login" ? "activeMenu" : ""}`}
                onClick={() => {
                  onLoginClick();
                  handleClick("Login");
                }}
              >
                Login
              </li>
              <li
                className={`list-group-item menu-item ${itemClicked === "Register" ? "activeMenu" : ""}`}
                onClick={() => {
                  onRegisterClick();
                  handleClick("Register");
                }}
              >
                Inregistreaza-te
              </li>
            </>
          )}
          <li className="list-group-item menu-item" onClick={handleLogout}>
            Iesire
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
