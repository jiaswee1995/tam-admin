import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postRewardList= createReducer(initialState) ({

    [type.POST_REWARD_LIST]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

    [type.POST_REWARD_STATEMENT]: (state, action) => ({
        ...state,
        statement_data: action.payload,
    })


});

export default postRewardList;