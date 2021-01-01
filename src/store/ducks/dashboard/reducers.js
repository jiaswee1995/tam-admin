import * as type from './types';
import { createReducer } from "../../util/index";

const initialState = {
    data: [],
};

const getDashboardSales = createReducer(initialState) ({

    [type.GET_DASHBOARD_SALES]: (state, action) => ({
        ...state,
        data: action.payload,
    }),
    [type.GET_DASHBOARD_SICBO_SALES]: (state, action) => ({
        ...state,
        sic_data: action.payload,
    }),
    [type.GET_DASHBOARD_SLOT_SALES]: (state, action) => ({
        ...state,
        slot_data: action.payload,
    }),
    [type.GET_DASHBOARD_ROUL_SALES]: (state, action) => ({
        ...state,
        roul_data: action.payload,
    }),

});

export default getDashboardSales;