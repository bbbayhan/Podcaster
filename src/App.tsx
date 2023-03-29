import './App.css'
import React, { useEffect, useState } from 'react'
import { Podcasts } from './components/podcasts'
import { usePodcasts } from './hooks/usePodcasts'
import { useFilter } from './hooks/useFilter'

export const App: React.FC = () => {
  const { filter, setFilter } = useFilter()
  const [isLoading, setIsLoading] = useState(true);
  const { mappedPodcasts: podcasts } = usePodcasts({ filter })

  useEffect(() => {
    if (podcasts.length > 0) setIsLoading(false)
  }, [podcasts]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = event.target.value
    setFilter(newFilter)
  }


  return (
    <div className="App">
      {isLoading && <div className="lds-ripple"><div></div><div></div></div>}
      <input className="App-filter" onChange={handleChange} value={filter} placeholder="Filter podcasts..." />
      <main>
        <Podcasts podcasts={podcasts} />
      </main>

    </div>
  )
}

export default App
