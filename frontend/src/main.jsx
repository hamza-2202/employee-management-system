import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { EmployeeContextProvider } from "./context/EmployeeContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <EmployeeContextProvider>
        <App />
      </EmployeeContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
