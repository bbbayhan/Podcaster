import { Outlet, NavLink } from "react-router-dom";
import { usePodcastDetail } from "../hooks/usePodcastDetail";


export const PodcastDetail = (): JSX.Element => {
  const { episodeCount, episodes } = usePodcastDetail();

  return (
    <>
      <div>
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
              <NavLink to={`episode/${episode.id}`}>{episode.title}</NavLink>
              <td>{episode.date}</td>
              <td>{episode.duration}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <Outlet /></>
  )
}