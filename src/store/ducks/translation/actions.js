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

export const postTranslationList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/translation/list', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_TRANSLATIONLIST,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_TRANSLATIONLIST,
            payload: error.response.data
        });

    });
};

export const postTranslationAdd = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/translation/add', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_TRANSLATIONADD,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_TRANSLATIONADD,
            payload: error.response.data
        });

    });
};

export const postTranslationUpdate = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/translation/update', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_TRANSLATIONUPDATE,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_TRANSLATIONUPDATE,
            payload: error.response.data
        });

    });
};