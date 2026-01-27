import { useState } from 'react';
import { useIOConnect } from '@interopio/react-hooks';
import './App.css';

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  value: string;
  change: string;
  positive: boolean;
}

interface ClientContext {
  type: 'fdc3.contact';
  id: { email: string };
  name: string;
  company: string;
  value: string;
  change: string;
  positive: boolean;
}

function App() {
  const [client, setClient] = useState<Client | null>(null);

  // Subscribe to SelectedClient context using io.Connect
  useIOConnect((io) => {
    const unsubscribe = io.contexts.subscribe('SelectedClient', (data: ClientContext) => {
      if (data) {
        setClient({
          id: data.id.email, // Using email as ID
          name: data.name,
          company: data.company,
          email: data.id.email,
          value: data.value,
          change: data.change,
          positive: data.positive,
        });
      }
    });
    return unsubscribe;
  }, []);

  if (!client) {
    return (
      <div className="portfolio-app empty">
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h2>No Client Selected</h2>
          <p>Select a client from the list to view their portfolio</p>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-app">
      <div className="portfolio-header">
        <div className="client-header">
          <div className="client-avatar-large">
            {client.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="client-info-large">
            <h1>{client.name}</h1>
            <p className="company">{client.company}</p>
            <p className="email">{client.email}</p>
          </div>
        </div>
      </div>

      <div className="portfolio-grid">
        <div className="stat-card primary">
          <div className="stat-label">Total Portfolio Value</div>
          <div className="stat-value">{client.value}</div>
          <div className={`stat-change ${client.positive ? 'positive' : 'negative'}`}>
            {client.change} today
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Holdings</div>
          <div className="stat-value">24</div>
          <div className="stat-meta">Active positions</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Cash Available</div>
          <div className="stat-value">$245K</div>
          <div className="stat-meta">Ready to invest</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Annual Return</div>
          <div className="stat-value positive">+18.7%</div>
          <div className="stat-meta">vs +15.2% benchmark</div>
        </div>
      </div>

      <div className="portfolio-section">
        <h3>Top Holdings</h3>
        <div className="holdings-list">
          {['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'TSLA'].map((symbol) => (
            <div key={symbol} className="holding-item">
              <div className="holding-symbol">{symbol}</div>
              <div className="holding-details">
                <div className="holding-value">${(Math.random() * 500 + 100).toFixed(0)}K</div>
                <div className={`holding-change ${Math.random() > 0.5 ? 'positive' : 'negative'}`}>
                  {Math.random() > 0.5 ? '+' : ''}{(Math.random() * 20 - 10).toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
