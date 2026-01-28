import { useState, useRef, useContext } from "react";
import { useIOConnect, IOConnectContext } from "@interopio/react-hooks";
import { getClientByEmail, getPortfolio } from "./mockData";
import type { Client, Portfolio, ClientContext } from "./types";
import { CONTEXT_NAME } from "./types";
import "./App.css";

function App() {
  const io = useContext(IOConnectContext);
  const [client, setClient] = useState<Client | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useIOConnect(
    async (io) => {
      if (unsubscribeRef.current) return;

      unsubscribeRef.current = await io.contexts.subscribe(
        CONTEXT_NAME,
        (context: ClientContext) => {
          if (context?.id?.email) {
            const foundClient = getClientByEmail(context.id.email);
            if (foundClient) {
              setClient(foundClient);
              setPortfolio(getPortfolio(foundClient.id) || null);
            }
          }
        }
      );

      return () => {
        unsubscribeRef.current?.();
        unsubscribeRef.current = null;
      };
    },
    []
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);

  const formatPercent = (value: number) =>
    `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;

  if (!client || !portfolio) {
    return (
      <div className="app-container empty-state">
        <div className="empty-icon">📊</div>
        <h2>No Client Selected</h2>
        <p>Select a client from the list to view their portfolio</p>
        {!io && <span className="connection-status">Connecting to Platform...</span>}
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="portfolio-header">
        <div className="client-details">
          <h1>{client.name}</h1>
          <div className="client-meta">
            <span>{client.company}</span>
            <span className="separator">•</span>
            <span>{client.email}</span>
          </div>
        </div>
        <div className="portfolio-summary">
          <div className="summary-value">{formatCurrency(portfolio.totalValue)}</div>
          <div className={`summary-change ${portfolio.dayChange >= 0 ? "positive" : "negative"}`}>
            {formatCurrency(portfolio.dayChange)} ({formatPercent(portfolio.dayChangePercent)})
          </div>
        </div>
      </div>

      <div className="holdings-section">
        <h2>Holdings</h2>
        <div className="holdings-table">
          <div className="table-header">
            <span className="col-symbol">Symbol</span>
            <span className="col-name">Name</span>
            <span className="col-shares">Shares</span>
            <span className="col-price">Price</span>
            <span className="col-change">Change</span>
            <span className="col-value">Value</span>
            <span className="col-gain">Gain/Loss</span>
          </div>
          <div className="table-body">
            {portfolio.holdings.map((holding) => {
              const currentValue = holding.shares * holding.currentPrice;
              const costBasis = holding.shares * holding.avgCost;
              const gain = currentValue - costBasis;
              const gainPercent = ((currentValue - costBasis) / costBasis) * 100;

              return (
                <div key={holding.symbol} className="table-row">
                  <span className="col-symbol">{holding.symbol}</span>
                  <span className="col-name">{holding.name}</span>
                  <span className="col-shares">{holding.shares.toLocaleString()}</span>
                  <span className="col-price">{formatCurrency(holding.currentPrice)}</span>
                  <span className={`col-change ${holding.change >= 0 ? "positive" : "negative"}`}>
                    {formatPercent(holding.changePercent)}
                  </span>
                  <span className="col-value">{formatCurrency(currentValue)}</span>
                  <span className={`col-gain ${gain >= 0 ? "positive" : "negative"}`}>
                    {formatCurrency(gain)} ({formatPercent(gainPercent)})
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Account Type</div>
          <div className="stat-value capitalize">{client.accountType}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Risk Profile</div>
          <div className="stat-value capitalize">{client.riskProfile}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Holdings</div>
          <div className="stat-value">{portfolio.holdings.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Last Contact</div>
          <div className="stat-value">{client.lastContact}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
