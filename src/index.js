import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import "../css/tailwind.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Navbar } from "./widgets/layout";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);