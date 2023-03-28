import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest';
import { ListOfPodcasts } from './listOfPodcasts';
import { Podcast } from '../services/podcasts'

describe('ListOfPodcasts', () => {
  const mockPodcasts: Podcast[] = [
    { title: 'Podcast 1', autor: 'Author 1', imageSource: 'image1.jpg' },
    { title: 'Podcast 2', autor: 'Author 2', imageSource: 'image2.jpg' },
  ]

  it('renders the list of podcasts', () => {
    render(<ListOfPodcasts podcasts={mockPodcasts} />)

    const podcastElements = screen.getAllByRole('article')

    expect(podcastElements).toHaveLength(mockPodcasts.length)
  })

  it('renders the podcast title and author', () => {
    render(<ListOfPodcasts podcasts={mockPodcasts} />)

    mockPodcasts.forEach((podcast) => {
      const titleElement = screen.getByText(podcast.title)
      const authorElement = screen.getByText(`Autor: ${podcast.autor}`)

      expect(titleElement).toBeInTheDocument()
      expect(authorElement).toBeInTheDocument()
    })
  })

  it('renders the podcast image with a circular border', () => {
    render(<ListOfPodcasts podcasts={mockPodcasts} />)

    const imageElements = screen.getAllByRole('img')

    imageElements.forEach((image) => {
      expect(image).toHaveStyle({ borderRadius: '50%' })
    })
  })
})