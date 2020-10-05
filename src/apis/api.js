
import {getUrl} from './libs/route';
import { fetchBasicToken, fetchWithoutToken } from './libs/fetch';

export const loginResult = async (payload) => {
  try {
    const resp = await fetchWithoutToken(getUrl('login'), 'POST', payload);
    const {ok, result} = resp;
    if(!ok) {
      const error = new Error(result.error_description);
      throw error;
    }
    
    return resp
  }catch(error) {
    throw error;
  }
};

export const getTokenResult = async (payload) => {
  try {
    const resp = await fetchWithoutToken(getUrl('v1/login'), 'POST', payload);
    const {ok, result} = resp;
    if(!ok) {
      const error = new Error(result.error_description);
      throw error;
    }
    
    return resp
  }catch(error) {
    throw error;
  }
}
