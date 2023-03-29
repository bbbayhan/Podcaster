import { podcastDetailJson } from "../fixtures/podcastDetail"

export function usePodcastDetail() {

    const episodes = podcastDetailJson.results.map(episode => ({
        id: episode.trackId,
        title: episode.trackName,
        date: episode.releaseDate,
        duration: episode.trackTimeMillis,
        description: episode.description,
        audio: episode.episodeUrl
    }))
    return {
        episodeCount: podcastDetailJson.resultCount,
        episodes
    }
}