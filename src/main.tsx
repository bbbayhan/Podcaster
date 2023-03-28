import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App'
import { Episode } from './components/episode';
import { Podcast } from './components/podcast';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "podcast/:podcastId",
    element: <Podcast />,
    children:[{
      path:  "episode/:episodeId",
      element: <Episode />,
    }]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)