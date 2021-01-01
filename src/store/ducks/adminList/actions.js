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

export const postAdminList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/list', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_ADMINLIST,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_ADMINLIST,
            payload: error.response.data
        });

    });
};

export const postAdminDetail = (data) => dispatch => {
    axios.put(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/detail', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       },
       params: {
           'email': data
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_ADMINDETAIL,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_ADMINDETAIL,
            payload: error.response.data
        });

    });
};

export const postAdminUpdate = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/update', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_ADMINUPDATE,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_ADMINUPDATE,
            payload: error.response.data
        });

    });
};
