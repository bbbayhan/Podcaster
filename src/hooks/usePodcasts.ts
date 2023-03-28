import { podcastsJson } from "../fixtures/podcasts"

export function usePodcasts() {
  const mappedPodcasts = podcastsJson.feed.entry.map(podcast => ({
    title: podcast["im:name"].label,
    autor: podcast["im:artist"].label,
    imageSource: podcast["im:image"][2].label,
  }))
  return { mappedPodcasts }
}