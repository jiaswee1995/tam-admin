import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postAdjustment = createReducer(initialState) ({

    [type.POST_ADJUSTMENT]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

});

export default postAdjustment;