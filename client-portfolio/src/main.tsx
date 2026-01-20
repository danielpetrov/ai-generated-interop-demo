import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

/**
 * 🎓 CLIENT PORTFOLIO - STANDALONE BROWSER MODE
 * 
 * This app runs standalone in the browser and uses BroadcastChannel
 * for inter-app communication. No io.Connect infrastructure required.
 */

createRoot(document.getElementById('root')!).render(<App />)
