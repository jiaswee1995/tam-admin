import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const postMemberList= createReducer(initialState) ({

    [type.GET_MEMBER_GENEOLOGY]: (state, action) => ({
        ...state,
        data: action.payload,
    }),

});

export default postMemberList;