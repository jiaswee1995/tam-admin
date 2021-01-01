import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postAddMember= createReducer(initialState) ({

    [type.POST_ADDMEMBER]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

});

export default postAddMember;