import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postStatement= createReducer(initialState) ({

    [type.POST_BAC_TABLE_LIST]: (state, action) => ({
        ...state,
        table_list: action.payload,
    }),
    [type.POST_ALL_BAC_TABLE]: (state, action) => ({
        ...state,
        all_bac_table: action.payload,
    }),
    [type.POST_BAC_TRANS]: (state, action) => ({
        ...state,
        bac_bet_trans: action.payload,
    }),
    [type.POST_BAC_TRANS_DET]: (state, action) => ({
        ...state,
        bac_bet_detail: action.payload,
    }),
    [type.POST_BAC_PAY_RATE]: (state, action) => ({
        ...state,
        bac_pay_rate: action.payload,
    }),
    [type.POST_GET_TABLE]: (state, action) => ({
        ...state,
        bac_table: action.payload,
    }),
    [type.POST_EDIT_BAC_TABLE]: (state, action) => ({
        ...state,
        edit_bac_table: action.payload,
    }),
});

export default postStatement;