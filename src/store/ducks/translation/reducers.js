import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postTranslationList= createReducer(initialState) ({

    [type.POST_TRANSLATIONLIST]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

    [type.POST_TRANSLATIONADD]: (state, action) => ({
        ...state,
        add_data: action.payload,
    }),

    [type.POST_TRANSLATIONUPDATE]: (state, action) => ({
        ...state,
        update_data: action.payload,
    }),

});

export default postTranslationList;