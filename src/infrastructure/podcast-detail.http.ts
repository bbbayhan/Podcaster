import { HTTPDetailService } from '../domain/httpService';
import { PodcastDetail } from '../domain/podcastDetail';
import { PodcastDetailDTO } from './podcastDetail.dto';

export class PodcastDetailHttpService implements HTTPDetailService<{ podcastDetails: PodcastDetail[], resultCount: number }> {
    async get(podcastId: string): Promise<{ podcastDetails: PodcastDetail[], resultCount: number }> {
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
