import { vi } from "vitest";
import { podcastListFixture } from './fixtures'
import { PodcastListHttpService } from "./podcast-list.http";
import { HTTPService } from "../domain/httpService";
import { Podcast } from "../domain/podcast";

describe('PodcastListHttp', () => {
    const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ contents: JSON.stringify(podcastListFixture) }),
    };
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    let sut: HTTPService<Podcast>;

    beforeEach(() => {
        sut = new PodcastListHttpService()
    })

    it('should be called with the correct url', async () => {
        await sut.get();
        expect(fetch).toHaveBeenCalledWith(
            `https://api.allorigins.win/get?url=${encodeURIComponent(
                'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
            )}`,
        );
    })

    it('should return a podcast list', async () => {
        const podcastList = await sut.get();
        expect(podcastList.length).toBe(1);
        expect(podcastList[0]).toBeInstanceOf(Podcast);
    })

    it('should return a podcast list', async () => {
        const mockResponse = {
            ok: false,
            json: vi.fn().mockResolvedValue({ contents: JSON.stringify(podcastListFixture) }),
        };
        global.fetch = vi.fn().mockResolvedValue(mockResponse);
        await expect(() => sut.get()).rejects.toThrow();
    })
})