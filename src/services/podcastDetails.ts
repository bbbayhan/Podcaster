const oneDayInMilliseconds = 86400000;

const formatStringToDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
}

const formatNumberToMinutes = (trackTimeMillis: number) => {
    const trackTimeSeconds = Math.floor(trackTimeMillis / 1000);
    const minutes = Math.floor(trackTimeSeconds / 60);
    const seconds = trackTimeSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export const getPodcastDetailFromService = async ({ podcastId }: { podcastId: string }) => {
    const podcastDetailLocalStorageString = localStorage.getItem(`podcast-${podcastId}`);
    const podcastDetailLocalStorage = podcastDetailLocalStorageString ? JSON.parse(podcastDetailLocalStorageString) : null;

    if (podcastDetailLocalStorage && (new Date().getTime() - new Date(podcastDetailLocalStorage.date).getTime()) < oneDayInMilliseconds) {
        return podcastDetailLocalStorage.data;
    } else {
        return await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Network response was not ok.')
            })
            .then(data => {
                const podcastDetails = JSON.parse(data.contents)
                const resultCount = podcastDetails.resultCount

                const mappedPodcastDetails = podcastDetails.results.map((episode: any) => ({
                    id: episode.trackId,
                    title: episode.trackName,
                    date: formatStringToDate(episode.releaseDate),
                    duration: formatNumberToMinutes(episode.trackTimeMillis),
                    description: episode.description,
                    audio: episode.episodeUrl
                }))
                localStorage.setItem(`podcast-${podcastId}`, JSON.stringify({
                    data: { resultCount, mappedPodcastDetails },
                    date: new Date()
                }));
                return { resultCount, mappedPodcastDetails };
            });
    }
}