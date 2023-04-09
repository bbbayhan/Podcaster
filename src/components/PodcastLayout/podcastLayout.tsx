import { Outlet, useNavigate, useParams } from "react-router-dom";
import { usePodcasts } from "../../hooks/usePodcasts";
import './podcast-layout.scss';

export const PodcastLayout = () => {
  const navigate = useNavigate();
  const { podcastId = "" } = useParams<{ podcastId: string }>();

  const { mappedPodcasts: podcasts } = usePodcasts({ debouncedFilter: podcastId });
  const hasPodcasts = podcasts?.length > 0
  return (
    <>
      {hasPodcasts && <><article data-testid="podcast-layout-card" className="podcast-layout" onClick={() => navigate(`../podcast/${podcastId}`)}>
        <img className="podcast-layout-image" data-testid="podcast-layout-image" src={podcasts[0].imageSource} id={podcastId} alt={podcasts[0].title} />
        <main className="podcast-layout-content"><h3 className="podcast-layout-title" data-testid={`podcast-layout-title-${podcastId}`}>{podcasts[0].title}</h3>
          <p className="podcast-layout-autor" data-testid={`podcast-layout-autor-${podcastId}`}>by {podcasts[0].autor}</p><b>Description:</b><p className="podcast-layout-description" data-testid={`podcast-layout-description-${podcastId}`}>{podcasts[0].description}</p></main>
      </article></>}
      <Outlet />
    </>);
};
