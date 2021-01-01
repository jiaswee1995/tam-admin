import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postGameSetting= createReducer(initialState) ({

    [type.POST_GAMESETTING]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

    [type.POST_MACHCODE]: (state, action) => ({
        ...state,
        mach_data: action.payload,
    }),

    [type.POST_MACHUPDATE]: (state, action) => ({
        ...state,
        update_data: action.payload,
    }),


});

export default postGameSetting;