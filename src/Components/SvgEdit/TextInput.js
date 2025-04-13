import React from "react";

function TextInput({ value, onChange, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="form-control"
    />
  );
}

export default TextInput;
