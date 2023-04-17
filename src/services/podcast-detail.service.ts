import { HTTPService } from '../domain/httpService';
import { StorageService } from '../domain/storageService';
import { PodcastDetail } from '../domain/entities/PodcastDetail/podcastDetail';
import { PodcastHttpService } from '../infrastructure/podcast-list.http';
import { PodcastListStorageService } from '../infrastructure/podcast-list.storage';
import { Podcast } from './interfaces';

export const PodcastDetailService = async (
    podcastId: string,
    storage: StorageService<Podcast | { podcastDetails: PodcastDetail[], resultCount: number }> = new PodcastListStorageService(),
    http: HTTPService<Podcast | { podcastDetails: PodcastDetail[], resultCount: number }> = new PodcastHttpService()
) => {
    try {
        const podcasts: Podcast | { podcastDetails: PodcastDetail[], resultCount: number } = await storage.getOne(podcastId);
        return podcasts;
    } catch (e) {
        const podcasts: Podcast | { podcastDetails: PodcastDetail[], resultCount: number } = await http.getOne(podcastId);
        await storage.setOne(podcasts, podcastId);
        return podcasts;
    }
};