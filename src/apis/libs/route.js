import Config from '~/constants/envConfig';
console.log("Config", Config)

export const getUrl = (endpoint) => `${Config.DOMAIN}${endpoint}`;