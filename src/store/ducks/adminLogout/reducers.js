import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postAdminLogout= createReducer(initialState) ({

    [type.POST_ADMINLOGOUT]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

});

export default postAdminLogout;