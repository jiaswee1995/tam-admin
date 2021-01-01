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

export const postGetMemberOTP = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/otp/memberotp', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_MEM_OTP,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_MEM_OTP,
            payload: error.response.data
        });

    });
};


export const postGenerateOTP = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/member/otp/generate', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_MEM_OTP,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_MEM_OTP,
            payload: error.response.data
        });

    });
};


export const postOTPTypeList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/otp/list', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_OTP_TYPE_LIST,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_OTP_TYPE_LIST,
            payload: error.response.data
        });

    });
};