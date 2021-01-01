import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postAdminLogin= createReducer(initialState) ({

    [type.POST_ADMINLOGIN]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

});

export default postAdminLogin;