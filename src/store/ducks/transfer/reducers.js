import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postTransfer = createReducer(initialState) ({

    [type.POST_TRANSFER]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

});

export default postTransfer;