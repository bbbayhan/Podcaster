import { StorageDetailService } from '../domain/storageService';
import { PodcastDetail } from '../domain/podcastDetail';
import { checkIfPassedOneDay } from '../utils/formatHelpers';
import { PodcastDetailDTO } from './podcastDetail.dto';

export class PodcastDetailStorageService implements StorageDetailService<{ podcastDetails: PodcastDetail[], resultCount: number }> {
    async get(podcastId: string): Promise<{ podcastDetails: PodcastDetail[], resultCount: number }> {
        const data = localStorage.getItem(`podcast-${podcastId}`);

        if (!data) throw new Error('no items');

        const parsedData = JSON.parse(data);
        if (!checkIfPassedOneDay(parsedData.date)) throw new Error('outdated data')

        return parsedData.data.map(PodcastDetailDTO.fromStorage);
    }

    async set(values: { podcastDetails: PodcastDetail[], resultCount: number }, podcastId: string): Promise<void> {
        const mappedPodcastDetails = values.podcastDetails.map((val: PodcastDetail) => PodcastDetailDTO.toStorage(val))
        const count = values.resultCount;
        localStorage.setItem(`podcast-${podcastId}`, JSON.stringify({
            data: { count, mappedPodcastDetails },
            date: new Date()
        }))
    }
}