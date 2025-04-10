import React, { useState } from "react";

function SvgEditor() {
  const [originalSvgContent, setOriginalSvgContent] = useState(""); // Original SVG content from upload
  const [modifiedSvgContent, setModifiedSvgContent] = useState(""); // Modified SVG content
  const [titleText, setTitleText] = useState(""); // New title text
  const [contentText, setContentText] = useState(""); // New content text

  // Handle SVG file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalSvgContent(reader.result); // Store the uploaded SVG content
        setModifiedSvgContent(reader.result); // Initialize modified content
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid SVG file.");
    }
  };

  // Modify the SVG content based on user input
  const handleSubmitChanges = () => {
    if (!originalSvgContent) {
      alert("Please upload an SVG file first.");
      return;
    }

    // Parse the original SVG content
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(originalSvgContent, "image/svg+xml");

    // Update the title text (if present)
    const titleElement = svgDoc.querySelector("text.title");
    if (titleElement) {
      titleElement.textContent = titleText;
    }

    // Update the content text (if present)
    const contentElement = svgDoc.querySelector("text.content");
    if (contentElement) {
      // Clear existing <tspan> elements
      while (contentElement.firstChild) {
        contentElement.removeChild(contentElement.firstChild);
      }

      // Add new <tspan> elements for multi-line content
      const lines = contentText.split("\n");
      lines.forEach((line, index) => {
        const tspan = svgDoc.createElementNS("http://www.w3.org/2000/svg", "tspan");
        tspan.setAttribute("x", "0");
        tspan.setAttribute("dy", `${index === 0 ? "0" : "1.2em"}`);
        tspan.textContent = line;
        contentElement.appendChild(tspan);
      });
    }

    // Serialize the modified SVG back to a string
    const serializer = new XMLSerializer();
    const updatedSvgContent = serializer.serializeToString(svgDoc);
    setModifiedSvgContent(updatedSvgContent); // Update the modified content in state
  };

  // Handle downloading the modified SVG file
  const handleDownload = () => {
    if (!modifiedSvgContent) {
      alert("No modifications made to the SVG file.");
      return;
    }

    const blob = new Blob([modifiedSvgContent], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "modified.svg";
    link.click();
  };

  return (
    <div>
      <h2>SVG Editor</h2>

      {/* File Upload */}
      <input type="file" accept=".svg" onChange={handleFileUpload} />
      <br />

      {/* Input for modifying the title */}
      <input
        type="text"
        value={titleText}
        onChange={(e) => setTitleText(e.target.value)}
        placeholder="Enter new title text"
      />
      <br />

      {/* Input for modifying the content */}
      <textarea
        value={contentText}
        onChange={(e) => setContentText(e.target.value)}
        placeholder="Enter new content text (use Enter for multi-line)"
      />
      <br />

      {/* Buttons to submit changes and download */}
      <button onClick={handleSubmitChanges}>Submit Changes</button>
      <button onClick={handleDownload}>Download Modified SVG</button>

      {/* SVG Live Preview */}
      <div>
        <h3>Live Preview</h3>
        {modifiedSvgContent ? (
          <div
            dangerouslySetInnerHTML={{ __html: modifiedSvgContent }} // Render modified SVG
          />
        ) : (
          <p>No SVG uploaded.</p>
        )}
      </div>
    </div>
  );
}

export default SvgEditor;
