import React from "react";

function PositionSettings({ x, y, onXChange, onYChange }) {
  return (
    <div className="">
      <h5>Position</h5>
      <div className="mb-4">
        <label htmlFor="x-position">Horizontal position</label>
        <input
          type="range"
          value={x}
          onChange={onXChange}
          min="-1000"
          max="1000"
          className="form-range"
          id="x-position"
        />
        <span>{x}</span>
      </div>
      <div className="mb-4">
        <label htmlFor="y-position">Vertical position</label>
        <input
          type="range"
          value={y}
          onChange={onYChange}
          min="-1000"
          max="1000"
          className="form-range"
          id="y-position"
        />
        <span>{y}</span>
      </div>
    </div>
  );
}

export default PositionSettings;
