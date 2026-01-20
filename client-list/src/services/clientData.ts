/**
 * 🎓 MOCK CLIENT DATA SERVICE
 * 
 * In a real application, this would connect to a backend API.
 * For this demo, we use static data that can easily be swapped
 * for real API calls later.
 * 
 * This is a "deterministic" approach - the data structure is
 * clearly defined, making it easy to integrate with real services.
 */

export interface Client {
    id: string
    name: string
    email: string
    company: string
    status: 'active' | 'inactive' | 'pending'
    totalAssets: number
    riskProfile: 'conservative' | 'moderate' | 'aggressive'
    lastContact: string
    avatar: string
}

// Generate avatar URL based on name
const getAvatarUrl = (name: string): string => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`
}

export const clients: Client[] = [
    {
        id: 'CLT001',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@techcorp.com',
        company: 'TechCorp Industries',
        status: 'active',
        totalAssets: 2450000,
        riskProfile: 'moderate',
        lastContact: '2026-01-15',
        avatar: getAvatarUrl('Sarah Johnson')
    },
    {
        id: 'CLT002',
        name: 'Michael Chen',
        email: 'michael.chen@innovate.io',
        company: 'Innovate.io',
        status: 'active',
        totalAssets: 5200000,
        riskProfile: 'aggressive',
        lastContact: '2026-01-14',
        avatar: getAvatarUrl('Michael Chen')
    },
    {
        id: 'CLT003',
        name: 'Emily Rodriguez',
        email: 'emily.r@globalfinance.com',
        company: 'Global Finance Ltd',
        status: 'active',
        totalAssets: 1850000,
        riskProfile: 'conservative',
        lastContact: '2026-01-12',
        avatar: getAvatarUrl('Emily Rodriguez')
    },
    {
        id: 'CLT004',
        name: 'David Park',
        email: 'david.park@ventures.co',
        company: 'Park Ventures',
        status: 'pending',
        totalAssets: 3100000,
        riskProfile: 'moderate',
        lastContact: '2026-01-10',
        avatar: getAvatarUrl('David Park')
    },
    {
        id: 'CLT005',
        name: 'Lisa Thompson',
        email: 'lisa.t@healthcare.org',
        company: 'Healthcare Partners',
        status: 'active',
        totalAssets: 890000,
        riskProfile: 'conservative',
        lastContact: '2026-01-08',
        avatar: getAvatarUrl('Lisa Thompson')
    },
    {
        id: 'CLT006',
        name: 'James Wilson',
        email: 'james.wilson@realestate.com',
        company: 'Wilson Real Estate',
        status: 'inactive',
        totalAssets: 4500000,
        riskProfile: 'aggressive',
        lastContact: '2025-12-20',
        avatar: getAvatarUrl('James Wilson')
    },
    {
        id: 'CLT007',
        name: 'Amanda Foster',
        email: 'amanda.f@startup.io',
        company: 'Foster Startups',
        status: 'active',
        totalAssets: 1200000,
        riskProfile: 'aggressive',
        lastContact: '2026-01-16',
        avatar: getAvatarUrl('Amanda Foster')
    },
    {
        id: 'CLT008',
        name: 'Robert Martinez',
        email: 'robert.m@manufacturing.com',
        company: 'Martinez Manufacturing',
        status: 'active',
        totalAssets: 6800000,
        riskProfile: 'moderate',
        lastContact: '2026-01-13',
        avatar: getAvatarUrl('Robert Martinez')
    }
]

export const getClientById = (id: string): Client | undefined => {
    return clients.find(client => client.id === id)
}

export const getClientByEmail = (email: string): Client | undefined => {
    return clients.find(client => client.email === email)
}

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount)
}
