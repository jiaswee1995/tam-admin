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

export const postMemberList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/admin/member/list', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_MEMBERLIST,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_MEMBERLIST,
            payload: error.response.data
        });

    });
};

export const postMemberDetail = (data) => dispatch => {
    axios.put(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/member/edit/'+data, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       },
   }).then( (response) => {
        dispatch ({
            type: type.POST_MEMBERDETAIL,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_MEMBERDETAIL,
            payload: error.response.data
        });

    });
};

export const postMemberUpdate = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/member/edit', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       },
   }).then( (response) => {
        dispatch ({
            type: type.POST_MEMBERUPDATE,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_MEMBERUPDATE,
            payload: error.response.data
        });

    });
};
