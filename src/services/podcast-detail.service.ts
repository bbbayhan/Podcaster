import { HTTPDetailService } from '../domain/httpService';
import { StorageDetailService } from '../domain/storageService';
import { PodcastDetailHttpService } from '../infrastructure/podcast-detail.http';
import { PodcastDetailStorageService } from '../infrastructure/podcast-detail.storage';
import { PodcastDetail } from '../domain/podcastDetail';

export const PodcastDetailService = async (
    podcastId: string,
    storage: StorageDetailService<{ podcastDetails: PodcastDetail[], resultCount: number }> = new PodcastDetailStorageService(),
    http: HTTPDetailService<{ podcastDetails: PodcastDetail[], resultCount: number }> = new PodcastDetailHttpService()
) => {
    try {
        const podcasts: { podcastDetails: PodcastDetail[], resultCount: number } = await storage.get(podcastId);
        return podcasts;
    } catch (e) {
        const podcasts: { podcastDetails: PodcastDetail[], resultCount: number } = await http.get(podcastId);
        await storage.set(podcasts, podcastId);
        return podcasts;
    }
};