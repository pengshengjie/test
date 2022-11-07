// import {applyMiddleware, createStore} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
// import rootReducer from './root-reducer';
import rootSaga from './root-saga';

import Auth from "@redux/Auth/reducer";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    Auth,
  },
  middleware: [thunk, sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

// const bindMiddleware = middleware => {
//     if (process.env.NODE_ENV !== 'production') {
//         const {composeWithDevTools} = require('redux-devtools-extension');
//         return composeWithDevTools(applyMiddleware(...middleware));
//     }
//
//     return applyMiddleware(...middleware);
// };
/*
const bindMiddleware = middleware => {
    const {composeWithDevTools} = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
};
*/

// const store = createStore(rootReducer, initialState, bindMiddleware(middlewares));
// sagaMiddleware.run(rootSaga);
export default store;
