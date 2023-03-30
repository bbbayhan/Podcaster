import { Podcast } from "../services/interfaces"
import { ListOfPodcasts } from "./listOfPodcasts"
import { NoPodcastsError } from "./noPodcasts"

export const Podcasts = ({ podcasts }: { podcasts: Podcast[] }): JSX.Element => {

  const hasPodcasts = podcasts?.length > 0

  return (
    hasPodcasts
      ? <ListOfPodcasts podcasts={podcasts} />
      : <NoPodcastsError />
  )
}