/**
 * 🎓 MOCK PORTFOLIO DATA SERVICE
 * 
 * This service provides portfolio data for each client.
 * In a real application, this would come from a portfolio management API.
 * 
 * The structure mirrors real financial data:
 * - Holdings (stocks, bonds, etc.)
 * - Performance metrics
 * - Allocation breakdown
 */

export interface Holding {
    symbol: string
    name: string
    quantity: number
    currentPrice: number
    purchasePrice: number
    type: 'stock' | 'bond' | 'etf' | 'crypto' | 'cash'
}

export interface PerformanceMetric {
    period: string
    return: number
    benchmark: number
}

export interface Portfolio {
    clientId: string
    clientName: string
    totalValue: number
    dayChange: number
    dayChangePercent: number
    holdings: Holding[]
    performance: PerformanceMetric[]
    allocation: {
        stocks: number
        bonds: number
        etfs: number
        crypto: number
        cash: number
    }
    lastUpdated: string
}

// Portfolio data keyed by client email (matches FDC3 contact id.email)
export const portfolios: Record<string, Portfolio> = {
    'sarah.johnson@techcorp.com': {
        clientId: 'CLT001',
        clientName: 'Sarah Johnson',
        totalValue: 2450000,
        dayChange: 12450,
        dayChangePercent: 0.51,
        holdings: [
            { symbol: 'AAPL', name: 'Apple Inc.', quantity: 500, currentPrice: 185.50, purchasePrice: 142.00, type: 'stock' },
            { symbol: 'MSFT', name: 'Microsoft Corp.', quantity: 300, currentPrice: 378.20, purchasePrice: 285.00, type: 'stock' },
            { symbol: 'GOOGL', name: 'Alphabet Inc.', quantity: 200, currentPrice: 141.80, purchasePrice: 98.50, type: 'stock' },
            { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', quantity: 450, currentPrice: 432.10, purchasePrice: 380.00, type: 'etf' },
            { symbol: 'BND', name: 'Vanguard Total Bond ETF', quantity: 800, currentPrice: 72.50, purchasePrice: 78.20, type: 'bond' },
            { symbol: 'CASH', name: 'Cash Reserve', quantity: 1, currentPrice: 125000, purchasePrice: 125000, type: 'cash' }
        ],
        performance: [
            { period: '1D', return: 0.51, benchmark: 0.32 },
            { period: '1W', return: 2.15, benchmark: 1.89 },
            { period: '1M', return: 4.82, benchmark: 3.95 },
            { period: 'YTD', return: 12.45, benchmark: 10.20 },
            { period: '1Y', return: 18.32, benchmark: 15.80 }
        ],
        allocation: { stocks: 45, bonds: 15, etfs: 30, crypto: 0, cash: 10 },
        lastUpdated: '2026-01-16T11:30:00Z'
    },
    'michael.chen@innovate.io': {
        clientId: 'CLT002',
        clientName: 'Michael Chen',
        totalValue: 5200000,
        dayChange: -28500,
        dayChangePercent: -0.54,
        holdings: [
            { symbol: 'NVDA', name: 'NVIDIA Corp.', quantity: 800, currentPrice: 485.20, purchasePrice: 220.00, type: 'stock' },
            { symbol: 'TSLA', name: 'Tesla Inc.', quantity: 600, currentPrice: 248.50, purchasePrice: 185.00, type: 'stock' },
            { symbol: 'AMD', name: 'AMD Inc.', quantity: 1200, currentPrice: 142.80, purchasePrice: 78.50, type: 'stock' },
            { symbol: 'BTC', name: 'Bitcoin', quantity: 8.5, currentPrice: 43250, purchasePrice: 28500, type: 'crypto' },
            { symbol: 'ETH', name: 'Ethereum', quantity: 45, currentPrice: 2280, purchasePrice: 1650, type: 'crypto' },
            { symbol: 'QQQ', name: 'Invesco QQQ Trust', quantity: 350, currentPrice: 398.40, purchasePrice: 310.00, type: 'etf' }
        ],
        performance: [
            { period: '1D', return: -0.54, benchmark: 0.32 },
            { period: '1W', return: 3.85, benchmark: 1.89 },
            { period: '1M', return: 8.92, benchmark: 3.95 },
            { period: 'YTD', return: 28.45, benchmark: 10.20 },
            { period: '1Y', return: 42.18, benchmark: 15.80 }
        ],
        allocation: { stocks: 50, bonds: 0, etfs: 15, crypto: 30, cash: 5 },
        lastUpdated: '2026-01-16T11:30:00Z'
    },
    'emily.r@globalfinance.com': {
        clientId: 'CLT003',
        clientName: 'Emily Rodriguez',
        totalValue: 1850000,
        dayChange: 5280,
        dayChangePercent: 0.29,
        holdings: [
            { symbol: 'JNJ', name: 'Johnson & Johnson', quantity: 400, currentPrice: 158.90, purchasePrice: 145.00, type: 'stock' },
            { symbol: 'PG', name: 'Procter & Gamble', quantity: 350, currentPrice: 152.40, purchasePrice: 138.00, type: 'stock' },
            { symbol: 'VIG', name: 'Vanguard Dividend ETF', quantity: 600, currentPrice: 168.20, purchasePrice: 148.00, type: 'etf' },
            { symbol: 'AGG', name: 'iShares Core US Aggregate Bond', quantity: 1500, currentPrice: 98.50, purchasePrice: 102.00, type: 'bond' },
            { symbol: 'TLT', name: 'iShares 20+ Year Treasury', quantity: 800, currentPrice: 92.80, purchasePrice: 98.50, type: 'bond' },
            { symbol: 'CASH', name: 'Cash Reserve', quantity: 1, currentPrice: 280000, purchasePrice: 280000, type: 'cash' }
        ],
        performance: [
            { period: '1D', return: 0.29, benchmark: 0.32 },
            { period: '1W', return: 0.85, benchmark: 1.89 },
            { period: '1M', return: 2.15, benchmark: 3.95 },
            { period: 'YTD', return: 6.82, benchmark: 10.20 },
            { period: '1Y', return: 8.45, benchmark: 15.80 }
        ],
        allocation: { stocks: 25, bonds: 35, etfs: 20, crypto: 0, cash: 20 },
        lastUpdated: '2026-01-16T11:30:00Z'
    },
    'david.park@ventures.co': {
        clientId: 'CLT004',
        clientName: 'David Park',
        totalValue: 3100000,
        dayChange: 18750,
        dayChangePercent: 0.61,
        holdings: [
            { symbol: 'AMZN', name: 'Amazon.com Inc.', quantity: 450, currentPrice: 178.50, purchasePrice: 125.00, type: 'stock' },
            { symbol: 'META', name: 'Meta Platforms', quantity: 380, currentPrice: 358.90, purchasePrice: 185.00, type: 'stock' },
            { symbol: 'NFLX', name: 'Netflix Inc.', quantity: 200, currentPrice: 485.20, purchasePrice: 320.00, type: 'stock' },
            { symbol: 'SPY', name: 'SPDR S&P 500 ETF', quantity: 500, currentPrice: 468.50, purchasePrice: 420.00, type: 'etf' },
            { symbol: 'VTI', name: 'Vanguard Total Stock ETF', quantity: 400, currentPrice: 242.80, purchasePrice: 215.00, type: 'etf' }
        ],
        performance: [
            { period: '1D', return: 0.61, benchmark: 0.32 },
            { period: '1W', return: 2.45, benchmark: 1.89 },
            { period: '1M', return: 5.82, benchmark: 3.95 },
            { period: 'YTD', return: 15.28, benchmark: 10.20 },
            { period: '1Y', return: 22.45, benchmark: 15.80 }
        ],
        allocation: { stocks: 55, bonds: 5, etfs: 35, crypto: 0, cash: 5 },
        lastUpdated: '2026-01-16T11:30:00Z'
    },
    'lisa.t@healthcare.org': {
        clientId: 'CLT005',
        clientName: 'Lisa Thompson',
        totalValue: 890000,
        dayChange: 2850,
        dayChangePercent: 0.32,
        holdings: [
            { symbol: 'UNH', name: 'UnitedHealth Group', quantity: 150, currentPrice: 528.40, purchasePrice: 485.00, type: 'stock' },
            { symbol: 'ABBV', name: 'AbbVie Inc.', quantity: 300, currentPrice: 168.20, purchasePrice: 145.00, type: 'stock' },
            { symbol: 'VHT', name: 'Vanguard Health Care ETF', quantity: 200, currentPrice: 258.80, purchasePrice: 235.00, type: 'etf' },
            { symbol: 'VCIT', name: 'Vanguard Corp Bond ETF', quantity: 600, currentPrice: 82.50, purchasePrice: 85.00, type: 'bond' },
            { symbol: 'CASH', name: 'Cash Reserve', quantity: 1, currentPrice: 150000, purchasePrice: 150000, type: 'cash' }
        ],
        performance: [
            { period: '1D', return: 0.32, benchmark: 0.32 },
            { period: '1W', return: 1.15, benchmark: 1.89 },
            { period: '1M', return: 3.25, benchmark: 3.95 },
            { period: 'YTD', return: 8.95, benchmark: 10.20 },
            { period: '1Y', return: 11.82, benchmark: 15.80 }
        ],
        allocation: { stocks: 40, bonds: 20, etfs: 18, crypto: 0, cash: 22 },
        lastUpdated: '2026-01-16T11:30:00Z'
    },
    'james.wilson@realestate.com': {
        clientId: 'CLT006',
        clientName: 'James Wilson',
        totalValue: 4500000,
        dayChange: -15200,
        dayChangePercent: -0.34,
        holdings: [
            { symbol: 'O', name: 'Realty Income Corp', quantity: 2000, currentPrice: 58.50, purchasePrice: 52.00, type: 'stock' },
            { symbol: 'AMT', name: 'American Tower Corp', quantity: 400, currentPrice: 198.20, purchasePrice: 215.00, type: 'stock' },
            { symbol: 'VNQ', name: 'Vanguard Real Estate ETF', quantity: 800, currentPrice: 88.50, purchasePrice: 92.00, type: 'etf' },
            { symbol: 'BRK.B', name: 'Berkshire Hathaway', quantity: 500, currentPrice: 358.40, purchasePrice: 285.00, type: 'stock' },
            { symbol: 'CASH', name: 'Cash Reserve', quantity: 1, currentPrice: 850000, purchasePrice: 850000, type: 'cash' }
        ],
        performance: [
            { period: '1D', return: -0.34, benchmark: 0.32 },
            { period: '1W', return: -1.25, benchmark: 1.89 },
            { period: '1M', return: 2.85, benchmark: 3.95 },
            { period: 'YTD', return: 5.45, benchmark: 10.20 },
            { period: '1Y', return: 9.82, benchmark: 15.80 }
        ],
        allocation: { stocks: 48, bonds: 0, etfs: 25, crypto: 0, cash: 27 },
        lastUpdated: '2026-01-16T11:30:00Z'
    },
    'amanda.f@startup.io': {
        clientId: 'CLT007',
        clientName: 'Amanda Foster',
        totalValue: 1200000,
        dayChange: 8500,
        dayChangePercent: 0.71,
        holdings: [
            { symbol: 'COIN', name: 'Coinbase Global', quantity: 400, currentPrice: 185.50, purchasePrice: 95.00, type: 'stock' },
            { symbol: 'SQ', name: 'Block Inc.', quantity: 500, currentPrice: 72.80, purchasePrice: 58.00, type: 'stock' },
            { symbol: 'BTC', name: 'Bitcoin', quantity: 4.2, currentPrice: 43250, purchasePrice: 35000, type: 'crypto' },
            { symbol: 'SOL', name: 'Solana', quantity: 250, currentPrice: 98.50, purchasePrice: 45.00, type: 'crypto' },
            { symbol: 'ARKK', name: 'ARK Innovation ETF', quantity: 600, currentPrice: 48.20, purchasePrice: 42.00, type: 'etf' }
        ],
        performance: [
            { period: '1D', return: 0.71, benchmark: 0.32 },
            { period: '1W', return: 5.82, benchmark: 1.89 },
            { period: '1M', return: 12.45, benchmark: 3.95 },
            { period: 'YTD', return: 35.82, benchmark: 10.20 },
            { period: '1Y', return: 58.45, benchmark: 15.80 }
        ],
        allocation: { stocks: 35, bonds: 0, etfs: 15, crypto: 45, cash: 5 },
        lastUpdated: '2026-01-16T11:30:00Z'
    },
    'robert.m@manufacturing.com': {
        clientId: 'CLT008',
        clientName: 'Robert Martinez',
        totalValue: 6800000,
        dayChange: 22400,
        dayChangePercent: 0.33,
        holdings: [
            { symbol: 'CAT', name: 'Caterpillar Inc.', quantity: 600, currentPrice: 298.50, purchasePrice: 245.00, type: 'stock' },
            { symbol: 'DE', name: 'Deere & Company', quantity: 400, currentPrice: 385.20, purchasePrice: 340.00, type: 'stock' },
            { symbol: 'HON', name: 'Honeywell Intl', quantity: 450, currentPrice: 198.80, purchasePrice: 175.00, type: 'stock' },
            { symbol: 'XLI', name: 'Industrial Select Sector ETF', quantity: 1000, currentPrice: 118.50, purchasePrice: 105.00, type: 'etf' },
            { symbol: 'LQD', name: 'iShares Investment Grade Corp Bond', quantity: 1200, currentPrice: 108.50, purchasePrice: 112.00, type: 'bond' },
            { symbol: 'CASH', name: 'Cash Reserve', quantity: 1, currentPrice: 1250000, purchasePrice: 1250000, type: 'cash' }
        ],
        performance: [
            { period: '1D', return: 0.33, benchmark: 0.32 },
            { period: '1W', return: 1.95, benchmark: 1.89 },
            { period: '1M', return: 4.15, benchmark: 3.95 },
            { period: 'YTD', return: 11.28, benchmark: 10.20 },
            { period: '1Y', return: 16.45, benchmark: 15.80 }
        ],
        allocation: { stocks: 42, bonds: 18, etfs: 18, crypto: 0, cash: 22 },
        lastUpdated: '2026-01-16T11:30:00Z'
    }
}

export const getPortfolioByEmail = (email: string): Portfolio | undefined => {
    return portfolios[email]
}

export const getPortfolioById = (clientId: string): Portfolio | undefined => {
    return Object.values(portfolios).find(p => p.clientId === clientId)
}

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount)
}

export const formatPercent = (value: number): string => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(2)}%`
}
