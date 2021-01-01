import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postChangePassword= createReducer(initialState) ({

    [type.POST_CHANGEPASSWORD]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

});

export default postChangePassword;