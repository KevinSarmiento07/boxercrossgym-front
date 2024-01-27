import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { BoxerApp } from "./BoxerApp";
import { BrowserRouter } from "react-router-dom";
//import InjectTailwind from "./InjectTailwind";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BoxerApp />
    </BrowserRouter>
  </React.StrictMode>
);
