import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postIsAuthenticated = createReducer(initialState) ({

    [type.POST_ISAUTHENTICATED]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

});

export default postIsAuthenticated;