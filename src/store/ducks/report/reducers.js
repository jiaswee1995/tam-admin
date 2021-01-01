import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postReportList= createReducer(initialState) ({

    [type.POST_CONVERT_LIST]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

    [type.POST_TRANSFER_LIST]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

    [type.POST_CYCLE_LIST]: (state, action) => ({
        ...state,
        cycle_data: action.payload,
    })


});

export default postReportList;