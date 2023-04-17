import { vi } from "vitest";
import { Podcast } from "../domain/entities/Podcast/podcast";
import { podcastListJSONFixture } from './fixtures';
import { PodcastListStorageService } from "./podcast-list.storage";
import { StorageService } from "../domain/storageService";



describe('PodcastListStorage', () => {
    let sut: StorageService<Podcast>;

    beforeEach(() => {
        sut = new PodcastListStorageService()
        vi.clearAllMocks();
    })

    it('should set podcast list data', async () => {
        vi.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
        Object.setPrototypeOf(window.localStorage.setItem, vi.fn())
        await sut.set([]);
        expect(window.localStorage.setItem).toHaveBeenCalledWith('podcasts', expect.any(String))
    });

    it('should return a podcast list', async () => {
        global.Storage.prototype.getItem = vi.fn((val) => JSON.stringify({ data: podcastListJSONFixture, date: new Date('3022-03-16') }))

        const podcastList = await sut.get();

        expect(podcastList.length).toBe(1);
        expect(podcastList[0]).toBeInstanceOf(Podcast);
    })

    it('should throw an error when invalid date', async () => {
        global.Storage.prototype.getItem = vi.fn((val) => JSON.stringify({ data: podcastListJSONFixture, date: new Date('1022-03-16') }))
        await expect(() => sut.get()).rejects.toThrowError();
    })

    it('should throw an error when there is no data', async () => {
        global.Storage.prototype.getItem = vi.fn((val) => null)
        await expect(() => sut.get()).rejects.toThrowError();
    })
})