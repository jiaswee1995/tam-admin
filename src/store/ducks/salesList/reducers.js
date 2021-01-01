import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postSalesList= createReducer(initialState) ({

    [type.POST_SALESLIST]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

});

export default postSalesList;