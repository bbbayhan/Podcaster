import './App.scss'
import React, { useEffect, useState } from 'react'
import { Podcasts } from './components/podcasts'
import { usePodcasts } from './hooks/usePodcasts'
import { useFilter } from './hooks/useFilter'
import { LoadingAnimation } from './components/LoadingAnimation/loadingAnimation'

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
      {isLoading ? <><LoadingAnimation/><p>Loading...</p></> :
      <><div className="podcast-search">
      <span className="counter">{counter}</span>
      <input className="app-filter" onChange={handleChange} value={filter} placeholder="Filter podcasts..." /></div>
      <main>
        <Podcasts podcasts={podcasts} />
      </main></>}

    </div>
  )
}

export default App
