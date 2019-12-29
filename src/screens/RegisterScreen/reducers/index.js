import * as types from '../actions/actionTypes';

export const initialState = {
  email: 'horsekit1982@gmail.com',
  phone: '0987654321',
  password: 'a12345678',
  confirmPassword: 'a12345678'
};

const reducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case types.UPDATE_STATE:
      const { key, value } = payload;
      return { ...state, [key]: value };
    default:
      return state;
  }
};

export default reducer;
