import Config from 'react-native-config';
console.log("TCL: Config.DOMAIN", Config)

export const getUrl = (endpoint) => `${Config.DOMAIN}${endpoint}`;