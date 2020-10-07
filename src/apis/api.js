
import { getUrl } from './libs/route';
import { fetchBasicToken, fetchWithoutToken } from './libs/fetch';

export const loginResult = async (payload) => {
  
  try {
    console.log(1);
    const resp = await fetchWithoutToken(getUrl('login'), 'POST', payload);
    console.log(2);
    const { ok, result } = resp;
    if (!ok) {
      const error = new Error(result.error_description);
      throw error;
    }
    console.log(3);
    return resp
  } catch (error) {
    console.log('loginResult -> error', error)
    throw error;
  }
};

export const getTokenResult = async (payload) => {
  try {
    const resp = await fetchWithoutToken(getUrl('v1/login'), 'POST', payload);
    const { ok, result } = resp;
    if (!ok) {
      const error = new Error(result.error_description);
      throw error;
    }

    return resp
  } catch (error) {
    throw error;
  }
}
