import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Inter font
const interFont = document.createElement("link");
interFont.rel = "stylesheet";
interFont.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
document.head.appendChild(interFont);

createRoot(document.getElementById("root")!).render(<App />);
