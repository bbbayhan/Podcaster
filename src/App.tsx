import './App.css'
import React from 'react'
import { Podcasts } from './components/podcasts'
import { usePodcasts } from './hooks/usePodcasts'
import { useFilter } from './hooks/useFilter'

export const App: React.FC = () => {
  const {filter, setFilter} = useFilter()
  const { mappedPodcasts: podcasts } = usePodcasts({filter})


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = event.target.value
    setFilter(newFilter)
  }


  return (
    <div className="App">
      <header className="App-header">
        <h3 className="App-title">Podcaster</h3>
        <input className="App-filter" onChange={handleChange} value={filter} placeholder="Filter podcasts..." />
      </header>
      <main>
        <Podcasts podcasts={podcasts} />
      </main>

    </div>
  )
}

export default App
