import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Podcast } from '../../services/interfaces';
import { Podcasts } from './podcasts';

const navigateMock = vi.fn();

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(() => ({ podcastId: '123' })),
  useNavigate: vi.fn(() => navigateMock),
  Outlet: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('Podcasts', () => {
  const mockPodcasts: Podcast[] = [
    {
      id: '1',
      title: 'Podcast 1',
      autor: 'Author 1',
      imageSource: 'image1.jpg',
      description: 'description 1',
    },
    {
      id: '2',
      title: 'Podcast 2',
      autor: 'Author 2',
      imageSource: 'image2.jpg',
      description: 'description 2',
    },
  ];

  it('should render a list of podcasts if there are podcasts', () => {
    render(<Podcasts podcasts={mockPodcasts} />);

    const podcastElements = screen.getAllByTestId('podcast-list');
    expect(podcastElements).toHaveLength(mockPodcasts.length);
  });

  it('should render a message if there are no podcasts', () => {
    render(<Podcasts podcasts={[]} />);

    const messageElement = screen.getByTestId('no-results-message');

    expect(messageElement).toBeInTheDocument();
  });
});
