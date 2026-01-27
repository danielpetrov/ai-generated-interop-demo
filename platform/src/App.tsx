import './App.css';

function App() {
  // With io.Connect, the platform automatically coordinates communication
  // between apps via Shared Contexts - no manual relay needed!

  return (
    <div className="platform">
      <header className="platform-header">
        <h1>Client Demo Platform</h1>
        <p>Select a client to view their portfolio</p>
      </header>

      <div className="apps-container">
        <div className="app-frame">
          <iframe
            src="http://localhost:3001"
            title="Client List"
            className="app-iframe"
          />
        </div>

        <div className="app-frame">
          <iframe
            src="http://localhost:3003"
            title="Client Portfolio"
            className="app-iframe"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
