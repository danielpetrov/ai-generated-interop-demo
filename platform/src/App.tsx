import { useContext } from "react";
import { IOConnectContext } from "@interopio/react-hooks";
import "./App.css";

function App() {
  const io = useContext(IOConnectContext);

  return (
    <div className="platform-container">
      <header className="platform-header">
        <div className="header-left">
          <h1>Client Management Platform</h1>
          <span className="status-badge">
            {io ? "Connected" : "Connecting..."}
          </span>
        </div>
        <div className="header-right">
          <span className="version">io.Connect Browser</span>
        </div>
      </header>

      <main className="platform-main">
        <div className="app-panel client-list-panel">
          <div className="panel-header">
            <h2>Client List</h2>
          </div>
          <iframe
            src="http://localhost:3001"
            title="Client List"
            className="app-iframe"
          />
        </div>

        <div className="app-panel client-portfolio-panel">
          <div className="panel-header">
            <h2>Client Portfolio</h2>
          </div>
          <iframe
            src="http://localhost:3002"
            title="Client Portfolio"
            className="app-iframe"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
