import React from "react";

function LivePreview({
  modifiedSvgContent,
  zoomFactor,
  handleZoomIn,
  handleZoomOut,
}) {
  return (
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
            <div className="zoom-btns">
              <button onClick={handleZoomIn} className="btn btn-success">
                Zoom In
              </button>
              <button onClick={handleZoomOut} className="btn btn-danger">
                Zoom Out
              </button>
            </div>
          </div>
        ) : (
          <p>No SVG uploaded.</p>
        )}
      </div>
    </div>
  );
}

export default LivePreview;
