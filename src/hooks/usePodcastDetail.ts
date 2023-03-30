import { useEffect, useState } from "react"
import { getPodcastDetailFromService } from "../services/podcastDetails"

export function usePodcastDetail({ podcastId }: { podcastId: string }) {
    const [episodes, setMappedEpisodes] = useState([])
    const [episodeCount, setEpisodeCount] = useState(0)

    useEffect(() => {
        const getPodcastDetails = async () => {
            const episodes = await getPodcastDetailFromService({ podcastId })
            setEpisodeCount(episodes.resultCount)
            setMappedEpisodes(episodes.mappedPodcastDetails)
        }
        getPodcastDetails();
    }, [podcastId])

    return {
        episodeCount,
        episodes
    }
}