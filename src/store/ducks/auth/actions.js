import * as type from './types';

export const postIsAuthenticated = (authStatus) => dispatch => {
    dispatch ({
        type: type.POST_ISAUTHENTICATED,
        payload: {
            "data": authStatus
        }
    })
};