import { initialAppActionTypes } from './constants/actionTypes';
import { getLoginUser } from './store/watermelonHelper';

async function initialPromise() {
  try {
    const loginUser = await getLoginUser();
    return loginUser;
  } catch (error) {
    throw error;
  }
}

export const initialAppAction = () => ({
  types: initialAppActionTypes,
  promise: initialPromise()
});
