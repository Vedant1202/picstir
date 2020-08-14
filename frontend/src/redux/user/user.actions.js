/** @format */

import { UserActionTypes } from './user.types';

const setCurrentUser = user => {
    return {
        type: UserActionTypes.SET_CURRENT_USER,
        payload: user,
    };
};

const removeCurrentUser = () => {
    return {
        type: UserActionTypes.REMOVE_CURRENT_USER,
        payload: null,
    };
};

export { setCurrentUser, removeCurrentUser };
