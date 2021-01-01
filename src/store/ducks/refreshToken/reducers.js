import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postRefreshToken = createReducer(initialState) ({

    [type.POST_REFRESH_TOKEN]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

});

export default postRefreshToken;