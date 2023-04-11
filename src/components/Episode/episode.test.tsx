import { render, screen } from '@testing-library/react';
import { Episode } from './episode';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../hooks/usePodcastDetail', () => ({
  usePodcastDetail: vi.fn(() => ({
    episodeCount: 1,
    episodes: [
      {
        id: '456',
        title: 'Episode 2',
        date: '2022-04-02',
        duration: 360000,
        description: 'Episode 2 description',
        audio: 'http://audio.com/episode2.mp3'
      }
    ]
  }))
}));

describe('Episode component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/podcast/1234/456']}>
        <Episode />
      </MemoryRouter>
    );
  });

  it('should render episode title', () => {
    const title = screen.getByTestId('episode-title');
    expect(title).toBeInTheDocument();
  });
  it('should render episode description', () => {
    const description = screen.getByTestId('episode-description');
    expect(description).toBeInTheDocument();
  });
  it('should render audio', () => {
    const audio = screen.getByTestId('audio-element');
    expect(audio).toBeInTheDocument();
  });
});
