import { HTTPService } from '../domain/httpService';
import { Podcast } from '../domain/podcast';
import { PodcastDTO } from './podcast.dto';

export class PodcastListHttpService implements HTTPService<Podcast> {
    async get(): Promise<Podcast[]> {
        return await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(
            'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
        )}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(data => {
                const podcasts = JSON.parse(data.contents).feed.entry
                return podcasts.map(PodcastDTO.fromHttp);
            });
    }
}
