import { useEffect, useState } from 'react';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import { usePodcastDetail } from '../../hooks/usePodcastDetail';
import { LoadingAnimation } from '../LoadingAnimation/loadingAnimation';
import './episode-table.scss';

export const PodcastDetail = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const { podcastId = '' } = useParams<{ podcastId: string }>();
  const { episodeCount, episodes } = usePodcastDetail({ podcastId });

  useEffect(() => {
    if (episodes.length > 0) setIsLoading(false);
  }, [episodes]);

  return (
    <>
      <Outlet />
      <div className="episode-container">
        {isLoading && <LoadingAnimation />}
        <div className="episode-list-container">
          <h2 className="episode-count" data-testid="episode-count">
            Episodes: {episodeCount}
          </h2>
          <table className="episode-table">
            <thead className="episode-table-title">
              <tr>
                <th className="episode-table-column">Title</th>
                <th className="episode-table-column">Date</th>
                <th className="episode-table-column">Duration</th>
              </tr>
            </thead>
            <tbody>
              {episodes.map(episode => (
                <tr key={episode.id} data-testid="episode-entry">
                  <td
                    className="episode-table-column"
                    data-testid={`episode-title-${episode.id}`}
                  >
                    <NavLink
                      to={`episode/${episode.id}`}
                      state={{
                        title: episode.title,
                        description: episode.description,
                        audio: episode.audio,
                      }}
                    >
                      {episode.title}
                    </NavLink>
                  </td>
                  <td
                    className="episode-table-column"
                    data-testid={`episode-date-${episode.id}`}
                  >
                    {episode.date}
                  </td>
                  <td
                    className="episode-table-column"
                    data-testid={`episode-duration-${episode.id}`}
                  >
                    {episode.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
