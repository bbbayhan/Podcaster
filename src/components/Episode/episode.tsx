import { useParams } from 'react-router-dom';
import './style.scss';
import { usePodcastDetail } from '../../hooks/usePodcastDetail';
import { useEffect, useState } from 'react';

type EpisodeType = {
  id: string;
  title: string;
  description: string;
  audio: string;
};

export const Episode = (): JSX.Element => {
  const { podcastId = '', episodeId = '' } = useParams<{
    podcastId: string;
    episodeId: string;
  }>();
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeType | null>(
    null
  );
  console.log(selectedEpisode);
  const { episodes } = usePodcastDetail({ podcastId });

  useEffect(() => {
    const selected = episodes.find(episode => episode.id == episodeId);
    setSelectedEpisode(selected || null);
  }, [episodes]);

  return (
    <div className="episode">
      <article className="episode-article">
        <main className="episode-content">
          <h2 className="episode-title" data-testid="episode-title">
            {selectedEpisode?.title}
          </h2>
          <p className="episode-description" data-testid="episode-description">
            {selectedEpisode?.description}
          </p>
          <audio
            className="episode-audio"
            src={selectedEpisode?.audio}
            controls
            data-testid="audio-element"
          ></audio>
        </main>
      </article>
    </div>
  );
};
