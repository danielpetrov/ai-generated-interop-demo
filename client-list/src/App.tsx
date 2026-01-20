import ClientList from './components/ClientList'
import './App.css'

/**
 * 🎓 CLIENT LIST APP
 * 
 * Now connected to io.Connect Platform.
 * The communication logic is handled inside the <ClientList> component
 * using the @interopio/react-hooks library.
 */

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Client List</h1>
      </header>
      <main className="app-main">
        <ClientList />
      </main>
    </div>
  )
}

export default App
