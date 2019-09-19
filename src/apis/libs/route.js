import Config from 'react-native-config';
console.log('TCL: Config.REACT_APP_DOMAIN', Config)

const {REACT_APP_DOMAIN} = Config;
export const getUrl = (endpoint) => `${REACT_APP_DOMAIN}${endpoint}`;