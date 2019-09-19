import Config from 'react-native-config';
import { Base64 } from 'js-base64';

const {REACT_APP_BASIC_AUTH_USERNAME, REACT_APP_BASIC_AUTH_PASSWORD} = Config;

const encodeAuthBasicToken = () => Base64.encode(`${REACT_APP_BASIC_AUTH_USERNAME}:${REACT_APP_BASIC_AUTH_PASSWORD}`);

module.exports.basicToken = `Basic ${encodeAuthBasicToken()}`;
