import { createRoot } from "react-dom/client";
import IOBrowser from "@interopio/browser";
import { IOConnectProvider } from "@interopio/react-hooks";
import App from "./App.tsx";
import "./index.css";

const settings = {
  browser: {
    factory: IOBrowser,
  },
};

createRoot(document.getElementById("root")!).render(
  <IOConnectProvider settings={settings} fallback={<LoadingScreen />}>
    <App />
  </IOConnectProvider>
);

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>Connecting to Platform...</p>
    </div>
  );
}
