
import {getUrl} from './libs/route';
import { fetchBasicToken } from './libs/fetch';
import {basicToken} from '../helpers/authHelpers';

console.log(`TCL: getTokenResult -> getUrl('oauth/token')`, getUrl('oauth/token'))
export const getTokenResult = async ({remember, ...payload}) => {
console.log('TCL: getTokenResult -> payload', payload)

  try {
    const resp = await fetchBasicToken(getUrl('oauth/token'), { Authorization: basicToken}, payload);
    console.log('TCL: getTokenResult -> resp', resp)
    const {ok, result} = resp;
    console.log('TCL: getTokenResult -> result', result)
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
