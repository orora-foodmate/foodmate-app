import parseISO from 'date-fns/parseISO';

export const parseISOString = (date) =>
  new Date(parseISO(date)).toISOString()