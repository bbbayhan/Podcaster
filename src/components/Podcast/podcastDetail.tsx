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
        <h2>Episodes: {episodeCount}</h2>
        <table className="episode-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode) => <tr key={episode.id}>
              <td><NavLink to={`episode/${episode.id}`} state={{ title: episode.title, description: episode.description, audio: episode.audio }}>{episode.title}</NavLink></td>
              <td>{episode.date}</td>
              <td>{episode.duration}</td>
            </tr>)}
          </tbody>
        </table>
      </div></div>
    </>
  )
}