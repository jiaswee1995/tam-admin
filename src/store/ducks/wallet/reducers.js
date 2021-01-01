import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
    balance_data: [],
    arr_data: [],
};

const WalletTypeList = createReducer(initialState) ({

    [type.GET_WALLET_TYPE_LIST]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

    [type.GET_WALLET_BALANCE]: (state, action) => ({
        ...state,
        balance_data: action.payload,
    }),

    [type.GET_WALLET_SETTING]: (state, action) => ({
        ...state,
        arr_data: action.payload,
    }),

    [type.POST_EWT_BLOCK]: (state, action) => ({
        ...state,
        post_data: action.payload,
    }),
    [type.POST_MEM_ADDR_LIST]: (state, action) => ({
        ...state,
        addr_list: action.payload,
    }),

});

export default WalletTypeList;