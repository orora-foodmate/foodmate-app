import { useReducer } from 'react';

export default (reducer, initialState) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    undefined,
    'im-app-store'
  );

  const thunkDispatch = action => {
    const { promise, types, ...rest } = action;
    if (!promise) return dispatch(action);

    const [REQUEST, SUCCESS, ERROR] = types;
    dispatch({ ...rest, type: REQUEST });

    return promise
      .then(result => {
      console.log('TCL: result', result)
        dispatch({ ...rest, result, type: SUCCESS })
      })
      .catch(error => {
      console.log('TCL: error', error)
        dispatch({ ...rest, error, type: ERROR })
      });
  };

  return [state, thunkDispatch];
};
