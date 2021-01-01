import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postDailyList= createReducer(initialState) ({

    [type.POST_DAILYLIST]: (state, action) => ({
        ...state,
        data: action.payload,
    }),


});

export default postDailyList;