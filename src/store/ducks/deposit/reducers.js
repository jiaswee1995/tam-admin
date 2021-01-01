import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postDeposit= createReducer(initialState) ({

    [type.POST_DEPOSIT]: (state, action) => ({
        ...state,
        data: action.payload,
    }),


});

export default postDeposit;