import React from "react";
import FontFamilies from "./FontFamily";

function FontSettings({
  fontSize,
  fontStyle,
  fontFamily,
  fontColor,
  onFontSizeChange,
  onFontStyleChange,
  onFontFamilyChange,
  onFontColorChange,
}) {
  return (
    <div>
      <h5>Font</h5>
      <div className="mb-3">
        <label htmlFor="font-size-input">Font Size</label>
        <input
          type="number"
          value={fontSize ? parseInt(fontSize) : ""} // Ensure value is numeric and valid
          onChange={onFontSizeChange}
          placeholder="Font size for title"
          className="form-control"
          id="font-size-input"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="font-color-input">Font Color</label>
        <input
          type="text"
          value={fontColor}
          onChange={onFontColorChange}
          placeholder="hex code"
          className="form-control"
          id="font-color-input"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="font-style-input">Font Style</label>
        <select
          value={fontStyle} // Correctly use fontStyle as it is already a valid string
          onChange={onFontStyleChange}
          id="font-style-input"
          className="form-select"
        >
          <option value="normal">Normal</option>
          <option value="italic">Italic</option>
          <option value="bold">Bold</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="font-family-input">Font Family</label>
        <select
          value={fontFamily}
          onChange={onFontFamilyChange}
          className="form-select"
          id="font-family-input"
        >
          {FontFamilies.map((font) => (
            <option
              key={font.value}
              value={font.value}
              style={{ fontFamily: font.value }}
            >
              {font.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FontSettings;
