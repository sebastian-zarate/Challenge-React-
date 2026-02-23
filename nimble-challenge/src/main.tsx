// Enable additional checks and warnings in development mode
import { StrictMode } from "react";

// React 18 root API for rendering the application
import { createRoot } from "react-dom/client";

// Global styles
import "./index.css";

// Main application component
import App from "./App.tsx";

// Create the root element and render the App component
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Render the main App inside StrictMode */}
    <App />
  </StrictMode>
);