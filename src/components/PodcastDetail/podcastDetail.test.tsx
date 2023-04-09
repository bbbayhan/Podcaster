import { render, screen } from '@testing-library/react';
import { PodcastDetail } from './podcastDetail';
import { vi } from 'vitest';
import { usePodcastDetail } from '../../hooks/usePodcastDetail';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(() => ({ podcastId: '1234' })),
  NavLink: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
  Outlet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('../../hooks/usePodcastDetail', () => ({
  usePodcastDetail: vi.fn(() => ({
    episodeCount: 2,
    episodes: [
      {
        id: '123',
        title: 'Episode 1',
        date: '2022-04-01',
        duration: 300000,
        description: 'Episode 1 description',
        audio: 'http://audio.com/episode1.mp3',
      },
      {
        id: '456',
        title: 'Episode 2',
        date: '2022-04-02',
        duration: 360000,
        description: 'Episode 2 description',
        audio: 'http://audio.com/episode2.mp3',
      },
    ],
  })),
}));

describe('PodcastDetail', () => {

  beforeEach(() => {
    render(<PodcastDetail />)
  });

  it('should render the correct episode count', () => {
    expect(screen.getByTestId('episode-count')).toBeInTheDocument();
  });

  it('should render the episode title', () => {
    const titleElement = screen.getByTestId('episode-title-123')

    expect(titleElement).toBeInTheDocument()
  })

  it('should render the episode released date', () => {
    const releasedDateElement = screen.getByTestId('episode-date-123')

    expect(releasedDateElement).toBeInTheDocument()
  });

  it('should render the episode duration', () => {
    const durationElement = screen.getByTestId('episode-duration-123')

    expect(durationElement).toBeInTheDocument()
  });
});
