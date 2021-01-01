import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postMemberList= createReducer(initialState) ({

    [type.GET_USER_MENU_LIST]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

    [type.POST_GROUP_MENU]: (state, action) => ({
        ...state,
        post_data: action.payload,
    }),

    [type.GET_MENU_DETAIL]: (state, action) => ({
        ...state,
        menu_data: action.payload,
    }),

    [type.POST_SIDEBAR_MENU]: (state, action) => ({
        ...state,
        sidebar_data: action.payload,
    }),

});

export default postMemberList;