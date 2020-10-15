import Config from '~/constants/envConfig';

export const getUrl = (endpoint) => `${Config.DOMAIN}${endpoint}`;