import { useEffect, useState } from "react";
import { getPodcastsFromService } from "../services/podcasts";

export function usePodcasts({ filter }: { filter: string }) {
  const [mappedPodcasts, setMappedPodcasts] = useState([])

  useEffect(() => {
    const getPodcasts = async () => {
      const filteredPodcasts = await getPodcastsFromService({ filter })
      setMappedPodcasts(filteredPodcasts)
    }
    getPodcasts();
  }, [filter])

  return { mappedPodcasts }
}