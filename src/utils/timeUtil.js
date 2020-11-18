import formatDate from 'date-fns/format';
import isDate from 'lodash/isDate';
import {zhTW} from 'date-fns/locale';

export const format = (date, formatText) => {
  let value = date;
  if (!isDate(date)) {
    value = new Date(date);
  }
  return formatDate(value, formatText, {locale: zhTW});
};
