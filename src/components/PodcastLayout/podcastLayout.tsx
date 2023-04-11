import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { usePodcasts } from '../../hooks/usePodcasts';
import './podcast-layout.scss';

export const PodcastLayout = () => {
  const navigate = useNavigate();
  const { podcastId = '' } = useParams<{ podcastId: string }>();

  const { mappedPodcasts: podcasts } = usePodcasts({
    debouncedFilter: podcastId
  });
  const podcast = podcasts?.[0];
  return (
    <>
      {podcast && (
        <>
          <article
            data-testid="podcast-layout-card"
            className="podcast-layout"
            onClick={() => navigate(`../podcast/${podcastId}`)}
          >
            <img
              className="podcast-layout-image"
              data-testid="podcast-layout-image"
              src={podcast.imageSource}
              id={podcastId}
              alt={podcast.title}
            />
            <main className="podcast-layout-content">
              <h3
                className="podcast-layout-title"
                data-testid={`podcast-layout-title-${podcastId}`}
              >
                {podcast.title}
              </h3>
              <p
                className="podcast-layout-autor"
                data-testid={`podcast-layout-autor-${podcastId}`}
              >
                by {podcast.autor}
              </p>
              <b className="podcast-layout-description">Description:</b>
              <p
                className="podcast-layout-description"
                data-testid={`podcast-layout-description-${podcastId}`}
              >
                {podcast.description}
              </p>
            </main>
          </article>
        </>
      )}
      <Outlet />
    </>
  );
};
