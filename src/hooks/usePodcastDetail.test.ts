import { renderHook } from '@testing-library/react-hooks';
import { usePodcastDetail } from './usePodcastDetail';
import { getPodcastDetailFromService } from '../services/podcastDetails';
import { vi } from 'vitest';

vi.mock('../services/podcastDetails');

describe('usePodcastDetail', () => {
  it('should return episodes and episodeCount', async () => {
    const mockEpisodes = [
      {
        id: '1',
        title: 'Episode 1',
        date: '2022-01-01',
        duration: 3600,
        description: 'Episode 1 description',
        audio: 'episode1.mp3',
      },
      {
        id: '2',
        title: 'Episode 2',
        date: '2022-01-02',
        duration: 3600,
        description: 'Episode 2 description',
        audio: 'episode2.mp3',
      },
    ];

    const mockResultCount = 2;

    getPodcastDetailFromService.mockResolvedValue({
      mappedPodcastDetails: mockEpisodes,
      resultCount: mockResultCount,
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      usePodcastDetail({ podcastId: '1' }),
    );

    await waitForNextUpdate();

    expect(result.current).toEqual({
      episodeCount: mockResultCount,
      episodes: mockEpisodes,
    });
  });
});
