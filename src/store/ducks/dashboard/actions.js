import * as type from './types';
import axios from 'axios';

export const getDashboardSales = () => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/dashboard', {}, {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
        }
    }).then( (response) => {
        dispatch ({
            type: type.GET_DASHBOARD_SALES,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.GET_DASHBOARD_SALES,
            payload: error.response.data
        });

    });
};


export const getSicboWeeklySales = () => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/sicbo/sicboadmin/dashboard/sicbo-weekly', {}, {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
        }
    }).then( (response) => {
        dispatch ({
            type: type.GET_DASHBOARD_SICBO_SALES,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.GET_DASHBOARD_SICBO_SALES,
            payload: error.response.data
        });

    });
};

export const getSlotWeeklySales = () => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/sicbo/sicboadmin/dashboard/slot-weekly', {}, {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
        }
    }).then( (response) => {
        dispatch ({
            type: type.GET_DASHBOARD_SLOT_SALES,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.GET_DASHBOARD_SLOT_SALES,
            payload: error.response.data
        });

    });
};

export const getRoulWeeklySales = () => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/roulette/rouladmin/dashboard/roul-weekly', {}, {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
        }
    }).then( (response) => {
        dispatch ({
            type: type.GET_DASHBOARD_ROUL_SALES,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.GET_DASHBOARD_ROUL_SALES,
            payload: error.response.data
        });

    });
};
