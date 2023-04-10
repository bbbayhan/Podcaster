import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Podcast } from '../../services/interfaces';
import { ListOfPodcasts } from './listOfPodcasts';

const navigateMock = vi.fn();

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(() => ({ podcastId: '123' })),
  useNavigate: vi.fn(() => navigateMock),
  Outlet: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('ListOfPodcasts', () => {
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

  beforeEach(() => {
    render(<ListOfPodcasts podcasts={mockPodcasts} />);
  });

  it('should render the list of podcasts', () => {
    const podcastElements = screen.getAllByTestId('podcast-list');
    expect(podcastElements).toHaveLength(mockPodcasts.length);
  });

  it('should render the podcast title and author', () => {
    mockPodcasts.forEach(podcast => {
      const titleElement = screen.getByTestId(`podcast-title-${podcast.id}`);
      const authorElement = screen.getByTestId(`podcast-autor-${podcast.id}`);

      expect(titleElement).toBeInTheDocument();
      expect(authorElement).toBeInTheDocument();
    });
  });

  it('should render the podcast image with a circular border', () => {
    const imageElements = screen.getAllByTestId('podcast-image');

    imageElements.forEach(image => {
      expect(image).toBeInTheDocument();
    });
  });
});
