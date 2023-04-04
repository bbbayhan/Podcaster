import { useEffect, useState } from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";
import { usePodcastDetail } from "../../hooks/usePodcastDetail";
import { LoadingAnimation } from "../LoadingAnimation/loadingAnimation";
import './episode-table.scss';

export const PodcastDetail = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const { podcastId = "" } = useParams<{ podcastId: string }>();
  const { episodeCount, episodes } = usePodcastDetail({ podcastId });

  useEffect(() => {
    if (episodes.length > 0) setIsLoading(false)
  }, [episodes]);

  return (
    <>
      <Outlet />
      <div className="episode-container">{isLoading && <LoadingAnimation/>}<div>
        <h2 className="episode-count">Episodes: {episodeCount}</h2>
        <table className="episode-table">
          <thead className="episode-table-title">
            <tr>
              <th className="episode-table-column">Title</th>
              <th className="episode-table-column">Date</th>
              <th className="episode-table-column">Duration</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode) => <tr key={episode.id}>
              <td className="episode-table-column"><NavLink to={`episode/${episode.id}`} state={{ title: episode.title, description: episode.description, audio: episode.audio }}>{episode.title}</NavLink></td>
              <td className="episode-table-column">{episode.date}</td>
              <td className="episode-table-column">{episode.duration}</td>
            </tr>)}
          </tbody>
        </table>
      </div></div>
    </>
  )
}