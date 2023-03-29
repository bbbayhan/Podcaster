import { Outlet, useNavigate } from "react-router-dom";
import { usePodcasts } from '../hooks/usePodcasts';

export const PodcastLayout = () => {
  const filter = '';
  const navigate = useNavigate();
  const { mappedPodcasts: podcasts } = usePodcasts({ filter });
  const podcast = podcasts[0];
  return (
    <>
      <article className="podcastDetail" onClick={() => { navigate(`../podcast/${podcast.id}`), { replace: false }; }}>
        <header><img src={podcast.imageSource} id={podcast.id} alt="Hot air balloons" /></header>
        <main><h3>{podcast.title}</h3>
          <h4>Autor: {podcast.autor}</h4><p>Description: {podcast.description}</p></main>
      </article>
      <Outlet />
    </>);
};
