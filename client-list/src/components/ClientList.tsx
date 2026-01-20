import { useState, useEffect } from 'react'
import { useIOConnect } from '@interopio/react-hooks'
import { clients, formatCurrency } from '../services/clientData'
import type { Client } from '../services/clientData'
import './ClientList.css'

/**
 * 🎓 CLIENT LIST COMPONENT - IO.CONNECT VERSION
 * 
 * Uses 'useIOConnect' to access the API and 'useChannels' for
 * channel handling (Red, Blue, etc).
 */

const ClientList = () => {
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [channels, setChannels] = useState<any[]>([])
    const [currentChannelId, setCurrentChannelId] = useState<string>('')

    // 🪝 Access io.Connect API
    const io = useIOConnect((io) => io)

    // 🎓 SETUP CHANNELS
    useEffect(() => {
        if (!io) return

        const setupChannels = async () => {
            // Get list of channels
            const allChannels = await io.channels.list()
            setChannels(allChannels)

            // Get current channel
            const current = io.channels.my()
            if (current) setCurrentChannelId(current)

            // Listen for channel changes
            const unsubscribe = io.channels.onChanged((channelId: string) => {
                setCurrentChannelId(channelId)
            })

            return unsubscribe
        }

        setupChannels()
    }, [io])

    // 🎓 JOIN CHANNEL
    const joinChannel = (channelId: string) => {
        if (!io) return
        if (channelId) {
            io.channels.join(channelId).catch(console.error)
        } else {
            io.channels.leave().catch(console.error)
        }
    }

    /**
     * 🎓 HANDLE CLIENT SELECTION
     * 
     * Publishes an FDC3 "Contact" context to the currently selected channel.
     */
    const handleClientClick = async (client: Client) => {
        setSelectedClientId(client.id)

        if (io && currentChannelId) {
            const context = {
                type: 'fdc3.contact',
                name: client.name,
                id: {
                    email: client.email,
                    FID: client.id
                }
            }

            try {
                // Publish using FDC3 standard or io.Connect Channels API
                await io.channels.publish(context)
                console.log('📡 Published context:', context)
            } catch (err) {
                console.error('Failed to publish context:', err)
            }
        } else {
            console.warn('⚠️ No channel selected - context not broadcast')
        }
    }

    // Filter clients based on search term
    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const currentChannel = channels.find(c => c.id === currentChannelId)

    if (!io) return <div>Loading io.Connect...</div>

    return (
        <div className="client-list">
            {/* 🎓 CHANNEL SELECTOR */}
            <div className="channel-bar">
                <span className="channel-label">Channel:</span>
                <select
                    value={currentChannelId}
                    onChange={(e) => joinChannel(e.target.value)}
                    className="channel-select"
                >
                    <option value="">-- Unlinked --</option>
                    {channels.map(ch => (
                        <option key={ch.id} value={ch.id} style={{ color: ch.meta?.color }}>
                            {ch.name}
                        </option>
                    ))}
                </select>
                <div
                    className="channel-dot"
                    style={{
                        background: currentChannel?.meta?.color || 'var(--text-muted)'
                    }}
                />
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
