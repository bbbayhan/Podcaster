import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest';
import { Podcasts } from './podcasts'
import { Podcast } from '../services/podcasts'

describe('Podcasts', () => {
  const mockPodcasts: Podcast[] = [
    { title: 'Podcast 1', autor: 'Author 1', imageSource: 'image1.jpg' },
    { title: 'Podcast 2', autor: 'Author 2', imageSource: 'image2.jpg' },
  ]

  it('renders a list of podcasts if there are podcasts', () => {
    render(<Podcasts podcasts={mockPodcasts} />)

    const podcasts = screen.getAllByRole('article')

    expect(podcasts).toHaveLength(mockPodcasts.length)
  })

  it('renders a message if there are no podcasts', () => {
    render(<Podcasts podcasts={[]} />)

    const messageElement = screen.getByText('There are no podcasts found.')

    expect(messageElement).toBeInTheDocument()
  })
})