import { HTTPService } from '../domain/httpService';
import { StorageService } from '../domain/storageService';
import { Podcast } from '../domain/entities/Podcast/podcast';
import { PodcastListStorageService } from '../infrastructure/podcast-list.storage';
import { PodcastHttpService } from '../infrastructure/podcast-list.http';
import { PodcastDetail } from '../domain/entities/PodcastDetail/podcastDetail';

export const PodcastListService = async (
  storage: StorageService<Podcast | { podcastDetails: PodcastDetail[], resultCount: number }> = new PodcastListStorageService(),
  http: HTTPService<Podcast | { podcastDetails: PodcastDetail[], resultCount: number }> = new PodcastHttpService()
) => {
  try {
    const podcasts: (Podcast | { podcastDetails: PodcastDetail[], resultCount: number })[] = await storage.get();
    return podcasts;
  } catch (e) {
    const podcasts: (Podcast | { podcastDetails: PodcastDetail[], resultCount: number })[] = await http.get();
    await storage.set(podcasts);
    return podcasts;
  }
};
