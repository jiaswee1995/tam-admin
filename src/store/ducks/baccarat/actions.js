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

export const postGetBacTableList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/baccarat/bacadmin/table/listing', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_BAC_TABLE_LIST,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_BAC_TABLE_LIST,
            payload: error.response.data
        });

    });
};

export const postGetAllBacTable = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/baccarat/bacadmin/table/gettable', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_ALL_BAC_TABLE,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_ALL_BAC_TABLE,
            payload: error.response.data
        });

    });
};

export const postGetBacBetTrans = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/baccarat/bacadmin/report/bac-trans', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_BAC_TRANS,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_BAC_TRANS,
            payload: error.response.data
        });

    });
};

export const postGetBacBetTransDetail = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/baccarat/bacadmin/report/trans-detail', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_BAC_TRANS_DET,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_BAC_TRANS_DET,
            payload: error.response.data
        });

    });
};

export const postGetBacTablePayRate = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/baccarat/bacadmin/report/table-pay-rate', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_BAC_PAY_RATE,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_BAC_PAY_RATE,
            payload: error.response.data
        });

    });
};


export const postGetBacTable = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/baccarat/bacadmin/table/get', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_GET_TABLE,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_GET_TABLE,
            payload: error.response.data
        });

    });
};

export const postEditBacTable = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/baccarat/bacadmin/table/edit', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_EDIT_BAC_TABLE,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_EDIT_BAC_TABLE,
            payload: error.response.data
        });

    });
};
