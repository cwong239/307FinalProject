import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; 
import "./style.css";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(
  <BrowserRouter>
    <AuthProvider> 
      <App />
    </AuthProvider>
  </BrowserRouter>
);
