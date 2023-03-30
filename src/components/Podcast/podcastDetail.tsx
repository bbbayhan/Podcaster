import { useEffect, useState } from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";
import { usePodcastDetail } from "../../hooks/usePodcastDetail";


export const PodcastDetail = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const { podcastId= "" } = useParams<{ podcastId: string}>();
  const { episodeCount, episodes } = usePodcastDetail({podcastId});
  
  useEffect(() => {
    if (episodes.length > 0) setIsLoading(false)
  }, [episodes]);

  return (
    <>
      <div>
      {isLoading && <div className="lds-ripple"><div></div><div></div></div>}
        <h3>Episodes: {episodeCount}</h3>
        <table style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode) => <tr>
              <NavLink to={`episode/${episode.id}`} state={{title:episode.title, description:episode.description, audio: episode.audio}}>{episode.title}</NavLink>
              <td>{episode.date}</td>
              <td>{episode.duration}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <Outlet /></>
  )
}