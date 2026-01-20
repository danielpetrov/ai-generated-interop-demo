import { useState, useCallback, useEffect } from 'react'
import { clients, formatCurrency } from '../services/clientData'
import type { Client } from '../services/clientData'
import './ClientList.css'

/**
 * 🎓 CLIENT LIST COMPONENT - CROSS-ORIGIN VERSION
 * 
 * Uses both BroadcastChannel (for same-origin tabs) and 
 * postMessage (for cross-origin iframes) for inter-app communication.
 */

// BroadcastChannel for same-origin communication
const channel = new BroadcastChannel('client-sync')

const ClientList = () => {
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    /**
     * 🎓 HANDLE CLIENT SELECTION
     * 
     * Broadcasts via both BroadcastChannel AND postMessage to parent
     */
    const handleClientClick = useCallback((client: Client) => {
        setSelectedClientId(client.id)

        const message = {
            type: 'fdc3.contact',
            name: client.name,
            id: {
                email: client.email,
                FID: client.id
            }
        }

        // 1. BroadcastChannel (for standalone tabs on same origin)
        channel.postMessage(message)

        // 2. postMessage to parent (for iframe embedding)
        if (window.parent !== window) {
            window.parent.postMessage({ source: 'client-list', payload: message }, '*')
        }

        console.log('📡 Broadcast client selection:', message)
    }, [])

    // Filter clients based on search term
    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="client-list">
            {/* Channel indicator */}
            <div className="channel-bar">
                <span className="channel-label">Mode:</span>
                <span className="channel-status">Connected</span>
                <div className="channel-dot" style={{ background: '#10b981' }} />
            </div>

            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Client Cards */}
            <div className="clients-container">
                {filteredClients.map((client) => (
                    <div
                        key={client.id}
                        className={`client-card ${selectedClientId === client.id ? 'selected' : ''}`}
                        onClick={() => handleClientClick(client)}
                    >
                        <div className="client-avatar">
                            <img src={client.avatar} alt={client.name} />
                            <span className={`status-indicator ${client.status}`}></span>
                        </div>

                        <div className="client-info">
                            <h3 className="client-name">{client.name}</h3>
                            <p className="client-company">{client.company}</p>
                            <div className="client-meta">
                                <span className={`risk-badge ${client.riskProfile}`}>
                                    {client.riskProfile}
                                </span>
                                <span className="client-assets">
                                    {formatCurrency(client.totalAssets)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClientList
