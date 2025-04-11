import React from "react";

function TextInput({ value, onChange, placeholder }) {
  return (
    <textarea value={value} onChange={onChange} placeholder={placeholder} className="border rounded p-2" />
  );
}

export default TextInput;
