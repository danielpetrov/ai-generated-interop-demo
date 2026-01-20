import { createRoot } from 'react-dom/client'
import IOBrowser from '@interopio/browser'
import { IOConnectProvider } from '@interopio/react-hooks'
import App from './App.tsx'
import './index.css'

/**
 * 🎓 CLIENT PORTFOLIO - CONNECTED MODE
 * 
 * We wrap the app in <IOConnectProvider>.
 */

createRoot(document.getElementById('root')!).render(
  <IOConnectProvider settings={{ browser: { factory: IOBrowser } }}>
    <App />
  </IOConnectProvider>
)
