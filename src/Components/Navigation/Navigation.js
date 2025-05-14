import React, { useState, useEffect } from "react";
import "./Navigation.css";
import logo from "../../Resources/Logo Invite Canvas.png";

function Navigation({
  onAcasaClick,
  onProduseClick,
  onRegisterClick,
  onLoginClick,
  onInvitatiileMeleClick,
  onAboutClick,
}) {
  const [itemClicked, setItemClicked] = useState(null);
  const [username, setUsername] = useState("");

  // ✅ Read username from cookies
  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
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
    document.cookie =
      "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie =
      "user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    // ✅ Force UI re-render after logout
    setUsername("");
    window.location.reload();
  };

  return (
    <div className="Navigation d-flex flex-wrap justify-content-between p-2 m-2">
      <div className="logo-container">
        <img src={logo} alt="Logo Invite Canvas" className="logo-img" />
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li
              className={`nav-item ${itemClicked === "Acasa" ? "active" : ""}`}
              onClick={() => {
                onAcasaClick();
                handleClick("Acasa");
              }}
            >
              <a className="nav-link" href="#">
                Acasa
              </a>
            </li>
            <li
              className={`nav-item ${
                itemClicked === "Produse" ? "active" : ""
              }`}
              onClick={() => {
                onProduseClick();
                handleClick("Produse");
              }}
            >
              <a className="nav-link" href="#">
                Produse
              </a>
            </li>
            <li
              className={`nav-item ${itemClicked === "About" ? "active" : ""}`}
              onClick={() => {
                onAboutClick();
                handleClick("About");
              }}
            >
              <a className="nav-link" href="#">
                Despre Noi
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
            {username ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Contul meu
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <p className="mb-2 ms-1 text-secondary">Buna, {username}!</p>
                  <a
                    className={`dropdown-item ${
                      itemClicked === "Produsele-mele" ? "active" : ""
                    }`}
                    onClick={() => {
                      onInvitatiileMeleClick();
                      handleClick("Produsele-mele");
                    }}
                  >
                    Produsele Mele
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Log Out
                  </a>
                </div>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Login/Register
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a
                    className={`dropdown-item ${
                      itemClicked === "Login" ? "active" : ""
                    }`}
                    href="#"
                    onClick={() => {
                      handleClick("Login");
                      onLoginClick();
                    }}
                  >
                    Login
                  </a>
                  <a
                    className={`dropdown-item ${
                      itemClicked === "Register" ? "active" : ""
                    }`}
                    href="#"
                    onClick={() => {
                      onRegisterClick();
                      handleClick("Register");
                    }}
                  >
                    Register
                  </a>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
