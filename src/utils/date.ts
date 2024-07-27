/**
 * Formats a given ISO date string into a human-readable date string.
 *
 * @param {string} isoDate - The ISO date string to format.
 * @return {string} The formatted date string.
 */
export const formatDate = (isoDate: string): string => {
  if (!isoDate) return '';

  const date = new Date(isoDate);

  const options: any = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  };

  const formattedDate = date.toLocaleString('en-US', options);

  return formattedDate;
};

/**
 * Calculates the difference in days between two dates.
 *
 * @param {string} date1 - The first date in ISO string format.
 * @param {string} date2 - The second date in ISO string format.
 * @return {number} The difference in days between the two dates.
 */
export const dateDiff = (date1: string, date2: string) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  //@ts-ignore
  const differenceInTime = d2 - d1;
  return differenceInTime / (1000 * 60 * 60 * 24);
};

/**
 * Returns a label representing the time difference between the current date and the given ISO date.
 *
 * @param {string} isoDate - The ISO date string to compare with the current date.
 * @return {string} The label representing the time difference. Possible values are:
 *   - 'Today' if the difference is 0 days.
 *   - 'Tomorrow' if the difference is 1 day.
 *   - The formatted date if the difference is greater than 1 day.
 *   - The number of days and the appropriate label if the difference is between 1 and 6 days.
 *   - The number of weeks and the appropriate label if the difference is between 7 and 364 days.
 *   - The number of years and the appropriate label if the difference is greater than 364 days.
 */
export const getDateLabel = (isoDate: string): string => {
  const currentDate = new Date().toISOString().split('T')[0];
  const timeDifference = dateDiff(currentDate, isoDate);

  if (timeDifference === 0) {
    return 'Today';
  } else if (timeDifference === 1) {
    return 'Tomorrow';
  } else if (timeDifference > 1) {
    return formatDate(isoDate);
  }

  const absoluteDifference = Math.abs(timeDifference);

  if (absoluteDifference < 7) {
    return `${absoluteDifference} ${absoluteDifference > 1 ? 'days' : 'day'}`;
  }

  const weeks = Math.floor(absoluteDifference / 7);

  if (weeks < 52) {
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
  }

  const years = Math.floor(weeks / 52);

  return `${years} ${years > 1 ? 'years' : 'year'}`;
};
