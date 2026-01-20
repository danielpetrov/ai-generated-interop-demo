import { createRoot } from 'react-dom/client'
import IOBrowser from '@interopio/browser'
import { IOConnectProvider } from '@interopio/react-hooks'
import App from './App.tsx'
import './index.css'

/**
 * 🎓 CLIENT LIST - CONNECTED MODE
 * 
 * We wrap the app in <IOConnectProvider> which initializes the
 * io.Connect Browser library and provides the 'io' object
 * to all components via hooks.
 */

createRoot(document.getElementById('root')!).render(
    <IOConnectProvider settings={{
        browser: {
            factory: IOBrowser
        }
    }}>
        <App />
    </IOConnectProvider>
)
