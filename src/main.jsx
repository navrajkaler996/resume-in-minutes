import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./resume-css/resume-template-1.css";
import "./resume-css/resume-template-2.css";
import "./resume-css/resume-template-3.css";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
