import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </BrowserRouter>
);