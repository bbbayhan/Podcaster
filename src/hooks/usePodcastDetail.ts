import { useEffect, useState } from 'react';
import { getPodcastDetailFromService } from '../services/podcastDetails';

interface Episode {
  id: string;
  title: string;
  date: string;
  duration: number;
  description: string;
  audio: string;
}

export function usePodcastDetail({ podcastId }: { podcastId: string }) {
  const [episodes, setMappedEpisodes] = useState<Episode[]>([]);
  const [episodeCount, setEpisodeCount] = useState<number>(0);

  useEffect(() => {
    const getPodcastDetails = async () => {
      const episodes = await getPodcastDetailFromService({ podcastId });
      setEpisodeCount(episodes.resultCount);
      setMappedEpisodes(episodes.mappedPodcastDetails);
    };
    getPodcastDetails();
  }, [podcastId]);

  return {
    episodeCount,
    episodes,
  };
}
