import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postAdminList= createReducer(initialState) ({

    [type.POST_ADMINLIST]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

    [type.POST_ADMINDETAIL]: (state, action) => ({
        ...state,
        detail_data: action.payload,
    }),

    [type.POST_ADMINUPDATE]: (state, action) => ({
        ...state,
        update_data: action.payload,
    })

});

export default postAdminList;