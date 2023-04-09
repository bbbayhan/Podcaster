import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from 'vitest';
import { PodcastLayout } from "./podcastLayout";

const navigateMock = vi.fn();

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(() => ({ podcastId: '123' })),
    useNavigate: vi.fn(() => navigateMock),
    Outlet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  }));

vi.mock("../../hooks/usePodcasts", () => ({
  usePodcasts: vi.fn().mockReturnValue({
    mappedPodcasts: [
      {
        id: "123",
        title: "Test podcast",
        autor: "Test author",
        description: "Test description",
        imageSource: "test.png",
      },
    ],
  }),
}));

describe("PodcastLayout", () => {

  beforeEach(() => {
    render(<PodcastLayout />)
  });

  it("should render the podcast image", () => {
    const imageElement = screen.getByTestId('podcast-layout-image')

    expect(imageElement).toBeInTheDocument();
  });

  it("should render the podcast title", () => {
    const titleElement = screen.getByTestId('podcast-layout-title-123')

    expect(titleElement).toBeInTheDocument();
   
  });

  it("should render the podcast autor", () => {
    const autorElement = screen.getByTestId('podcast-layout-autor-123')

    expect(autorElement).toBeInTheDocument();
  });

  it("should render the podcast description", () => {
    const descriptionElement = screen.getByTestId('podcast-layout-description-123')

    expect(descriptionElement).toBeInTheDocument();
  });

  it("should navigate to the podcast detail page when the article is clicked", () => {
    render(<PodcastLayout />);
    fireEvent.click(screen.getAllByTestId("podcast-layout-card")[0]);

    expect(navigateMock).toHaveBeenCalledWith("../podcast/123");
  });

});
