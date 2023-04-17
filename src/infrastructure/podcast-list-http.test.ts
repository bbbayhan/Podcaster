import { vi } from "vitest";
import { podcastListFixture } from './fixtures'
import { PodcastHttpService } from "./podcast-list.http";
import { HTTPService } from "../domain/httpService";
import { Podcast } from "../domain/entities/Podcast/podcast";
import { PodcastDetail } from "../domain/entities/PodcastDetail/podcastDetail";

describe('PodcastListHttp', () => {
    const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ contents: JSON.stringify(podcastListFixture) }),
    };
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    let sut: HTTPService<Podcast | { podcastDetails: PodcastDetail[], resultCount: number }>;

    beforeEach(() => {
        sut = new PodcastHttpService()
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