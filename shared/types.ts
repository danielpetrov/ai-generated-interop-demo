// FDC3-compliant context types for interop

export interface ClientContext {
    type: "fdc3.contact";
    id: { email: string };
    name: string;
}

export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    portfolioValue: number;
    riskProfile: "conservative" | "moderate" | "aggressive";
    accountType: "individual" | "joint" | "corporate";
    lastContact: string;
}

export interface Holding {
    symbol: string;
    name: string;
    shares: number;
    avgCost: number;
    currentPrice: number;
    change: number;
    changePercent: number;
}

export interface Portfolio {
    clientId: string;
    totalValue: number;
    dayChange: number;
    dayChangePercent: number;
    holdings: Holding[];
}

export const CONTEXT_NAME = "SelectedClient";
