import { useEffect, useState } from "react";
import { getPodcastsFromService } from "../services/podcasts";

interface Podcast {
  id: string;
  title: string;
  description: string;
  autor: string;
  imageSource: string;
}

export function usePodcasts({ debouncedFilter }: { debouncedFilter: string }) {
  const [mappedPodcasts, setMappedPodcasts] = useState<Podcast[]>([])

  useEffect(() => {
    const getPodcasts = async () => {
      const filteredPodcasts = await getPodcastsFromService({ debouncedFilter })
      setMappedPodcasts(filteredPodcasts)
    }
    getPodcasts();
  }, [debouncedFilter])

  return { mappedPodcasts }
}