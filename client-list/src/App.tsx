import { useState, useCallback, useContext } from "react";
import { IOConnectContext } from "@interopio/react-hooks";
import { searchClients } from "./mockData";
import type { Client, ClientContext } from "./types";
import { CONTEXT_NAME } from "./types";
import "./App.css";

function App() {
  const io = useContext(IOConnectContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredClients = searchClients(searchQuery);

  const handleSelectClient = useCallback(
    async (client: Client) => {
      if (!io) return;

      setSelectedId(client.id);

      const context: ClientContext = {
        type: "fdc3.contact",
        id: { email: client.email },
        name: client.name,
      };

      await io.contexts.update(CONTEXT_NAME, context);
    },
    [io]
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  const getRiskColor = (risk: Client["riskProfile"]) => {
    switch (risk) {
      case "conservative":
        return "risk-conservative";
      case "moderate":
        return "risk-moderate";
      case "aggressive":
        return "risk-aggressive";
    }
  };

  return (
    <div className="app-container">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search clients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="search-count">{filteredClients.length} clients</span>
      </div>

      <div className="client-list">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className={`client-card ${selectedId === client.id ? "selected" : ""}`}
            onClick={() => handleSelectClient(client)}
          >
            <div className="client-avatar">
              {client.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="client-info">
              <div className="client-name">{client.name}</div>
              <div className="client-company">{client.company}</div>
            </div>
            <div className="client-meta">
              <div className="client-value">{formatCurrency(client.portfolioValue)}</div>
              <span className={`risk-badge ${getRiskColor(client.riskProfile)}`}>
                {client.riskProfile}
              </span>
            </div>
          </div>
        ))}
      </div>

      {!io && (
        <div className="connection-warning">
          Waiting for Platform connection...
        </div>
      )}
    </div>
  );
}

export default App;
