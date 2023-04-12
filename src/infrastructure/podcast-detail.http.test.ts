import { vi } from "vitest";
import { podcastDetailFixture } from './fixtures'
import { PodcastDetailHttpService } from "./podcast-detail.http";
import { HTTPDetailService } from "../domain/httpService";
import { PodcastDetail } from "../domain/podcastDetail";

describe('PodcastDetailHttp', () => {
    const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ contents: JSON.stringify(podcastDetailFixture) }),
    };
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    let sut: HTTPDetailService<{ podcastDetails: PodcastDetail[], resultCount: number }>;

    beforeEach(() => {
        sut = new PodcastDetailHttpService()
    })

    it('should be called with the correct url', async () => {
        await sut.get('track1');
        expect(fetch).toHaveBeenCalledWith(
            `https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${'track1'}&media=podcast&entity=podcastEpisode&limit=20`)}`,
        );
    })

    it('should return a podcast Detail', async () => {
        const podcastDetail = await sut.get('track1');
        console.log(podcastDetail)
        expect(podcastDetail.podcastDetails.length).toBe(1);
    })

    it('should return a podcast Detail', async () => {
        const mockResponse = {
            ok: false,
            json: vi.fn().mockResolvedValue({ contents: JSON.stringify(podcastDetailFixture) }),
        };
        global.fetch = vi.fn().mockResolvedValue(mockResponse);
        await expect(() => sut.get('track1')).rejects.toThrow();
    })
})