import { useNavigate } from 'react-router-dom';
import { Podcast } from '../../domain/podcast';
import './style.scss';

export const ListOfPodcasts = ({
  podcasts
}: {
  podcasts: Podcast[];
}): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="cards">
      {podcasts.map((podcast: Podcast) => (
        <article
          key={podcast.id}
          data-testid="podcast-list"
          className="card"
          onClick={() => navigate(`podcast/${podcast.id}`)}
        >
          <img
            data-testid="podcast-image"
            className="podcast-image"
            src={podcast.imageSource}
            id={podcast.id}
            alt={podcast.title}
          />
          <main className="podcast-content">
            <h3
              data-testid={`podcast-title-${podcast.id}`}
              className="podcast-title"
            >
              {podcast.title}
            </h3>
            <h4
              className="podcast-autor"
              data-testid={`podcast-autor-${podcast.id}`}
            >
              Autor: {podcast.autor}
            </h4>
          </main>
        </article>
      ))}
    </div>
  );
};
