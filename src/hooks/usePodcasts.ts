import { useEffect, useState } from 'react';
import { PodcastListService } from '../services/podcast-list.service';

interface Podcast {
  id: string;
  title: string;
  description: string;
  autor: string;
  imageSource: string;
}

export function usePodcasts({ debouncedFilter }: { debouncedFilter: string }) {
  const [mappedPodcasts, setMappedPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    const getPodcasts = async () => {
      const podcasts = await PodcastListService();
      const filteredPodcasts = podcasts.filter((podcast: any) => podcast.title.toLowerCase().includes(debouncedFilter.toLowerCase()) || podcast.autor.toLowerCase().includes(debouncedFilter.toLowerCase()) || podcast.id.includes(debouncedFilter));
      setMappedPodcasts(filteredPodcasts);
    };
    getPodcasts();
  }, [debouncedFilter]);

  return { mappedPodcasts };
}
