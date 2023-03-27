import { podcastsJson } from '../fixtures/podcasts'

interface Podcast {
  title: string,
  autor: string,
  imageSource: string
}

export const Podcasts = (): JSX.Element => {
  const podcasts = podcastsJson.feed.entry.map(podcast => ({
    title: podcast["im:name"].label,
    autor: podcast["im:artist"].label,
    imageSource: podcast["im:image"][2].label,
  }))


  return (<div className="cards">
    {
      podcasts.map((podcast: Podcast) => (
        <article className="card">
          <header><img src={podcast.imageSource} alt="Hot air balloons" style={{ borderRadius: '50%' }} /></header>
          <main><h3>{podcast.title}</h3>
            <h4>Autor: {podcast.autor}</h4></main>
        </article>))
    }
  </div>)
}
