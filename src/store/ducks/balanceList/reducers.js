import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postBalanceList= createReducer(initialState) ({

    [type.POST_BALANCELIST]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

});

export default postBalanceList;