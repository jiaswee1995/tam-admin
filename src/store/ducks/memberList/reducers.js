import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postMemberList= createReducer(initialState) ({

    [type.POST_MEMBERLIST]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

    [type.POST_MEMBERDETAIL]: (state, action) => ({
        ...state,
        detail_data: action.payload,
    }),

    [type.POST_MEMBERUPDATE]: (state, action) => ({
        ...state,
        update_data: action.payload,
    })


});

export default postMemberList;