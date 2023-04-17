import { HTTPService } from '../domain/httpService';
import { Podcast } from '../domain/entities/Podcast/podcast';
import { PodcastDTO } from './podcast.dto';
import { PodcastDetail } from '../domain/entities/PodcastDetail/podcastDetail';
import { PodcastDetailDTO } from './podcastDetail.dto';
export class PodcastHttpService implements HTTPService<Podcast | { podcastDetails: PodcastDetail[], resultCount: number }> {
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
    async getOne(podcastId: string): Promise<{ podcastDetails: PodcastDetail[], resultCount: number }> {
        return await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(data => {
                const podcastDetails = JSON.parse(data.contents)

                const resultCount = podcastDetails.resultCount
                const podcastDetailsFromHTTP = podcastDetails.results.map(PodcastDetailDTO.fromHttp)

                return { podcastDetails: podcastDetailsFromHTTP, resultCount: resultCount };
            });
    }
}
