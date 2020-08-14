/** @format */

import { MessagesActionTypes } from './messages.types';

const INITIAL_STATE = {
    messages: [],
};

const messagesReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case MessagesActionTypes.SET_CURRENT_MESSAGES:
            return {
                ...state,
                messages: payload,
            };

        default:
            return state;
    }
};

export default messagesReducer;
