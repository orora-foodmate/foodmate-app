import {createContext} from 'react';
import combineReducer from '../helpers/combineReducer';
import auth from './authReducer';
import setting from './settingReducer';
import initialState from './initialState';

const reducer = combineReducer({
  auth,
  setting
});

export const ReducerContext = createContext(initialState);

export default reducer;
