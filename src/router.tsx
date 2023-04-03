import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";

const App = lazy(() => import('./App'));
const Episode = lazy(() => import('./components/Episode/episode').then(module => ({ default: module.Episode })));
const PodcastDetail = lazy(() => import('./components/Podcast/podcastDetail').then(module => ({ default: module.PodcastDetail })));
const PodcastLayout = lazy(() => import('./components/Podcast/podcastLayout').then(module => ({ default: module.PodcastLayout })));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<div>Loading...</div>}><App /></Suspense>,
      },
      {
        path: "podcast/:podcastId",
        element: <Suspense fallback={<div>Loading...</div>}><PodcastLayout /></Suspense>,
        children: [{
          path: "",
          element: <Suspense fallback={<div>Loading...</div>}><PodcastDetail /></Suspense>
        }, {
          path: "episode/:episodeId",
          element: <Suspense fallback={<div>Loading...</div>}><Episode /></Suspense>
        }]
      }
    ]
  }
]);
