/** @format */

import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import messagesReducer from './messages/messages.reducer';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
    user: userReducer,
    messages: messagesReducer,
});

const mainReducer = (state = {}, action) => (action.type === 'hydrate' ? action.payload : rootReducer(state, action));

const persistConfig = {
    key: 'picstir2',
    storage: storage,
};

export default persistReducer(persistConfig, mainReducer);
