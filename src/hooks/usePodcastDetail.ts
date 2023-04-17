import { useEffect, useState } from 'react';
import { PodcastDetailService } from '../services/podcast-detail.service';
import { PodcastDetail } from '../domain/entities/PodcastDetail/podcastDetail';

export function usePodcastDetail({ podcastId }: { podcastId: string }) {
  const [episodes, setMappedEpisodes] = useState<PodcastDetail[]>([]);
  const [episodeCount, setEpisodeCount] = useState<number>(0);

  useEffect(() => {
    const getPodcastDetails = async () => {
      const episodes = await PodcastDetailService(podcastId);
      setEpisodeCount(episodes.resultCount);
      setMappedEpisodes(episodes.podcastDetails);
    };
    getPodcastDetails();
  }, [podcastId]);

  return {
    episodeCount,
    episodes,
  };
}
