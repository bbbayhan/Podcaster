import { renderHook } from '@testing-library/react-hooks';
import { usePodcasts } from './usePodcasts';
import { getPodcastsFromService } from '../services/podcasts';
import { vi } from 'vitest';

vi.mock('../services/podcasts');

describe('usePodcasts', () => {
  it('should return mappedpodcasts', async () => {
    const testPodcasts = [
      {
        id: '1',
        title: 'Test Podcast 1',
        description: 'A test podcast',
        autor: 'Test Author 1',
        imageSource: 'https://example.com/image1.jpg',
      },
      {
        id: '2',
        title: 'Test Podcast 2',
        description: 'Another test podcast',
        autor: 'Test Author 2',
        imageSource: 'https://example.com/image2.jpg',
      },
    ];

    getPodcastsFromService.mockResolvedValue(testPodcasts);

    const { result, waitForNextUpdate } = renderHook(() =>
      usePodcasts({ debouncedFilter: 'test' }),
    );

    await waitForNextUpdate();

    expect(result.current).toEqual({
      mappedPodcasts: testPodcasts,
    });
  });
});
