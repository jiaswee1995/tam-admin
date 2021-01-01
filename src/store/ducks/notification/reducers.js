import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postNotiList= createReducer(initialState) ({

    [type.POST_NOTILIST]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

    [type.POST_MODULELIST]: (state, action) => ({
        ...state,
        module_data: action.payload,
    }),

    [type.POST_NOTISEND]: (state, action) => ({
        ...state,
        send_data: action.payload,
    }),
    [type.POST_NOTI_SEND]: (state, action) => ({
        ...state,
        noti_send: action.payload,
    }),
    [type.POST_GET_LANGUAGE_LIST]: (state, action) => ({
        ...state,
        lang_list: action.payload,
    }),
    [type.POST_MODULE_LIST]: (state, action) => ({
        ...state,
        module_list: action.payload,
    }),

});

export default postNotiList;