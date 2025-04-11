import React from "react";

function FileUpload({ onFileUpload }) {
  return (
    <div>
      <input 
        type="file" 
        accept=".svg" 
        onChange={onFileUpload}
        className="btn btn-primary"
      />
    </div>
  );
}

export default FileUpload;
