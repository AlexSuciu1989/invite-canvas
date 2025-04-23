import React from "react";
import "./ZoomControls.css";
import ZoomIn from "../../Resources/magnifying-glass-plus-solid.svg";
import ZoomOut from "../../Resources/magnifying-glass-minus-solid.svg";

function ZoomControls({ handleZoomIn, handleZoomOut }) {
  return (
    <div className="zoom-btns">
      <img src={ZoomIn} alt="Zoom In" onClick={handleZoomIn}></img>
      <img src={ZoomOut} alt="Zoom Out" onClick={handleZoomOut}></img>
    </div>
  );
}

export default ZoomControls;
