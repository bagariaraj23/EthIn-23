import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
<<<<<<< Updated upstream:frontend/src/index.js

=======
import { Navbar } from "./widgets/layout";
import SupportComp from "./Components/pushSupp";
import Dashboard from "./Dashboard/Dashboard";
import Blog from "./FindTherapist/Blog";
import { Profile } from "./pages";
>>>>>>> Stashed changes:src/index.js
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);