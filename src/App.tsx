import './App.css'
import React, { useEffect, useState } from 'react'
import { Podcasts } from './components/podcasts'
import { usePodcasts } from './hooks/usePodcasts'
import { useFilter } from './hooks/useFilter'

export const App: React.FC = () => {
  const { filter, setFilter } = useFilter()
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0)
  const { mappedPodcasts: podcasts } = usePodcasts({ filter })

  useEffect(() => {
    if (podcasts.length > 0){
      setIsLoading(false)
      setCounter(podcasts.length)
    } 
  }, [podcasts,filter]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = event.target.value
    setFilter(newFilter)
  }


  return (
    <div className="App">
      {isLoading ? <><div className="lds-ripple"><div></div><div></div></div> <p>Loading podcasts...</p></> :
      <><div className="Podcast-search">
      <span className="Counter">{counter}</span>
      <input className="App-filter" onChange={handleChange} value={filter} placeholder="Filter podcasts..." /></div>
      <main>
        <Podcasts podcasts={podcasts} />
      </main></>}

    </div>
  )
}

export default App
