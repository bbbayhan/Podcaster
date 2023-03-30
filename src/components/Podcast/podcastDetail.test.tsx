import { render, screen } from '@testing-library/react';
import { PodcastDetail } from './podcastDetail';
import { vi } from 'vitest';

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
  it('renders the correct episode count', () => {
    render(<PodcastDetail />);
    expect(screen.getByText('Episodes: 2')).toBeInTheDocument();
  });

  it('renders the correct episode details', () => {
    render(<PodcastDetail />);
    expect(screen.getByText('Episode 1')).toBeInTheDocument();
    expect(screen.getByText('Episode 2')).toBeInTheDocument();
    expect(screen.getByText('2022-04-01')).toBeInTheDocument();
    expect(screen.getByText('2022-04-02')).toBeInTheDocument();
  });
});
