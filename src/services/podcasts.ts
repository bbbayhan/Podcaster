const oneDayInMilliseconds = 86400000;

export const getPodcastsFromService = async ({ filter }: { filter: string }) => {
  const podcastFromLocalStorageString = localStorage.getItem('podcasts');
  const podcastFromLocalStorage = podcastFromLocalStorageString ? JSON.parse(podcastFromLocalStorageString) : null;

  if (podcastFromLocalStorage && (new Date().getTime() - new Date(podcastFromLocalStorage.date).getTime()) < oneDayInMilliseconds) {
    console.log('Obteniendo detalle del podcast desde localStorage');
    return podcastFromLocalStorage.data.filter((podcast: any) => podcast.title.toLowerCase().includes(filter.toLowerCase()) || podcast.autor.toLowerCase().includes(filter.toLowerCase()) || podcast.id.includes(filter));
  } else {

    return await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')}`)
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
        localStorage.setItem('podcasts', JSON.stringify({
          data: mappedPodcasts,
          date: new Date()
        }));
        return mappedPodcasts;
      });
  }
}