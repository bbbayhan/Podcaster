import { StorageService } from '../domain/storageService';
import { HTTPService } from '../domain/httpService';
import { PodcastListService } from './podcast-list.service';
import { Podcast } from '../domain/podcast';
import { podcastListJSONFixture } from '../infrastructure/fixtures';
import { mock, instance, reset, verify, when, anyString, anything } from 'ts-mockito';
import { PodcastDTO } from '../infrastructure/podcast.dto';

const MockHttpService = mock<HTTPService<Podcast>>()
const MockStorageService = mock<StorageService<Podcast>>()

describe('getPodcastsFromService', () => {
  let storage: StorageService<Podcast>;
  let http: HTTPService<Podcast>;

  beforeEach(() => {
    storage = instance(MockStorageService);
    http = instance(MockHttpService);
  });

  afterEach(() => {
    reset(MockStorageService);
    reset(MockHttpService);
  })

  test('should return data from storage', async () => {
    when(MockStorageService.get()).thenResolve(podcastListJSONFixture.map(PodcastDTO.fromStorage))
    const result = await PodcastListService(storage, http)
    verify(MockStorageService.get()).called()
    verify(MockHttpService.get()).never()
    expect(result.length).toBe(1)
  })

  test('should return data from http', async () => {
    const data = podcastListJSONFixture.map(PodcastDTO.fromStorage)
    when(MockStorageService.get()).thenReject()
    when(MockHttpService.get()).thenResolve(data)
    when(MockStorageService.set(anyString())).thenResolve()
    const result = await PodcastListService(storage, http)
    verify(MockHttpService.get()).called()
    verify(MockStorageService.set(data)).called()
    expect(result.length).toBe(1)
  })
});