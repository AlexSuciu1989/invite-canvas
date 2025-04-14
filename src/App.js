import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import SvgEditor from "./Components/SvgEdit/SvgEditor";

function App() {
  return (
    <div className="App">
      <SvgEditor />
    </div>
  );
}

export default App;
