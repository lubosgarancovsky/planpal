export const formatDate = (isoDate: string): string => {
  if (!isoDate) return '';

  const date = new Date(isoDate);

  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  };

  const formattedDate = date.toLocaleString('en-US', options);

  return formattedDate;
};

export const dateDiff = (date1: string, date2: string) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  const differenceInTime = d2 - d1;

  const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);

  return differenceInDays;
};

export const getDateLabel = (isoDate) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const differenceInDays = dateDiff(currentDate, isoDate);

  if (differenceInDays === 0) {
    return 'Today';
  } else if (differenceInDays === 1) {
    return 'Tomorrow';
  } else if (differenceInDays > 1) {
    return formatDate(isoDate);
  } else {
    const absDifference = Math.abs(differenceInDays);

    if (absDifference < 7) {
      return `${absDifference} days`;
    } else {
      const weeks = Math.floor(absDifference / 7);
      if (weeks < 52) {
        return `${weeks} weeks`;
      } else {
        const years = Math.floor(weeks / 52);
        return `${years} years`;
      }
    }
  }
};
