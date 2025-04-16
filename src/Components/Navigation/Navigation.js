import React from "react";

function Navigation({ onAcasaClick, onProduseClick }) {
  return (
    <div className="Navigation d-flex justify-content-between">
      <div>LOGO</div>
      <ul className="list-group list-group-horizontal">
        <li className="list-group-item" onClick={onAcasaClick}>
          Acasa
        </li>
        <li className="list-group-item" onClick={onProduseClick}>
          Produse
        </li>
        <li className="list-group-item">Despre Noi</li>
        <li className="list-group-item">Contact</li>
      </ul>
    </div>
  );
}

export default Navigation;
