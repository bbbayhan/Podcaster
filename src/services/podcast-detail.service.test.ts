import { StorageService } from '../domain/storageService';
import { HTTPService } from '../domain/httpService';
import { PodcastDetailService } from './podcast-detail.service';
import { PodcastDetail } from '../domain/entities/PodcastDetail/podcastDetail';
import { podcastDetailJSONFixture } from '../infrastructure/fixtures';
import { mock, instance, reset, verify, when } from 'ts-mockito';
import { PodcastDetailDTO } from '../infrastructure/podcastDetail.dto';
import { Podcast } from './interfaces';

const MockHttpService = mock<HTTPService<Podcast | { podcastDetails: PodcastDetail[], resultCount: number }>>()
const MockStorageService = mock<StorageService<Podcast | { podcastDetails: PodcastDetail[], resultCount: number }>>()

describe('PodcastDetailService', () => {
    let storage: StorageService<Podcast | { podcastDetails: PodcastDetail[], resultCount: number }>;
    let http: HTTPService<Podcast | { podcastDetails: PodcastDetail[], resultCount: number }>;

    beforeEach(() => {
        storage = instance(MockStorageService);
        http = instance(MockHttpService);
    });

    afterEach(() => {
        reset(MockStorageService);
        reset(MockHttpService);
    })

    it('should return data from storage', async () => {
        when(MockStorageService.getOne('1')).thenResolve({ podcastDetails: podcastDetailJSONFixture.map(PodcastDetailDTO.fromStorage), resultCount: 1 })
        const result = await PodcastDetailService('1', storage, http)
        verify(MockStorageService.getOne('1')).called()
        verify(MockHttpService.getOne('1')).never()
        expect(result.resultCount).toBe(1)
    })

    it('should return data from http', async () => {
        const data = podcastDetailJSONFixture.map(PodcastDetailDTO.fromStorage)
        when(MockStorageService.getOne('1')).thenReject()
        when(MockHttpService.getOne('1')).thenResolve({ podcastDetails: data, resultCount: 1 })
        const result = await PodcastDetailService('1', storage, http)
        verify(MockHttpService.getOne('1')).called()
        verify(MockStorageService.setOne(result, '1')).called()
        expect(result.resultCount).toBe(1)
    })
});