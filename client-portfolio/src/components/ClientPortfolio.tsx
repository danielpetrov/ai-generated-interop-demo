import { useState, useEffect } from 'react'
import { getPortfolioByEmail, formatCurrency, formatPercent } from '../services/portfolioData'
import type { Portfolio } from '../services/portfolioData'
import './ClientPortfolio.css'

/**
 * 🎓 CLIENT PORTFOLIO COMPONENT - CROSS-ORIGIN VERSION
 * 
 * Listens for messages via both BroadcastChannel (same-origin) 
 * and postMessage (cross-origin iframes).
 */

// BroadcastChannel for same-origin communication
const channel = new BroadcastChannel('client-sync')

interface FDC3Contact {
    type: 'fdc3.contact'
    name: string
    id?: {
        email?: string
        FID?: string
    }
}

const ClientPortfolio = () => {
    const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleContactMessage = (data: FDC3Contact) => {
        if (data?.type === 'fdc3.contact' && data.id?.email) {
            setIsLoading(true)
            const clientPortfolio = getPortfolioByEmail(data.id.email)

            setTimeout(() => {
                setPortfolio(clientPortfolio || null)
                setIsLoading(false)
            }, 300)
        }
    }

    useEffect(() => {
        // 1. BroadcastChannel listener (for same-origin tabs)
        const handleBroadcast = (event: MessageEvent<FDC3Contact>) => {
            console.log('📡 Received BroadcastChannel:', event.data)
            handleContactMessage(event.data)
        }
        channel.addEventListener('message', handleBroadcast)

        // 2. postMessage listener (for cross-origin iframes)
        const handlePostMessage = (event: MessageEvent) => {
            // Check if it's a client-list message
            if (event.data?.source === 'client-list' && event.data?.payload) {
                console.log('📡 Received postMessage:', event.data.payload)
                handleContactMessage(event.data.payload)
            }
        }
        window.addEventListener('message', handlePostMessage)

        console.log('✅ Listening for messages (BroadcastChannel + postMessage)')

        return () => {
            channel.removeEventListener('message', handleBroadcast)
            window.removeEventListener('message', handlePostMessage)
        }
    }, [])

    return (
        <div className="portfolio">
            {/* Channel indicator */}
            <div className="channel-bar">
                <span className="channel-label">Mode:</span>
                <span className="channel-status">Listening</span>
                <div className="channel-dot" style={{ background: '#10b981' }} />
            </div>

            {/* Empty state */}
            {!portfolio && !isLoading && (
                <div className="empty-portfolio">
                    <div className="empty-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h2>No Client Selected</h2>
                    <p>Select a client from the Client List to view their portfolio</p>
                </div>
            )}

            {/* Loading state */}
            {isLoading && (
                <div className="loading-portfolio">
                    <div className="loading-spinner"></div>
                    <p>Loading portfolio...</p>
                </div>
            )}

            {portfolio && !isLoading && (
                <>
                    {/* Header Section */}
                    <div className="portfolio-header">
                        <div className="client-info">
                            <h2>{portfolio.clientName}</h2>
                            <span className="client-id">{portfolio.clientId}</span>
                        </div>
                        <div className="portfolio-summary">
                            <div className="total-value">
                                <span className="label">Total Value</span>
                                <span className="value">{formatCurrency(portfolio.totalValue)}</span>
                            </div>
                            <div className={`day-change ${portfolio.dayChange >= 0 ? 'positive' : 'negative'}`}>
                                <span className="change-amount">
                                    {portfolio.dayChange >= 0 ? '+' : ''}{formatCurrency(portfolio.dayChange)}
                                </span>
                                <span className="change-percent">{formatPercent(portfolio.dayChangePercent)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Performance */}
                    <div className="performance-section">
                        <h3>Performance</h3>
                        <div className="performance-grid">
                            {portfolio.performance.map((perf) => (
                                <div key={perf.period} className="performance-card">
                                    <span className="period">{perf.period}</span>
                                    <span className={`return ${perf.return >= 0 ? 'positive' : 'negative'}`}>
                                        {formatPercent(perf.return)}
                                    </span>
                                    <span className="benchmark">vs {formatPercent(perf.benchmark)} benchmark</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Allocation */}
                    <div className="allocation-section">
                        <h3>Asset Allocation</h3>
                        <div className="allocation-bar">
                            {portfolio.allocation.stocks > 0 && <div className="allocation-segment stocks" style={{ width: `${portfolio.allocation.stocks}%` }} />}
                            {portfolio.allocation.bonds > 0 && <div className="allocation-segment bonds" style={{ width: `${portfolio.allocation.bonds}%` }} />}
                            {portfolio.allocation.etfs > 0 && <div className="allocation-segment etfs" style={{ width: `${portfolio.allocation.etfs}%` }} />}
                            {portfolio.allocation.crypto > 0 && <div className="allocation-segment crypto" style={{ width: `${portfolio.allocation.crypto}%` }} />}
                            {portfolio.allocation.cash > 0 && <div className="allocation-segment cash" style={{ width: `${portfolio.allocation.cash}%` }} />}
                        </div>
                        <div className="allocation-legend">
                            <div className="legend-item"><span className="dot stocks"></span>Stocks</div>
                            <div className="legend-item"><span className="dot bonds"></span>Bonds</div>
                            <div className="legend-item"><span className="dot etfs"></span>ETFs</div>
                            <div className="legend-item"><span className="dot crypto"></span>Crypto</div>
                            <div className="legend-item"><span className="dot cash"></span>Cash</div>
                        </div>
                    </div>

                    {/* Holdings Table */}
                    <div className="holdings-section">
                        <h3>Holdings</h3>
                        <div className="holdings-table">
                            <div className="table-header">
                                <span>Symbol</span>
                                <span>Name</span>
                                <span>Qty</span>
                                <span>Price</span>
                                <span>Value</span>
                                <span>Gain/Loss</span>
                            </div>
                            {portfolio.holdings.map((holding) => {
                                const value = holding.quantity * holding.currentPrice
                                const gain = (holding.currentPrice - holding.purchasePrice) / holding.purchasePrice * 100
                                return (
                                    <div key={holding.symbol} className="table-row">
                                        <span className="symbol">
                                            <span className={`type-indicator ${holding.type}`}></span>
                                            {holding.symbol}
                                        </span>
                                        <span className="name">{holding.name}</span>
                                        <span className="qty">{holding.quantity.toLocaleString()}</span>
                                        <span className="price">${holding.currentPrice.toLocaleString()}</span>
                                        <span className="value">{formatCurrency(value)}</span>
                                        <span className={`gain ${gain >= 0 ? 'positive' : 'negative'}`}>
                                            {formatPercent(gain)}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="last-updated">
                        Last updated: {new Date(portfolio.lastUpdated).toLocaleString()}
                    </div>
                </>
            )}
        </div>
    )
}

export default ClientPortfolio
