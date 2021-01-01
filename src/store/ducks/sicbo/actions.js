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

export const postGetSicboTableList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/sicbo/table/listing', data, {
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

export const postGetSicboTableDetail = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/sicbo/table/get', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_TABLE_DET,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_TABLE_DET,
            payload: error.response.data
        });

    });
};


export const postEditSicboTableDetail = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/sicbo/table/edit', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_EDIT_DET,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_EDIT_DET,
            payload: error.response.data
        });

    });
};

export const postGetAllTableList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/sicbo/sicboadmin/gettable', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_ALL_SIC_TABLE,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_ALL_SIC_TABLE,
            payload: error.response.data
        });

    });
};

export const postGetSicboBetTrans = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/sicbo/sicboadmin/report/sicbo-trans', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_SICBO_BET_TRANS,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_SICBO_BET_TRANS,
            payload: error.response.data
        });

    });
};


export const postGetTablePayRate = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/sicbo/sicboadmin/report/table-pay-rate', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_SIC_PAY_RATE,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_SIC_PAY_RATE,
            payload: error.response.data
        });

    });
};

export const getBetTransDetail = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/sicbo/sicboadmin/report/trans-detail', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_SIC_TRANS_DETAIL,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_SIC_TRANS_DETAIL,
            payload: error.response.data
        });

    });
};