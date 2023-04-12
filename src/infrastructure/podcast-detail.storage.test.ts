import { vi } from "vitest";
import { PodcastDetail } from "../domain/podcastDetail";
import { podcastDetailJSONFixture } from './fixtures';
import { PodcastDetailStorageService } from "./podcast-detail.storage";
import { StorageDetailService } from "../domain/storageService";

describe('PodcastDetailStorage', () => {
    let sut: StorageDetailService<{ podcastDetails: PodcastDetail[], resultCount: number }>;

    beforeEach(() => {
        sut = new PodcastDetailStorageService()
        vi.clearAllMocks();
    })

    it('should set podcast Detail data', async () => {
        vi.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
        Object.setPrototypeOf(window.localStorage.setItem, vi.fn())
        await sut.set({ podcastDetails: [], resultCount: 1 }, 'track1');
        expect(window.localStorage.setItem).toHaveBeenCalledWith('podcast-track1', expect.any(String))
    });

    it('should throw an error when invalid date', async () => {
        global.Storage.prototype.getItem = vi.fn((val) => JSON.stringify({ data: podcastDetailJSONFixture, date: new Date('1022-03-16') }))
        await expect(() => sut.get('track1')).rejects.toThrowError();
    })

    it('should throw an error when there is no data', async () => {
        global.Storage.prototype.getItem = vi.fn((val) => null)
        await expect(() => sut.get('track1')).rejects.toThrowError();
    })
})