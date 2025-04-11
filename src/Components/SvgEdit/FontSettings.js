import React from "react";

function FontSettings({
  fontSize,
  fontStyle,
  fontFamily,
  onFontSizeChange,
  onFontStyleChange,
  onFontFamilyChange,
}) {
  return (
    <div>
      <input
        type="number"
        value={fontSize}
        onChange={onFontSizeChange}
        placeholder="Font size for title"
      />
      <br />
      <select value={fontStyle} onChange={onFontStyleChange}>
        <option value="normal">Normal</option>
        <option value="italic">Italic</option>
        <option value="bold">Bold</option>
      </select>
      <br />
      <select value={fontFamily} onChange={onFontFamilyChange}>
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
      </select>
    </div>
  );
}

export default FontSettings;
