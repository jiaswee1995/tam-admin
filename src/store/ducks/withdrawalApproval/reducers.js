import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postWithdrawalApproval= createReducer(initialState) ({

    [type.POST_WITHDRAWALAPPROVAL]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

    [type.POST_SECONDWITHDRAWALAPPROVAL]: (state, action) => ({
        ...state,
        second_data: action.payload,
    }),

});

export default postWithdrawalApproval;