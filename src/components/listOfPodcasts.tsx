import { useNavigate } from "react-router-dom";
import { Podcast } from "../services/podcasts"

export const ListOfPodcasts = ({ podcasts }: { podcasts: Podcast[] }): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = (event: any) => {
    event.preventDefault();
    const podcastId = event.target.id;
    navigate(`podcast/${podcastId}`, { replace: true });
  }
  
    return (<div className="cards">
      {
        podcasts.map((podcast: Podcast) => (
          <article className="card" onClick={handleClick}>
            <header><img src={podcast.imageSource} id={podcast.id} alt="Hot air balloons" style={{ borderRadius: '50%' }} /></header>
            <main><h3 className="title">{podcast.title}</h3>
              <h4 className="autor">Autor: {podcast.autor}</h4></main>
          </article>))
      }
    </div>)
  }