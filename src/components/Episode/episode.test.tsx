import { render, screen } from '@testing-library/react';
import { Episode } from './episode';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Episode component', () => {
  const episodeState = {
    title: 'Test Episode',
    description: 'This is a test',
    audio: 'test-audio.mp3',
  };

  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={[{ state: episodeState }]}>
        <Routes>
          <Route path="/" element={<Episode />} />
        </Routes>
      </MemoryRouter>,
    );
  });

  test('should render episode title', () => {
    const title = screen.getByTestId('episode-title');
    expect(title).toBeInTheDocument();
  });
  test('should render episode description', () => {
    const description = screen.getByTestId('episode-description');
    expect(description).toBeInTheDocument();
  });
  test('should render audio', () => {
    const audio = screen.getByTestId('audio-element');
    expect(audio).toHaveAttribute('src', 'test-audio.mp3');
  });
});
