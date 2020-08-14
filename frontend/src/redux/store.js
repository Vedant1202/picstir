/** @format */

import { persistStore } from 'redux-persist';
import { MessagesActionTypes } from './messages/messages.types';

const { default: logger } = require('redux-logger');
const { createStore, applyMiddleware } = require('redux');
const { default: mainReducer } = require('./root.reducer');

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const store = createStore(mainReducer, applyMiddleware(...middlewares));

const persistor = persistStore(store);

const rehydrateMessages = payload => {
    store.dispatch({ type: MessagesActionTypes.SET_CURRENT_MESSAGES, payload });
};

export { store, persistor, rehydrateMessages };
