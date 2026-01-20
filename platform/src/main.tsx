import { createRoot } from 'react-dom/client'
import IOBrowserPlatform from '@interopio/browser-platform'
import App from './App.tsx'
import { config } from './config'
import './index.css'

/**
 * 🎓 IO.CONNECT BROWSER PLATFORM
 * 
 * This is the "hub" that connects all client apps running in the browser.
 * The platform initializes io.Connect Browser infrastructure and enables
 * channel communication between apps.
 */

const platformConfig = {
    licenseKey: config.licenseKey,

    // Define the available channels for inter-app communication
    channels: {
        definitions: [
            { name: 'Red', meta: { color: '#ef4444' } },
            { name: 'Green', meta: { color: '#22c55e' } },
            { name: 'Blue', meta: { color: '#3b82f6' } },
            { name: 'Yellow', meta: { color: '#eab308' } },
            { name: 'Purple', meta: { color: '#a855f7' } }
        ]
    },

    // Define the client applications that can be launched by the platform
    applications: {
        local: [
            {
                name: 'client-list',
                title: 'Client List',
                type: 'window' as const,
                details: {
                    url: 'http://localhost:3001'
                }
            },
            {
                name: 'client-portfolio',
                title: 'Client Portfolio',
                type: 'window' as const,
                details: {
                    url: 'http://localhost:3003'
                }
            }
        ]
    }
}

// Initialize the Browser Platform
IOBrowserPlatform(platformConfig)
    .then((result) => {
        // IOBrowserPlatform returns { io, platform, ... }
        // We need to extract the 'io' API object to pass to the App
        const io = result.io

        console.log('✅ io.Connect Browser Platform initialized!', io)
        createRoot(document.getElementById('root')!).render(<App io={io} />)
    })
    .catch((error) => {
        console.error('❌ Failed to initialize platform:', error)
        createRoot(document.getElementById('root')!).render(
            <div style={{
                padding: '2rem',
                textAlign: 'center',
                color: '#ef4444',
                fontFamily: 'system-ui'
            }}>
                <h2>Platform Error</h2>
                <p>{error.message}</p>
            </div>
        )
    })
