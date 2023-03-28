import { podcastsJson } from "../fixtures/podcasts"

export function usePodcasts({ filter }: { filter: string }) {

  const filteredPodcasts = filter === '' ? podcastsJson.feed.entry : podcastsJson.feed.entry.filter(podcast => podcast["im:name"].label.toLowerCase() === filter.toLowerCase() || podcast["im:artist"].label.toLowerCase() === filter.toLowerCase())

  const mappedPodcasts = filteredPodcasts.map(podcast => ({
    title: podcast["im:name"].label,
    autor: podcast["im:artist"].label,
    imageSource: podcast["im:image"][2].label,
  }))
  return { mappedPodcasts }
}