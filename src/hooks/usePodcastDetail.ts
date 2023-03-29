import { podcastDetailJson } from "../fixtures/podcastDetail"

export function usePodcastDetail() {

    const episodes = podcastDetailJson.results.map(episode => ({
        id: episode.trackId,
        title: episode.trackName,
        date: episode.releaseDate,
        duration: episode.trackTimeMillis,
    }))
    return {
        episodeCount: podcastDetailJson.resultCount,
        episodes
    }
}