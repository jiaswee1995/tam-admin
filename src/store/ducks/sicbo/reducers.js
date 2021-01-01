import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postStatement= createReducer(initialState) ({

    [type.POST_TABLE_LISTING]: (state, action) => ({
        ...state,
        table_list: action.payload,
    }),
    [type.POST_TABLE_DET]: (state, action) => ({
        ...state,
        table_det: action.payload,
    }),
    [type.POST_EDIT_DET]: (state, action) => ({
        ...state,
        table_det: action.payload,
    }),
    [type.POST_ALL_SIC_TABLE]: (state, action) => ({
        ...state,
        sic_table: action.payload,
    }),
    [type.POST_SICBO_BET_TRANS]: (state, action) => ({
        ...state,
        sic_bet_trans: action.payload,
    }),
    [type.POST_SIC_PAY_RATE]: (state, action) => ({
        ...state,
        sic_pay_rate: action.payload,
    }),
    [type.POST_SIC_TRANS_DETAIL]: (state, action) => ({
        ...state,
        sic_trans_detail: action.payload,
    }),
});

export default postStatement;