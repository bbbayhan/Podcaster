import './App.css'
import React from 'react'
import { Podcasts } from './components/podcasts'

export const App: React.FC = () => {
  return (
    <div className="App">
        <header className="App-header">
          <h3 className="App-title">Podcaster</h3>
          <input className="App-filter" type=""name='query' placeholder="Filter podcasts..." />
        </header>
        <main>
            <Podcasts />
        </main>

    </div>
  )
}

export default App
