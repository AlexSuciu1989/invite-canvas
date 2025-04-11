import React, { useState, useRef, useEffect } from "react";
import FileUpload from "./FileUpload";
import TextInput from "./TextInput";
import FontSettings from "./FontSettings";
import PositionSettings from "./PositionSettings";
import './SvgEditor.css';

function SvgEditor() {
  const [originalSvgContent, setOriginalSvgContent] = useState("");
  const [modifiedSvgContent, setModifiedSvgContent] = useState("");
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState("");
  const [titleFontSize, setTitleFontSize] = useState("16");
  const [titleFontStyle, setTitleFontStyle] = useState("normal");
  const [titleFontFamily, setTitleFontFamily] = useState("Arial");
  const [titleX, setTitleX] = useState("0");
  const [titleY, setTitleY] = useState("0");

  const titleRef = useRef(null);

  useEffect(() => {
    const handleDrag = (event) => {
      if (titleRef.current) {
        titleRef.current.setAttribute("x", event.clientX);
        titleRef.current.setAttribute("y", event.clientY);
        setTitleX(event.clientX);
        setTitleY(event.clientY);
      }
    };

    const handleDragEnd = () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
    };

    const handleDragStart = () => {
      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", handleDragEnd);
    };

    if (titleRef.current) {
      titleRef.current.addEventListener("mousedown", handleDragStart);
    }

    return () => {
      if (titleRef.current) {
        titleRef.current.removeEventListener("mousedown", handleDragStart);
      }
    };
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalSvgContent(reader.result);
        setModifiedSvgContent(reader.result);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid SVG file.");
    }
  };

  const handleSubmitChanges = () => {
    if (!originalSvgContent) {
      alert("Please upload an SVG file first.");
      return;
    }

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(originalSvgContent, "image/svg+xml");

    const titleElement = svgDoc.querySelector("text.title");
    if (titleElement) {
      while (titleElement.firstChild) {
        titleElement.removeChild(titleElement.firstChild);
      }

      const titleLines = titleText.split("\n");
      titleLines.forEach((line, index) => {
        const tspan = svgDoc.createElementNS(
          "http://www.w3.org/2000/svg",
          "tspan"
        );
        tspan.setAttribute("x", titleX);
        tspan.setAttribute("dy", `${index === 0 ? "0" : "1.2em"}`);
        tspan.textContent = line;
        titleElement.appendChild(tspan);
      });

      titleElement.setAttribute("font-size", titleFontSize);
      titleElement.setAttribute("font-style", titleFontStyle);
      titleElement.setAttribute("font-family", titleFontFamily);
      titleElement.setAttribute("x", titleX);
      titleElement.setAttribute("y", titleY);
    }

    const contentElement = svgDoc.querySelector("text.content");
    if (contentElement) {
      while (contentElement.firstChild) {
        contentElement.removeChild(contentElement.firstChild);
      }

      const contentLines = contentText.split("\n");
      contentLines.forEach((line, index) => {
        const tspan = svgDoc.createElementNS(
          "http://www.w3.org/2000/svg",
          "tspan"
        );
        tspan.setAttribute("x", "0");
        tspan.setAttribute("dy", `${index === 0 ? "0" : "1.2em"}`);
        tspan.textContent = line;
        contentElement.appendChild(tspan);
      });
    }

    const serializer = new XMLSerializer();
    const updatedSvgContent = serializer.serializeToString(svgDoc);
    setModifiedSvgContent(updatedSvgContent);
  };

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
            <div className="d-flex justify-content-center mt-2 mb-4">
                <h2 className="me-3">SVG Editor</h2>
                <FileUpload onFileUpload={handleFileUpload} />
            </div>
            <div className="d-flex bg-secondary bg-opacity-75">
            <TextInput
                value={titleText}
                onChange={(e) => setTitleText(e.target.value)}
                placeholder="Enter new title text (use Enter for multi-line)"
            />
            <FontSettings
                fontSize={titleFontSize}
                fontStyle={titleFontStyle}
                fontFamily={titleFontFamily}
                onFontSizeChange={(e) => setTitleFontSize(e.target.value)}
                onFontStyleChange={(e) => setTitleFontStyle(e.target.value)}
                onFontFamilyChange={(e) => setTitleFontFamily(e.target.value)}
            />
            <PositionSettings
                x={titleX}
                y={titleY}
                onXChange={(e) => setTitleX(e.target.value)}
                onYChange={(e) => setTitleY(e.target.value)}
            />
            <TextInput
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}
                placeholder="Enter new content text (use Enter for multi-line)"
            />
            <button className="" onClick={handleSubmitChanges}>Submit Changes</button>
            <button onClick={handleDownload}>Download Modified SVG</button>
        </div>
      <div>
        <h3>Live Preview</h3>
        {modifiedSvgContent ? (
          <div dangerouslySetInnerHTML={{ __html: modifiedSvgContent }} />
        ) : (
          <p>No SVG uploaded.</p>
        )}
      </div>
    </div>
  );
}

export default SvgEditor;
