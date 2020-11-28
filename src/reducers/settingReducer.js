import types from '../constants/actionTypes';
import { settingState } from './initialState';

export default function reducer(setting = settingState, { type, payload }) {
  switch (type) {
    case types.REGISTER_WEBSOCKET_SUCCESS:
      return setting.merge(payload);
    case types.INITIAL_APP_SUCCESS:
      return setting.merge({ isInitialed: true, ...payload });
    case types.INITIAL_APP:
      case types.REGISTER_WEBSOCKET:
        case types.REGISTER_WEBSOCKET_ERROR:
    case types.INITIAL_APP_ERROR:
    default:
      return setting;
  }
}
