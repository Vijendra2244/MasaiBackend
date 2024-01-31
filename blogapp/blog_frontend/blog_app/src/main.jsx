import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import PortalContextProvider from "./pages/context/PortalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PortalContextProvider>
        <App />
      </PortalContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
