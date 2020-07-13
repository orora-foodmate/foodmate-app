
import {getUrl} from './libs/route';
import { fetchBasicToken, fetchWithoutToken } from './libs/fetch';

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
    console.log("TCL: getTokenResult -> error", error)
    throw error;
  }
}
