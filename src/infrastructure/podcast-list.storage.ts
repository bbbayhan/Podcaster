import { StorageService } from '../domain/storageService';
import { Podcast } from '../domain/podcast';
import { checkIfPassedOneDay } from '../utils/formatHelpers';
import { PodcastDTO } from './podcast.dto';

export class PodcastListStorageService implements StorageService<Podcast> {
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
}


