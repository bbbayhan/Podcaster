import { PodcastDetail } from '../domain/entities/PodcastDetail/podcastDetail';
import { formatNumberToMinutes, formatStringToDate } from '../utils/formatHelpers';

export class PodcastDetailDTO {
    static fromHttp(json: any): PodcastDetail {
        return new PodcastDetail(
            json.trackId,
            json.trackName,
            formatStringToDate(json.releaseDate),
            formatNumberToMinutes(json.trackTimeMillis),
            json.description,
            json.episodeUrl
        );
    }

    static toStorage(podcastDetail: PodcastDetail): any {
        return {
            id: podcastDetail.id,
            title: podcastDetail.title,
            date: podcastDetail.date,
            duration: podcastDetail.duration,
            description: podcastDetail.description,
            audio: podcastDetail.audio,
        }
    }

    static fromStorage(json: any): PodcastDetail {
        return new PodcastDetail(
            json.id, json.title, json.date, json.duration, json.description, json.audio
        )
    }
}