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

export const postWithdrawalList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/wallet/withdrawal/approval/list', data , {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_WITHDRAWLIST,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_WITHDRAWLIST,
            payload: error.response !== undefined ? error.response.data : error
        });

    });
};

export const postSecondWithdrawalList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/wallet/withdrawal/before/approval/list', data , {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_SECONDWITHDRAWLIST,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_SECONDWITHDRAWLIST,
            payload: error.response !== undefined ? error.response.data : error
        });

    });
};
// axios({
//     method: 'get',
//     url: 'http://127.0.0.1:8000/api/v1/admin/member/list',
//     headers: { 'Content-Type': 'application/json',
//     'Authorization': sessionStorage.getItem("accessToken")}, 
//     data: {
//         "email": data['email'],
//         "contact_no": data['contactNo'],
//     }
//   }).then( (response) => {
//         dispatch ({
//             type: type.POST_MEMBERLIST,
//             payload: response
//         })
//     }).catch (error => {
//         dispatch ({
//             type: type.POST_MEMBERLIST,
//             payload: {"rst":"0","msg":"system_error"}
//         });

//     });;