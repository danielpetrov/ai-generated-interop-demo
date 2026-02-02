import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import IOBrowserPlatform from "@interopio/browser-platform";
import { IOConnectProvider } from "@interopio/react-hooks";
import App from "./App.tsx";
import "./index.css";

const settings = {
  browserPlatform: {
    factory: IOBrowserPlatform,
    config: {
      licenseKey: import.meta.env.VITE_IOCONNECT_LICENSE_KEY,
    },
  },
};

// Note: StrictMode removed for Platform to prevent double-initialization
createRoot(document.getElementById("root")!).render(
  <IOConnectProvider settings={settings} fallback={<LoadingScreen />}>
    <App />
  </IOConnectProvider>
);

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="spinner"></div>
        <h2>Initializing Platform...</h2>
      </div>
    </div>
  );
}
