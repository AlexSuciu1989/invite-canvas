import React, { useState, useEffect } from "react";
import FileUpload from "./FileUpload";
import TextInput from "./TextInput";
import FontSettings from "./FontSettings";
import PositionSettings from "./PositionSettings";
import ZoomControls from "./ZoomControls";
import "./SvgEditor.css";

function SvgEditor() {
  const [originalSvgContent, setOriginalSvgContent] = useState("");
  const [modifiedSvgContent, setModifiedSvgContent] = useState("");
  const [textFields, setTextFields] = useState([]);
  const [zoomFactor, setZoomFactor] = useState(1);

  useEffect(() => {
    const parser = new DOMParser();
    if (originalSvgContent) {
      const svgDoc = parser.parseFromString(
        originalSvgContent,
        "image/svg+xml"
      );
      const textElements = svgDoc.querySelectorAll("text");

      const fields = Array.from(textElements)
        .map((textElement) => {
          const style = textElement.getAttribute("style");
          const parsedStyle = style
            ? style.split(";").reduce((acc, styleProp) => {
                const [key, value] = styleProp
                  .split(":")
                  .map((item) => item.trim());
                if (key && value) acc[key] = value;
                return acc;
              }, {})
            : {};

          const tspans = Array.from(textElement.querySelectorAll("tspan"));
          const textContent = tspans.length
            ? tspans.map((tspan) => tspan.textContent).join("\n")
            : textElement.textContent || "";

          return {
            id: textElement.getAttribute("id"),
            text: textContent,
            fontSize:
              parsedStyle["font-size"] ||
              textElement.getAttribute("font-size") ||
              "16",
            fontFamily:
              parsedStyle["font-family"] ||
              textElement.getAttribute("font-family") ||
              "Arial",
            fontStyle:
              parsedStyle["font-style"] ||
              textElement.getAttribute("font-style") ||
              "normal",
            fill:
              parsedStyle["fill"] || textElement.getAttribute("fill") || "#000",
            inkscapeFontSpecification:
              parsedStyle["-inkscape-font-specification"] || "",
            x: textElement.getAttribute("x") || "0",
            y: textElement.getAttribute("y") || "0",
          };
        })
        .filter((field) => field.id);

      setTextFields(fields);
      updateModifiedSvgContent(fields); // Update SVG content immediately
    }
  }, [originalSvgContent]);

  const handleZoomIn = () => {
    setZoomFactor((prevZoom) => Math.min(prevZoom + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoomFactor((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
  };

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

  const updateModifiedSvgContent = (fields) => {
    if (!originalSvgContent) return;
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(originalSvgContent, "image/svg+xml");

    fields.forEach((field) => {
      const textElement = svgDoc.getElementById(field.id);

      if (textElement) {
        while (textElement.firstChild) {
          textElement.removeChild(textElement.firstChild);
        }

        const lines = field.text.split("\n");
        lines.forEach((line, index) => {
          const tspan = svgDoc.createElementNS(
            "http://www.w3.org/2000/svg",
            "tspan"
          );
          tspan.setAttribute("x", field.x);
          tspan.setAttribute("dy", `${index === 0 ? "0" : "1.2em"}`);
          tspan.textContent = line;
          textElement.appendChild(tspan);
        });

        const existingStyle = textElement.getAttribute("style") || "";
        const updatedStyle = `
            ${existingStyle};
            font-size: ${field.fontSize};
            font-family: ${field.fontFamily};
            font-style: ${field.fontStyle};
            fill: ${field.fill};      
 

                    text-anchor: ${
              field.textAlign === "center"
                ? "middle"
                : field.textAlign === "right"
                ? "end"
                : "start"
            };

            -inkscape-font-specification: '${field.fontFamily}, Normal';
          `;

        // Add new text element at the bottom right
        const newTextElement = svgDoc.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        newTextElement.setAttribute("x", "1%");
        newTextElement.setAttribute("y", "100%");
        newTextElement.setAttribute("font-size", "16");
        newTextElement.setAttribute("font-family", "Arial");
        newTextElement.setAttribute("fill", "#D3D3D3");
        newTextElement.textContent = "cutiutacudetoate.ro";
        svgDoc.documentElement.appendChild(newTextElement);

        textElement.setAttribute("font-size", field.fontSize);
        textElement.setAttribute("font-family", field.fontFamily);
        textElement.setAttribute("font-style", field.fontStyle);
        textElement.setAttribute("fill", field.fill);
        textElement.setAttribute("x", field.x);
        textElement.setAttribute("y", field.y);
        textElement.setAttribute("style", updatedStyle);

        textElement.setAttribute(
          "text-anchor",
          field.textAlign === "center"
            ? "middle"
            : field.textAlign === "right"
            ? "end"
            : "start"
        );
      }
    });

    const serializer = new XMLSerializer();
    const updatedSvgContent = serializer.serializeToString(svgDoc);
    setModifiedSvgContent(updatedSvgContent);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...textFields];
    updatedFields[index][field] = value;
    setTextFields(updatedFields);
    updateModifiedSvgContent(updatedFields);
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
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 text-center">
          <h2>SVG Editor</h2>
          <FileUpload onFileUpload={handleFileUpload} />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-6">
          <div className="card mb-3 sticky-top">
            <div className="card-header">
              <h3>Live Preview</h3>
            </div>
            <div className="card-body">
              {modifiedSvgContent ? (
                <div className="svg-preview-container">
                  <svg
                    className="svg-preview"
                    style={{
                      transform: `scale(${zoomFactor})`,
                      transformOrigin: "top left",
                    }}
                    viewBox="0 0 800 1200"
                    preserveAspectRatio="xMidYMid meet"
                    dangerouslySetInnerHTML={{ __html: modifiedSvgContent }}
                  />
                  <ZoomControls
                    handleZoomIn={handleZoomIn}
                    handleZoomOut={handleZoomOut}
                  />
                </div>
              ) : (
                <p>No SVG uploaded.</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card mb-3">
            <div className="card-header">
              <h3>SVG Settings</h3>
            </div>
            <div className="card-body">
              {textFields.map((field, index) => (
                <div key={field.id} className="mb-3 border-bottom pb-2">
                  <h4>Settings for {field.id}</h4>
                  <TextInput
                    value={field.text}
                    onChange={(e) =>
                      handleFieldChange(index, "text", e.target.value)
                    }
                    placeholder={`Enter text for ${field.id}`}
                  />
                  <FontSettings
                    fontSize={textFields[index].fontSize}
                    fontStyle={textFields[index].fontStyle}
                    fontFamily={textFields[index].fontFamily}
                    fontColor={textFields[index].fill}
                    textAlign={textFields[index].textAlign}
                    onFontSizeChange={(e) =>
                      handleFieldChange(index, "fontSize", e.target.value)
                    }
                    onFontStyleChange={(e) =>
                      handleFieldChange(index, "fontStyle", e.target.value)
                    }
                    onFontFamilyChange={(e) =>
                      handleFieldChange(index, "fontFamily", e.target.value)
                    }
                    onFontColorChange={(e) =>
                      handleFieldChange(index, "fill", e.target.value)
                    }
                    onTextAlignChange={(e) =>
                      handleFieldChange(index, "textAlign", e.target.value)
                    }
                  />

                  <PositionSettings
                    x={field.x}
                    y={field.y}
                    onXChange={(e) =>
                      handleFieldChange(index, "x", e.target.value)
                    }
                    onYChange={(e) =>
                      handleFieldChange(index, "y", e.target.value)
                    }
                  />
                </div>
              ))}
              <button onClick={handleDownload} className="btn btn-primary">
                Download Modified SVG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SvgEditor;
