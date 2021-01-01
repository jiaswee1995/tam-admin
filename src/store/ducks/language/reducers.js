import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postLanguage= createReducer(initialState) ({
    [type.GET_LANGUAGE]: (state, action) => ({
        ...state,
        lang : action.payload,
    })
});

export default postLanguage;