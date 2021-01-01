import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postWithdrawalList= createReducer(initialState) ({

    [type.POST_WITHDRAWLIST]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

    [type.POST_SECONDWITHDRAWLIST]: (state, action) => ({
        ...state,
        second_data: action.payload,
    }),

});

export default postWithdrawalList;