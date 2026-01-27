import { useState, useContext } from 'react';
import { IOConnectContext } from '@interopio/react-hooks';
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

const mockClients: Client[] = [
  { id: '1', name: 'Sarah Johnson', company: 'WealthCorp Investments', email: 'sarah.j@wealthcorp.com', value: '$2.45M', change: '+8.5%', positive: true },
  { id: '2', name: 'Michael Chen', company: 'Global Finance Ltd', email: 'mchen@globalfinance.com', value: '$1.87M', change: '+5.2%', positive: true },
  { id: '3', name: 'Emily Rodriguez', company: 'Tech Ventures Capital', email: 'emily@techventures.com', value: '$3.20M', change: '+12.3%', positive: true },
  { id: '4', name: 'David Thompson', company: 'Secure Bank Holdings', email: 'dthompson@securebank.com', value: '$1.45M', change: '-2.1%', positive: false },
  { id: '5', name: 'Lisa Wang', company: 'Quantum Hedge Fund', email: 'lwang@quantumhedge.com', value: '$5.60M', change: '+15.7%', positive: true },
];

function App() {
  const [selected, setSelected] = useState<Client | null>(null);
  const [search, setSearch] = useState('');
  const io = useContext(IOConnectContext);

  const handleClick = async (client: Client) => {
    setSelected(client);

    // Use io.Connect Shared Contexts instead of window.postMessage
    if (io) {
      await io.contexts.update('SelectedClient', {
        type: 'fdc3.contact',
        id: { email: client.email },
        name: client.name,
        company: client.company,
        value: client.value,
        change: client.change,
        positive: client.positive,
      });
    }
  };

  const filtered = mockClients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="client-list-app">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="clients-grid">
        {filtered.map((client) => (
          <div
            key={client.id}
            className={`client-card ${selected?.id === client.id ? 'active' : ''}`}
            onClick={() => handleClick(client)}
          >
            <div className="client-avatar">
              {client.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="client-details">
              <h3 className="client-name">{client.name}</h3>
              <p className="client-company">{client.company}</p>
              <p className="client-email">{client.email}</p>
              <div className="client-stats">
                <span className="client-value">{client.value}</span>
                <span className={`client-change ${client.positive ? 'positive' : 'negative'}`}>
                  {client.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
