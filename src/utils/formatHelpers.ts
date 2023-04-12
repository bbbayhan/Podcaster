const oneDayInMilliseconds = 86400000;

export const formatStringToDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB');
};

export const formatNumberToMinutes = (trackTimeMillis: number) => {
  const trackTimeSeconds = Math.floor(trackTimeMillis / 1000);
  const minutes = Math.floor(trackTimeSeconds / 60);
  const seconds = trackTimeSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

export const checkIfPassedOneDay = (localStorageDate: string) => {
  return (
    new Date().getTime() - new Date(localStorageDate).getTime() <
    oneDayInMilliseconds
  );
};
