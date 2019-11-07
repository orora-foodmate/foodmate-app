import { useReducer } from 'reinspect';

class globalDispatcherClass {
  constructor() {
    this._dispatch = null;
  }

  getDispatch() {
    return this._dispatch;
  }
  
  setDispatch(dispatch) {
    this._dispatch = dispatch;
  }
}

export const globalDispatcher = new globalDispatcherClass();


export default (reducer, initialState) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    undefined,
    'foodmate-store'
  );

  const thunkDispatch = action => {
    const { promise, types, ...rest } = action;
    if (!promise) return dispatch(action);

    const [REQUEST, SUCCESS, ERROR] = types;
    dispatch({ ...rest, type: REQUEST });

    return promise
      .then(result => {
        dispatch({ ...rest, result, type: SUCCESS })
      })
      .catch(error => {
        dispatch({ ...rest, error, type: ERROR })
      });
  };

  return [state, thunkDispatch];
};


export const makeLocalReducer = (reducer, initialState, initFunction, id) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    initFunction,
    id
  );

  const thunkDispatch = action => {
    const { promise, types, successMessage, errorMessage, ...rest } = action;
    if (!promise) return dispatch(action);

    const [REQUEST, SUCCESS, ERROR] = types;
    const globalDispatch = globalDispatcher.getDispatch();

    dispatch({ ...rest, type: REQUEST });

    return promise
      .then(result => {
        dispatch({ ...rest, result, type: SUCCESS });
        if (!isEmpty(successMessage)) {
          globalDispatch({ type: 'OPEN_GLOBAL_DIALOG', message: successMessage });
        }
      })
      .catch(error => {
        dispatch({ ...rest, error, type: ERROR });
        if (!isEmpty(errorMessage)) {
          globalDispatch({ type: 'OPEN_GLOBAL_DIALOG', message: errorMessage });
        }
          
      });
  };

  return [state, thunkDispatch];
};
