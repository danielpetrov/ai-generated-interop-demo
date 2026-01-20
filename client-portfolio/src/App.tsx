import ClientPortfolio from './components/ClientPortfolio'
import './App.css'

/**
 * 🎓 CLIENT PORTFOLIO APP
 * 
 * Connected to io.Connect Platform.
 */

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Client Portfolio</h1>
      </header>
      <main className="app-main">
        <ClientPortfolio />
      </main>
    </div>
  )
}

export default App
