import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postBetList= createReducer(initialState) ({

    [type.POST_BETLIST]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

    [type.POST_MECHLIST]: (state, action) => ({
        ...state,
        mech_data: action.payload,
    }),
    [type.POST_SLOT_PAY_RATE]: (state, action) => ({
        ...state,
        slot_pay_rate: action.payload,
    }),


});

export default postBetList;