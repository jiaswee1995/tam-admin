import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
    deposit_data: [],
};

const postDeposit= createReducer(initialState) ({

    [type.POST_DEPOSIT]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

    [type.GET_DEPOSIT_APPROVAL]: (state, action) => ({
        ...state,
        deposit_data: action.payload,
    }),


});

export default postDeposit;