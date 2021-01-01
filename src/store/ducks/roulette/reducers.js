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
    [type.POST_WHEEL_SETTING]: (state, action) => ({
        ...state,
        wheel_detail: action.payload,
    }),
    [type.POST_EDIT_WHEEL]: (state, action) => ({
        ...state,
        edit_wheel: action.payload,
    }),
    [type.POST_ROUL_BET_TRANS]: (state, action) => ({
        ...state,
        roul_bet_trans: action.payload,
    }),
    [type.POST_ALL_ROUL_WHEEL]: (state, action) => ({
        ...state,
        all_roul_wheel: action.payload,
    }),
    [type.POST_ROUL_BET_TRANS_DET]: (state, action) => ({
        ...state,
        roul_bet_detail: action.payload,
    }),
    [type.POST_ROUL_PAY_RATE]: (state, action) => ({
        ...state,
        roul_pay_rate: action.payload,
    }),
});

export default postStatement;