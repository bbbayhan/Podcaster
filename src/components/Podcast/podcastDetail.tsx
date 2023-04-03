import { useEffect, useState } from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";
import { usePodcastDetail } from "../../hooks/usePodcastDetail";
import { LoadingAnimation } from "../../loadingAnimation";


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
      <div style={{display: 'flex', flexDirection: 'column'}}>{isLoading && <LoadingAnimation/>}<div style={{marginTop: '1rem', marginLeft: '24rem', color: 'black'}}>
        <h2 style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)', textAlign: 'left', padding:'1rem' }}>Episodes: {episodeCount}</h2>
        <table className="Episode-table">
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