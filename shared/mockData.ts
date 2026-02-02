import { Client, Portfolio, Holding } from "./types";

export const clients: Client[] = [
    {
        id: "C001",
        name: "Alexandra Chen",
        email: "alexandra.chen@techinvest.com",
        phone: "+1 (415) 555-0101",
        company: "TechInvest Capital",
        portfolioValue: 2847500,
        riskProfile: "aggressive",
        accountType: "corporate",
        lastContact: "2024-01-15",
    },
    {
        id: "C002",
        name: "Marcus Williams",
        email: "marcus.williams@gmail.com",
        phone: "+1 (212) 555-0202",
        company: "Personal Account",
        portfolioValue: 584200,
        riskProfile: "moderate",
        accountType: "individual",
        lastContact: "2024-01-22",
    },
    {
        id: "C003",
        name: "Sarah & David Johnson",
        email: "johnson.family@outlook.com",
        phone: "+1 (617) 555-0303",
        company: "Johnson Family Trust",
        portfolioValue: 1256800,
        riskProfile: "conservative",
        accountType: "joint",
        lastContact: "2024-01-18",
    },
    {
        id: "C004",
        name: "Raj Patel",
        email: "raj.patel@quanthedge.io",
        phone: "+1 (312) 555-0404",
        company: "QuantHedge Partners",
        portfolioValue: 5420000,
        riskProfile: "aggressive",
        accountType: "corporate",
        lastContact: "2024-01-25",
    },
    {
        id: "C005",
        name: "Emma Rodriguez",
        email: "emma.r@globalfin.net",
        phone: "+1 (305) 555-0505",
        company: "Global Finance LLC",
        portfolioValue: 892300,
        riskProfile: "moderate",
        accountType: "corporate",
        lastContact: "2024-01-20",
    },
    {
        id: "C006",
        name: "Thomas Bergström",
        email: "t.bergstrom@nordic-inv.se",
        phone: "+46 70 555 0606",
        company: "Nordic Investments AB",
        portfolioValue: 3150000,
        riskProfile: "moderate",
        accountType: "corporate",
        lastContact: "2024-01-12",
    },
];

const holdingsData: Record<string, Holding[]> = {
    C001: [
        { symbol: "NVDA", name: "NVIDIA Corporation", shares: 450, avgCost: 420.15, currentPrice: 875.50, change: 12.30, changePercent: 1.43 },
        { symbol: "MSFT", name: "Microsoft Corporation", shares: 320, avgCost: 285.00, currentPrice: 415.25, change: -2.15, changePercent: -0.52 },
        { symbol: "AMZN", name: "Amazon.com Inc", shares: 280, avgCost: 145.50, currentPrice: 185.75, change: 3.25, changePercent: 1.78 },
        { symbol: "GOOGL", name: "Alphabet Inc", shares: 200, avgCost: 125.00, currentPrice: 155.82, change: 1.82, changePercent: 1.18 },
    ],
    C002: [
        { symbol: "VTI", name: "Vanguard Total Stock ETF", shares: 850, avgCost: 215.00, currentPrice: 252.45, change: 0.95, changePercent: 0.38 },
        { symbol: "BND", name: "Vanguard Total Bond ETF", shares: 600, avgCost: 78.50, currentPrice: 72.30, change: -0.15, changePercent: -0.21 },
        { symbol: "SCHD", name: "Schwab US Dividend ETF", shares: 420, avgCost: 72.00, currentPrice: 81.20, change: 0.45, changePercent: 0.56 },
    ],
    C003: [
        { symbol: "JNJ", name: "Johnson & Johnson", shares: 400, avgCost: 158.00, currentPrice: 162.45, change: -0.85, changePercent: -0.52 },
        { symbol: "PG", name: "Procter & Gamble", shares: 350, avgCost: 142.00, currentPrice: 168.90, change: 1.20, changePercent: 0.72 },
        { symbol: "KO", name: "Coca-Cola Company", shares: 500, avgCost: 58.00, currentPrice: 62.15, change: 0.35, changePercent: 0.57 },
        { symbol: "T", name: "AT&T Inc", shares: 800, avgCost: 22.50, currentPrice: 17.85, change: -0.25, changePercent: -1.38 },
        { symbol: "VZ", name: "Verizon Communications", shares: 600, avgCost: 42.00, currentPrice: 38.72, change: -0.18, changePercent: -0.46 },
    ],
    C004: [
        { symbol: "SPY", name: "SPDR S&P 500 ETF", shares: 2500, avgCost: 425.00, currentPrice: 502.35, change: 4.25, changePercent: 0.85 },
        { symbol: "QQQ", name: "Invesco QQQ Trust", shares: 1800, avgCost: 365.00, currentPrice: 445.80, change: 6.80, changePercent: 1.55 },
        { symbol: "XLF", name: "Financial Select SPDR", shares: 3000, avgCost: 35.00, currentPrice: 42.15, change: 0.65, changePercent: 1.57 },
        { symbol: "IWM", name: "iShares Russell 2000", shares: 1500, avgCost: 185.00, currentPrice: 205.45, change: 2.15, changePercent: 1.06 },
    ],
    C005: [
        { symbol: "AAPL", name: "Apple Inc", shares: 380, avgCost: 155.00, currentPrice: 192.45, change: 1.45, changePercent: 0.76 },
        { symbol: "META", name: "Meta Platforms Inc", shares: 220, avgCost: 285.00, currentPrice: 505.25, change: 8.75, changePercent: 1.76 },
        { symbol: "TSLA", name: "Tesla Inc", shares: 150, avgCost: 245.00, currentPrice: 182.35, change: -4.65, changePercent: -2.49 },
    ],
    C006: [
        { symbol: "ASML", name: "ASML Holding NV", shares: 120, avgCost: 650.00, currentPrice: 985.50, change: 15.50, changePercent: 1.60 },
        { symbol: "NOVO-B", name: "Novo Nordisk A/S", shares: 400, avgCost: 95.00, currentPrice: 128.75, change: 2.25, changePercent: 1.78 },
        { symbol: "SAP", name: "SAP SE", shares: 300, avgCost: 145.00, currentPrice: 198.45, change: 3.45, changePercent: 1.77 },
        { symbol: "LVMH", name: "LVMH Moët Hennessy", shares: 85, avgCost: 750.00, currentPrice: 825.30, change: -8.70, changePercent: -1.04 },
        { symbol: "SIE", name: "Siemens AG", shares: 250, avgCost: 155.00, currentPrice: 182.65, change: 1.85, changePercent: 1.02 },
    ],
};

export function getClientById(id: string): Client | undefined {
    return clients.find((c) => c.id === id);
}

export function getClientByEmail(email: string): Client | undefined {
    return clients.find((c) => c.email === email);
}

export function getPortfolio(clientId: string): Portfolio | undefined {
    const client = getClientById(clientId);
    if (!client) return undefined;

    const holdings = holdingsData[clientId] || [];
    const totalValue = holdings.reduce((sum, h) => sum + h.shares * h.currentPrice, 0);
    const dayChange = holdings.reduce((sum, h) => sum + h.shares * h.change, 0);
    const dayChangePercent = totalValue > 0 ? (dayChange / (totalValue - dayChange)) * 100 : 0;

    return {
        clientId,
        totalValue,
        dayChange,
        dayChangePercent,
        holdings,
    };
}

export function searchClients(query: string): Client[] {
    const q = query.toLowerCase().trim();
    if (!q) return clients;

    return clients.filter(
        (c) =>
            c.name.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            c.company.toLowerCase().includes(q) ||
            c.id.toLowerCase().includes(q)
    );
}
