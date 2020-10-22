import constants from 'flux-constants';

const syncActionTypes = [
  'SET_LOGIN_USER',
];

const basicAsyncActionTypes = [
  'LOGIN',
  'LOGOUT',
  'INITIAL_APP',
  'GET_USER_BY_ID',
  'GET_FRIENDS',
  'GET_MESSAGES',
  'ADD_MESSAGE',
  'ADD_MESSAGE_BY_WEBSOCKET',
  'INVITE_FRIEND_BY_WEBSOCKET',
  'APPROVE_INVITE_FRIEND',
  'INVITE_FRIEND',
  'REJECT_INVITE_FRIEND',
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