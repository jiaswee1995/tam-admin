import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postStatement= createReducer(initialState) ({

    [type.POST_MEM_OTP]: (state, action) => ({
        ...state,
        mem_otp: action.payload,
    }),
    [type.POST_OTP_TYPE_LIST]: (state, action) => ({
        ...state,
        otp_type: action.payload,
    }),
});

export default postStatement;