import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Navbar } from "./widgets/layout";
import SupportComp from "./Components/pushSupp";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <SupportComp/>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);