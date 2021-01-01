import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postResetMember= createReducer(initialState) ({

    [type.POST_RESETMEMBER]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

});

export default postResetMember;