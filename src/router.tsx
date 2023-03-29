import { createBrowserRouter } from "react-router-dom";
import App from './App';
import { Episode } from './components/episode';
import { PodcastDetail } from './components/podcastDetail';
import { PodcastLayout } from './components/podcastLayout';
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
