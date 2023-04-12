import { StorageDetailService } from '../domain/storageService';
import { HTTPDetailService } from '../domain/httpService';
import { PodcastDetailService } from './podcast-detail.service';
import { PodcastDetail } from '../domain/podcastDetail';
import { podcastDetailJSONFixture } from '../infrastructure/fixtures';
import { mock, instance, reset, verify, when } from 'ts-mockito';
import { PodcastDetailDTO } from '../infrastructure/podcastDetail.dto';

const MockHttpService = mock<HTTPDetailService<{ podcastDetails: PodcastDetail[], resultCount: number }>>()
const MockStorageService = mock<StorageDetailService<{ podcastDetails: PodcastDetail[], resultCount: number }>>()

describe('PodcastDetailService', () => {
    let storage: StorageDetailService<{ podcastDetails: PodcastDetail[], resultCount: number }>;
    let http: HTTPDetailService<{ podcastDetails: PodcastDetail[], resultCount: number }>;

    beforeEach(() => {
        storage = instance(MockStorageService);
        http = instance(MockHttpService);
    });

    afterEach(() => {
        reset(MockStorageService);
        reset(MockHttpService);
    })

    it('should return data from storage', async () => {
        when(MockStorageService.get('1')).thenResolve({ podcastDetails: podcastDetailJSONFixture.map(PodcastDetailDTO.fromStorage), resultCount: 1 })
        const result = await PodcastDetailService('1', storage, http)
        verify(MockStorageService.get('1')).called()
        verify(MockHttpService.get('1')).never()
        expect(result.resultCount).toBe(1)
    })

    it('should return data from http', async () => {
        const data = podcastDetailJSONFixture.map(PodcastDetailDTO.fromStorage)
        when(MockStorageService.get('1')).thenReject()
        when(MockHttpService.get('1')).thenResolve({ podcastDetails: data, resultCount: 1 })
        const result = await PodcastDetailService('1', storage, http)
        verify(MockHttpService.get('1')).called()
        verify(MockStorageService.set(result, '1')).called()
        expect(result.resultCount).toBe(1)
    })
});