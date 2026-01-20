import { useState } from 'react'
import './App.css'

/**
 * 🎓 TABBED DASHBOARD PLATFORM
 * 
 * A unified dashboard that embeds client apps as iframes within tabs.
 * Features:
 * - Tab bar with closeable tabs
 * - Dropdown to add new apps
 * - Both apps open by default
 */

interface AppDefinition {
    id: string
    name: string
    title: string
    url: string
    icon: string
}

// Available apps that can be added to the dashboard
const AVAILABLE_APPS: AppDefinition[] = [
    {
        id: 'client-list',
        name: 'client-list',
        title: 'Client List',
        url: 'http://localhost:5175',
        icon: '👥'
    },
    {
        id: 'client-portfolio',
        name: 'client-portfolio',
        title: 'Client Portfolio',
        url: 'http://localhost:5173',
        icon: '📊'
    }
]

interface AppProps {
    io: any
}

function App({ io }: AppProps) {
    // Start with both apps open by default
    const [openTabs, setOpenTabs] = useState<AppDefinition[]>([...AVAILABLE_APPS])
    const [activeTabId, setActiveTabId] = useState<string>(AVAILABLE_APPS[0].id)

    console.log('🔍 IO Object:', io)

    // Add a new app tab
    const addTab = (appId: string) => {
        const app = AVAILABLE_APPS.find(a => a.id === appId)
        if (app && !openTabs.find(t => t.id === appId)) {
            setOpenTabs([...openTabs, app])
            setActiveTabId(appId)
        }
    }

    // Close a tab
    const closeTab = (appId: string, e: React.MouseEvent) => {
        e.stopPropagation()
        const newTabs = openTabs.filter(t => t.id !== appId)
        setOpenTabs(newTabs)

        // If we closed the active tab, switch to another
        if (activeTabId === appId && newTabs.length > 0) {
            setActiveTabId(newTabs[0].id)
        }
    }

    // Get apps that aren't currently open (for the dropdown)
    const availableToAdd = AVAILABLE_APPS.filter(
        app => !openTabs.find(t => t.id === app.id)
    )

    const activeApp = openTabs.find(t => t.id === activeTabId)

    return (
        <div className="dashboard">
            {/* Header */}
            <header className="dashboard-header">
                <div className="dashboard-title">
                    <span className="logo">⚡</span>
                    <h1>io.Connect Dashboard</h1>
                </div>

                {/* Add App Dropdown */}
                {availableToAdd.length > 0 && (
                    <div className="add-app-dropdown">
                        <select
                            onChange={(e) => {
                                if (e.target.value) {
                                    addTab(e.target.value)
                                    e.target.value = ''
                                }
                            }}
                            defaultValue=""
                        >
                            <option value="" disabled>+ Add App</option>
                            {availableToAdd.map(app => (
                                <option key={app.id} value={app.id}>
                                    {app.icon} {app.title}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </header>

            {/* Tab Bar */}
            <div className="tab-bar">
                {openTabs.map(tab => (
                    <div
                        key={tab.id}
                        className={`tab ${activeTabId === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTabId(tab.id)}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        <span className="tab-title">{tab.title}</span>
                        <button
                            className="tab-close"
                            onClick={(e) => closeTab(tab.id, e)}
                            title="Close tab"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {/* Content Area - iframes for each app */}
            <main className="dashboard-content">
                {openTabs.length === 0 ? (
                    <div className="empty-state">
                        <h2>No Apps Open</h2>
                        <p>Use the "Add App" dropdown above to open an application.</p>
                    </div>
                ) : (
                    openTabs.map(tab => (
                        <iframe
                            key={tab.id}
                            src={tab.url}
                            title={tab.title}
                            className="app-frame"
                            style={{
                                display: activeTabId === tab.id ? 'block' : 'none'
                            }}
                        />
                    ))
                )}
            </main>
        </div>
    )
}

export default App
