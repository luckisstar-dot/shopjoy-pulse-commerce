
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

// Initialize the app with error handling
const container = document.getElementById("root");
if (!container) throw new Error("Could not find root element");

const root = createRoot(container);

// Render with StrictMode for better error detection
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
