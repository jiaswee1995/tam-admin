import * as type from './types';
import axios from 'axios';

/**
 *
 * @summary GET Admin Downline Data
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

export const postConvertList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/wallet/convert/list', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_CONVERT_LIST,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_CONVERT_LIST,
            payload: error.response.data
        });

    });
};

export const postTransferList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/wallet/transfer/list', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
        }
    }).then( (response) => {
        dispatch ({
            type: type.POST_TRANSFER_LIST,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_TRANSFER_LIST,
            payload: error.response.data
        });

    });
};


export const postCycleList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/comm/cyc', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
        }
    }).then( (response) => {
        dispatch ({
            type: type.POST_CYCLE_LIST,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_CYCLE_LIST,
            payload: error.response.data
        });

    });
};
