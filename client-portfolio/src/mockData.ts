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
