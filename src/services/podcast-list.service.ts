import { HTTPService } from '../domain/httpService';
import { StorageService } from '../domain/storageService';
import { PodcastListHttpService } from '../infrastructure/podcast-list.http';
import { PodcastListStorageService } from '../infrastructure/podcast-list.storage';
import { Podcast } from './interfaces';

export const PodcastListService = async (
  storage: StorageService<Podcast> = new PodcastListStorageService(),
  http: HTTPService<Podcast> = new PodcastListHttpService()
) => {
  try {
    const podcasts: Podcast[] = await storage.get();
    return podcasts;
  } catch (e) {
    const podcasts: Podcast[] = await http.get();
    await storage.set(podcasts);
    return podcasts;
  }
};
