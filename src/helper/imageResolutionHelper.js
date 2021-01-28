import isEmpty from 'lodash/isEmpty';

export const RESOLUTION = {
  SMALL_SQUARE: 's', // 90x90
  BIG_SQUARE: 'b',   // 160x160 square
  SMALL: 't',        // 160x160 Thumbnail
  MEDIUM: 'm',       // 320x320 Thumbnail
  LARGE: 'l',        // 640x640 Thumbnail
  HUG: 'h'           // 1024x1024 Thumbnail
}

export const getResolution = (url = '', type = RESOLUTION.SMALL) => {

  if(isEmpty(url)) return '';
  const preString = url.split('.');
  const extent = preString.pop();
  const fileName = preString.pop();
  const result = [ ...preString, `${fileName}${type}`, extent].join('.');
  return result;
}