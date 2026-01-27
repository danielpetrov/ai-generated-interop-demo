/**
 * Mock Client Data - FDC3 Contact Standard
 * 
 * Using the FDC3 standard ensures our data format is compatible
 * with other financial desktop applications (Bloomberg, Refinitiv, etc.)
 */

export interface FDC3Contact {
    type: "fdc3.contact";
    id: {
        email: string;
    };
    name: string;
    company?: string;
    portfolio?: {
        totalValue: number;
        holdings: {
            symbol: string;
            shares: number;
            currentPrice: number;
            totalValue: number;
            gainLoss: number;
            gainLossPercent: number;
        }[];
        performance: {
            day: number;
            month: number;
            year: number;
        };
    };
}

export const mockClients: FDC3Contact[] = [
    {
        type: "fdc3.contact",
        id: { email: "sarah.johnson@wealthcorp.com" },
        name: "Sarah Johnson",
        company: "WealthCorp Investments",
        portfolio: {
            totalValue: 2450000,
            holdings: [
                { symbol: "AAPL", shares: 1500, currentPrice: 178.50, totalValue: 267750, gainLoss: 23400, gainLossPercent: 9.58 },
                { symbol: "MSFT", shares: 2000, currentPrice: 405.30, totalValue: 810600, gainLoss: 45200, gainLossPercent: 5.91 },
                { symbol: "GOOGL", shares: 800, currentPrice: 142.80, totalValue: 114240, gainLoss: -8900, gainLossPercent: -7.23 },
                { symbol: "TSLA", shares: 500, currentPrice: 234.50, totalValue: 117250, gainLoss: 12100, gainLossPercent: 11.50 },
                { symbol: "NVDA", shares: 1200, currentPrice: 875.20, totalValue: 1050240, gainLoss: 125000, gainLossPercent: 13.51 },
            ],
            performance: { day: 1.23, month: 4.56, year: 18.45 },
        },
    },
    {
        type: "fdc3.contact",
        id: { email: "michael.chen@globalfinance.com" },
        name: "Michael Chen",
        company: "Global Finance Ltd",
        portfolio: {
            totalValue: 1875000,
            holdings: [
                { symbol: "JPM", shares: 3000, currentPrice: 178.90, totalValue: 536700, gainLoss: 34500, gainLossPercent: 6.87 },
                { symbol: "BAC", shares: 5000, currentPrice: 35.40, totalValue: 177000, gainLoss: 8700, gainLossPercent: 5.17 },
                { symbol: "GS", shares: 1200, currentPrice: 445.60, totalValue: 534720, gainLoss: -23400, gainLossPercent: -4.19 },
                { symbol: "V", shares: 2000, currentPrice: 278.30, totalValue: 556600, gainLoss: 45600, gainLossPercent: 8.92 },
            ],
            performance: { day: 0.87, month: 3.21, year: 12.34 },
        },
    },
    {
        type: "fdc3.contact",
        id: { email: "emily.rodriguez@techventures.com" },
        name: "Emily Rodriguez",
        company: "Tech Ventures Capital",
        portfolio: {
            totalValue: 3200000,
            holdings: [
                { symbol: "META", shares: 2500, currentPrice: 478.90, totalValue: 1197250, gainLoss: 87500, gainLossPercent: 7.89 },
                { symbol: "AMZN", shares: 3000, currentPrice: 175.60, totalValue: 526800, gainLoss: 34200, gainLossPercent: 6.94 },
                { symbol: "NFLX", shares: 800, currentPrice: 589.40, totalValue: 471520, gainLoss: -12300, gainLossPercent: -2.54 },
                { symbol: "AMD", shares: 4000, currentPrice: 185.30, totalValue: 741200, gainLoss: 56700, gainLossPercent: 8.28 },
            ],
            performance: { day: 2.15, month: 5.67, year: 22.13 },
        },
    },
    {
        type: "fdc3.contact",
        id: { email: "david.thompson@securebank.com" },
        name: "David Thompson",
        company: "Secure Bank Holdings",
        portfolio: {
            totalValue: 1450000,
            holdings: [
                { symbol: "WFC", shares: 4500, currentPrice: 58.70, totalValue: 264150, gainLoss: 18900, gainLossPercent: 7.72 },
                { symbol: "C", shares: 6000, currentPrice: 61.20, totalValue: 367200, gainLoss: 23400, gainLossPercent: 6.81 },
                { symbol: "USB", shares: 3500, currentPrice: 47.30, totalValue: 165550, gainLoss: -8700, gainLossPercent: -4.99 },
                { symbol: "PNC", shares: 2000, currentPrice: 172.40, totalValue: 344800, gainLoss: 28900, gainLossPercent: 9.15 },
            ],
            performance: { day: 0.54, month: 2.89, year: 9.87 },
        },
    },
    {
        type: "fdc3.contact",
        id: { email: "lisa.wang@quantumhedge.com" },
        name: "Lisa Wang",
        company: "Quantum Hedge Fund",
        portfolio: {
            totalValue: 5600000,
            holdings: [
                { symbol: "BRK.B", shares: 5000, currentPrice: 456.80, totalValue: 2284000, gainLoss: 156000, gainLossPercent: 7.33 },
                { symbol: "JNJ", shares: 4000, currentPrice: 162.30, totalValue: 649200, gainLoss: 34500, gainLossPercent: 5.61 },
                { symbol: "PG", shares: 3000, currentPrice: 175.90, totalValue: 527700, gainLoss: 28900, gainLossPercent: 5.80 },
                { symbol: "KO", shares: 8000, currentPrice: 61.40, totalValue: 491200, gainLoss: 23400, gainLossPercent: 5.00 },
                { symbol: "DIS", shares: 6000, currentPrice: 108.50, totalValue: 651000, gainLoss: -34500, gainLossPercent: -5.03 },
            ],
            performance: { day: 0.92, month: 4.12, year: 15.67 },
        },
    },
    {
        type: "fdc3.contact",
        id: { email: "robert.garcia@energyfunds.com" },
        name: "Robert Garcia",
        company: "Energy Investment Funds",
        portfolio: {
            totalValue: 2100000,
            holdings: [
                { symbol: "XOM", shares: 5000, currentPrice: 118.90, totalValue: 594500, gainLoss: 45600, gainLossPercent: 8.31 },
                { symbol: "CVX", shares: 3500, currentPrice: 165.40, totalValue: 578900, gainLoss: 34200, gainLossPercent: 6.28 },
                { symbol: "COP", shares: 4000, currentPrice: 134.70, totalValue: 538800, gainLoss: 28900, gainLossPercent: 5.66 },
                { symbol: "SLB", shares: 6000, currentPrice: 68.50, totalValue: 411000, gainLoss: -12300, gainLossPercent: -2.90 },
            ],
            performance: { day: 1.45, month: 3.78, year: 14.23 },
        },
    },
];
