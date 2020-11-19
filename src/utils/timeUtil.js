import formatDate from 'date-fns/format';
import isDate from 'lodash/isDate';
import {zhTW} from 'date-fns/locale';

export const format = (date, formatText) => {
  let value = isDate(date) ? date : new Date(date);
  return formatDate(value, formatText, {locale: zhTW});
};
