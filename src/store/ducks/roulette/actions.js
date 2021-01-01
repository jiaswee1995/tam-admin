import * as type from './types';
import axios from 'axios';

/**
 *
 * @summary GET Wallet statement Data
 * @description Obtain admin's downline data with current role.
 *
 * @param {int}     [page=1]        Current page.
 * @param {int}     [limit=10]      Number of records.
 * @param {obj}     [order={}]      Sort with specific columns.
 * @param {string}  [admin_id=""]   Filter with Admin ID.
 * @param {string}  [email=""]      Filter with Email
 *
 * @returns {Function}
 *
 * @author Shewn
 */

export const postGetRoulWheelListing = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/roulette/rouladmin/wheel/listing', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_TABLE_LISTING,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_TABLE_LISTING,
            payload: error.response.data
        });

    });
};

export const postGetRoulWheelDetail = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/roulette/rouladmin/wheel/get', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_WHEEL_SETTING,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_WHEEL_SETTING,
            payload: error.response.data
        });

    });
};

export const postEditRoulWheel = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/roulette/rouladmin/wheel/edit', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_EDIT_WHEEL,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_EDIT_WHEEL,
            payload: error.response.data
        });

    });
};

export const postGetAllRoulWheel = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/roulette/rouladmin/wheel/getwheel', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_ALL_ROUL_WHEEL,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_ALL_ROUL_WHEEL,
            payload: error.response.data
        });

    });
};

export const postGetRoulBetTrans = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/roulette/rouladmin/report/roul-trans', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_ROUL_BET_TRANS,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_ROUL_BET_TRANS,
            payload: error.response.data
        });

    });
};


export const postGetRoulBetTransDetail = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/roulette/rouladmin/report/trans-detail', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_ROUL_BET_TRANS_DET,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_ROUL_BET_TRANS_DET,
            payload: error.response.data
        });

    });
};


export const postGetWheelPayRate = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/roulette/rouladmin/report/wheel-pay-rate', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_ROUL_PAY_RATE,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_ROUL_PAY_RATE,
            payload: error.response.data
        });

    });
};