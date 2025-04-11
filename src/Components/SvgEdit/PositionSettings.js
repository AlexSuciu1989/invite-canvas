import React from "react";

function PositionSettings({ x, y, onXChange, onYChange }) {
  return (
    <div>
      <input
        type="number"
        value={x}
        onChange={onXChange}
        placeholder="X position for title"
      />
      <br />
      <input
        type="number"
        value={y}
        onChange={onYChange}
        placeholder="Y position for title"
      />
    </div>
  );
}

export default PositionSettings;
