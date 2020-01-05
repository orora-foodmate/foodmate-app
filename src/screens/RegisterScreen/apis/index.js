import { fetchWithoutToken }  from '../../../apis/libs/fetch';
import { getUrl } from '../../../apis/libs/route';

export const createUserResult = async (payload) =>
  fetchWithoutToken(getUrl('users/createUser'), 'POST', payload);
