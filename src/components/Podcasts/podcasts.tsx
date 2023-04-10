import { Podcast } from '../../services/interfaces';
import { ListOfPodcasts } from '../ListOfPodcasts/listOfPodcasts';
import { NoResultsMessage } from '../NoResultsMessage/noResultsMessage';

export const Podcasts = ({
  podcasts,
}: {
  podcasts: Podcast[];
}): JSX.Element => {
  const hasPodcasts = podcasts?.length > 0;

  return hasPodcasts ? (
    <ListOfPodcasts podcasts={podcasts} />
  ) : (
    <NoResultsMessage />
  );
};
