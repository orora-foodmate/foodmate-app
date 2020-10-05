import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware({});

  const middlewares = [sagaMiddleware];

  if (__DEV__) {
    // eslint-disable-line
    const createDebugger = require('redux-flipper').default;
    const createFlipperMiddleware = require('rn-redux-middleware-flipper').default;

    middlewares.push(createDebugger());
    middlewares.push(createFlipperMiddleware());
  }

  
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares))
  );

  if (__DEV__) {
    var acceptCallback = () => {
      const nextRootReducer = combineReducers(require('../reducers/index'));
      store.replaceReducer(nextRootReducer);
    }
  
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/index', acceptCallback);
    module.hot._acceptCallback = acceptCallback;

    // module.hot.accept('../reducers', () => {
    //   const nextRootReducer = require('../reducers/index').default;
    //   store.replaceReducer(nextRootReducer);
    // });
  }
  return {
    ...store,
    runSaga: sagaMiddleware.run(rootSaga)
  };
};

const store = configureStore();

export default store;
