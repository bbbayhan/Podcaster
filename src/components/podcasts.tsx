import { Podcast } from "../services/podcasts"

export const ListOfPodcasts = ({ podcasts }: { podcasts: Podcast[] }): JSX.Element => {
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

function NoPodcastsError() {
  return (
    <p>There are no podcasts found.</p>
  )
}

export const Podcasts = ({ podcasts }: { podcasts: Podcast[] }): JSX.Element => {

  const hasPodcasts = podcasts?.length > 0

  return (
    hasPodcasts
      ? <ListOfPodcasts podcasts={podcasts} />
      : <NoPodcastsError />
  )
}