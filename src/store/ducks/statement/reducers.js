import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postStatement= createReducer(initialState) ({

    [type.POST_STATEMENT]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

    [type.POST_BALANCESUMMARY]: (state, action) => ({
        ...state,
        balance_data: action.payload,
    }),
});

export default postStatement;