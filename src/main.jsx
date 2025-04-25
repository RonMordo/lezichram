import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";

const setRealVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
window.addEventListener("resize", setRealVh);
setRealVh();

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
