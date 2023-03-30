import { createBrowserRouter } from "react-router-dom";
import App from './App';
import { Episode } from './components/Episode/episode';
import { PodcastDetail } from './components/Podcast/podcastDetail';
import { PodcastLayout } from './components/Podcast/podcastLayout';
import { Layout } from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "podcast/:podcastId",
        element: <PodcastLayout />,
        children: [{
          path: "",
          element: <PodcastDetail />
        }, {
          path: "episode/:episodeId",
          element: <Episode />
        }]
      }
    ]
  }
]);
