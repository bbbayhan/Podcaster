import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { usePodcasts } from "../hooks/usePodcasts";

export const PodcastLayout = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const podcastId = pathname.substring(pathname.lastIndexOf('/') + 1);

  const { mappedPodcasts: podcasts } = usePodcasts({filter:podcastId});
  const hasPodcasts = podcasts?.length > 0
    return (
    <>
      {hasPodcasts && <article className="podcastDetail" onClick={() => navigate(`../podcast/${podcastId}`)}>
        <header><img src={podcasts[0].imageSource} id={podcastId} alt="Hot air balloons" /></header>
        <main><h3>{podcasts[0].title}</h3>
          <h4>Autor: {podcasts[0].autor}</h4><p>Description: {podcasts[0].description}</p></main>
      </article>}
      <Outlet />
    </>);
};
