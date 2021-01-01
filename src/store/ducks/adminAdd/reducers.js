import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postAddAdmin= createReducer(initialState) ({

    [type.POST_ADDADMIN]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

    [type.POST_USERGROUP]: (state, action) => ({
        ...state,
        user_data: action.payload,
    }),

});

export default postAddAdmin;