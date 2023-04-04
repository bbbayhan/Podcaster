import { Outlet, useNavigate, useParams } from "react-router-dom";
import { usePodcasts } from "../../hooks/usePodcasts";
import './podcast-layout.scss';

export const PodcastLayout = () => {
  const navigate = useNavigate();
  const { podcastId= "" } = useParams<{ podcastId: string}>();

  const { mappedPodcasts: podcasts } = usePodcasts({debouncedFilter:podcastId});
  const hasPodcasts = podcasts?.length > 0
    return (
    <>
      {hasPodcasts && <><article className="podcast-layout" onClick={() => navigate(`../podcast/${podcastId}`)}>
        <img src={podcasts[0].imageSource} id={podcastId} alt={podcasts[0].title} />
        <main className="podcast-layout-content"><h3 className="podcast-layout-title">{podcasts[0].title}</h3>
          <h4 className="podcast-layout-autor">Autor: {podcasts[0].autor}</h4><p className="podcast-layout-description">Description: {podcasts[0].description}</p></main>
      </article></>}
      <Outlet />
    </>);
};
