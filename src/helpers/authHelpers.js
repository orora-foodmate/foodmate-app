import { Base64 } from 'js-base64';

export const encodeAuthBasicToken = (code) => Base64.encode(code);

