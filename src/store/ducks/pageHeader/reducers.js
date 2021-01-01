import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postChangeLanguage= createReducer(initialState) ({

    [type.POST_LANGUAGE]: (state, action) => ({
        ...state,
        data: action.payload,
    })


});

export default postChangeLanguage;