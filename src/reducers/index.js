import {createContext} from 'react';
import combineReducer from '../helpers/combineReducer';
import auth from './authReducer';
import setting from './settingReducer';
import globalMessage from './globalMessageReducer';
import initialState from './initialState';

const reducer = combineReducer({
  auth,
  setting,
  globalMessage,
});

export const ReducerContext = createContext(initialState);

export default reducer;
