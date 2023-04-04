import { useNavigate } from "react-router-dom";
import { Podcast } from "../../services/interfaces";
import './style.scss';

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
          <article key={podcast.id} className="card" onClick={handleClick}>
            <img className="podcast-image" src={podcast.imageSource} id={podcast.id} alt={podcast.title} />
            <main className="podcast-content"><h3 className="podcast-title">{podcast.title}</h3>
              <h4 className="podcast-autor">Autor: {podcast.autor}</h4></main>
          </article>))
      }
    </div>)
  }