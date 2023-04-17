import { StorageService } from '../domain/storageService';
import { Podcast } from '../domain/entities/Podcast/podcast';
import { checkIfPassedOneDay } from '../utils/formatHelpers';
import { PodcastDTO } from './podcast.dto';
import { PodcastDetail } from '../domain/entities/PodcastDetail/podcastDetail';
import { PodcastDetailDTO } from './podcastDetail.dto';

export class PodcastListStorageService implements StorageService<Podcast | { podcastDetails: PodcastDetail[], resultCount: number }> {
    async get(): Promise<Podcast[]> {
        const data = localStorage.getItem('podcasts');

        if (!data) throw new Error('no items');

        const parsedData = JSON.parse(data);
        if (!checkIfPassedOneDay(parsedData.date)) throw new Error('outdated data')

        return parsedData.data.map(PodcastDTO.fromStorage);
    }

    async set(values: Podcast[]): Promise<void> {
        localStorage.setItem('podcasts', JSON.stringify({
            data: values.map((val) => PodcastDTO.toStorage(val)),
            date: new Date()
        }))
    }

    async getOne(podcastId: string): Promise<{ podcastDetails: PodcastDetail[], resultCount: number }> {
        const data = localStorage.getItem(`podcast-${podcastId}`);

        if (!data) throw new Error('no items');

        const parsedData = JSON.parse(data);
        if (!checkIfPassedOneDay(parsedData.date)) throw new Error('outdated data')

        return { podcastDetails: parsedData.data.mappedPodcastDetails.map(PodcastDetailDTO.fromStorage), resultCount: parsedData.data.count };
    }

    async setOne(values: { podcastDetails: PodcastDetail[], resultCount: number }, podcastId: string): Promise<void> {
        const mappedPodcastDetails = values.podcastDetails.map((val: PodcastDetail) => PodcastDetailDTO.toStorage(val))
        const count = values.resultCount;
        localStorage.setItem(`podcast-${podcastId}`, JSON.stringify({
            data: { count, mappedPodcastDetails },
            date: new Date()
        }))
    }
}


