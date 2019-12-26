
import {getUrl} from './libs/route';
import { fetchBasicToken } from './libs/fetch';
import {basicToken} from '../helpers/authHelpers';

export const getTokenResult = async ({remember, ...payload}) => {

  try {
    const resp = await fetchBasicToken(getUrl('oauth/token'), { Authorization: basicToken}, payload);
    const {ok, result} = resp;
    if(!ok) {
      const error = new Error(result.error_description);
      throw error;
    }
    
    if(remember) localStorage.setItem('im-authReducer', JSON.stringify(result));
    return resp
  }catch(error) {
    throw error;
  }
}
