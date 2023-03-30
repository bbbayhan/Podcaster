import { render, screen } from '@testing-library/react';
import { Episode } from './episode';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Episode component', () => {
  test('renders episode title, description, and audio', () => {
    const episodeState = {
      title: 'Test Episode',
      description: 'This is a test',
      audio: 'test-audio.mp3',
    };

    render(
      <MemoryRouter initialEntries={[{ state: episodeState }]}>
        <Routes><Route path="/" element={<Episode />} /></Routes>
      </MemoryRouter>
    );

    const title = screen.getByText(/Test Episode/i);
    expect(title).toBeInTheDocument();

    const description = screen.getByText(/This is a test/i);
    expect(description).toBeInTheDocument();

    const audio = screen.getByTestId('audio-element');
    expect(audio).toHaveAttribute('src', 'test-audio.mp3');
  });
});
