import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from 'vitest';
import { PodcastLayout } from "./podcastLayout";

const navigateMock = vi.fn();

vi.mock('react-router-dom', () => ({
    useLocation: vi.fn(() => ({ pathname: '/podcasts/123' })),
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
  it("renders the podcast information when there are podcasts", () => {

    render(<PodcastLayout />);

    expect(screen.getByAltText("Hot air balloons")).toBeInTheDocument();
    expect(screen.getByText("Test podcast")).toBeInTheDocument();
    expect(screen.getByText("Autor: Test author")).toBeInTheDocument();
    expect(screen.getByText("Description: Test description")).toBeInTheDocument();
  });

  it("navigates to the podcast detail page when the article is clicked", () => {
    render(<PodcastLayout />);
    fireEvent.click(screen.getByRole("article"));

    expect(navigateMock).toHaveBeenCalledWith("../podcast/123");
  });
});
