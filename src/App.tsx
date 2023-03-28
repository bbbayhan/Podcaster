import './App.css'
import React from 'react'
import { Podcasts } from './components/podcasts'
import { usePodcasts } from './hooks/usePodcasts'

export const App: React.FC = () => {
  const {mappedPodcasts : podcasts} = usePodcasts()
 
  return (
    <div className="App">
        <header className="App-header">
          <h3 className="App-title">Podcaster</h3>
          <form className='form'>
          <input className="App-filter" type=""name='query' placeholder="Filter podcasts..." /></form>
        </header>
        <main>
            <Podcasts podcasts={podcasts}/>
        </main>

    </div>
  )
}

export default App
