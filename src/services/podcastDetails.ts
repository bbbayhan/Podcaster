const oneDayInMilliseconds = 86400000;

export const getPodcastDetailFromService = async ({ podcastId }: { podcastId: string }) => {
    const podcastDetailLocalStorageString = localStorage.getItem(`podcast-${podcastId}`);
    const podcastDetailLocalStorage = podcastDetailLocalStorageString ? JSON.parse(podcastDetailLocalStorageString) : null;

    if (podcastDetailLocalStorage && (new Date() - new Date(podcastDetailLocalStorage.date)) < oneDayInMilliseconds) {
        console.log('Obteniendo detalle del podcast desde localStorage');
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
                console.log('podcastDetails', podcastDetails)
                const mappedPodcastDetails = podcastDetails.results.map((episode: any) => ({
                    id: episode.trackId,
                    title: episode.trackName,
                    date: episode.releaseDate,
                    duration: episode.trackTimeMillis,
                    description: episode.description,
                    audio: episode.episodeUrl
                }))
                localStorage.setItem(`podcast-${podcastId}`, JSON.stringify({
                    data: mappedPodcastDetails,
                    date: new Date()
                }));
                return { resultCount, mappedPodcastDetails };
            });
    }
}