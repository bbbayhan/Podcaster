import { useState } from "react";

export function usePodcasts({ filter }: { filter: string }) {
  const [mappedPodcasts, setMappedPodcasts] = useState([])

  const getPodcasts = async () => {
    await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(data => {
        const podcasts = JSON.parse(data.contents).feed.entry
        const mappedPodcasts = podcasts.map((podcast: any) => ({
          id: podcast.id.attributes["im:id"],
          title: podcast["im:name"].label,
          autor: podcast["im:artist"].label,
          imageSource: podcast["im:image"][2].label,
          description: podcast.summary.label
        }));
        setMappedPodcasts(mappedPodcasts);
      });
  }

  return { mappedPodcasts, getPodcasts }
}