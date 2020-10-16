import constants from 'flux-constants';

const syncActionTypes = [
  'SET_LOGIN_USER',
];

const basicAsyncActionTypes = [
  'LOGIN',
  'LOGOUT',
  'INITIAL_APP',
  'GET_FRIENDS',
  'GET_ROOMS',
  'GET_MESSAGES',
  'ADD_MESSAGE',
  'ADD_MESSAGE_BY_WEBSOCKET',
];

const asyncActionTypes = basicAsyncActionTypes.reduce((result, actionType) => {
  return [
    ...result,
    actionType,
    `${actionType}_SUCCESS`,
    `${actionType}_ERROR`
  ];
}, []);

export default constants([...asyncActionTypes, ...syncActionTypes]);