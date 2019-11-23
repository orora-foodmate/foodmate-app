import * as types from "../constants/actionTypes";
import { authState } from "./initialState";

const authReducer = (auth = authState, action) => {
  
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return auth.merge({ isAuth: true });
    case types.LOGIN:
    case types.LOGIN_ERROR:
    default:
      return auth;
  }
};

export default authReducer;
