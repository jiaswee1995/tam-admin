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

export const postDeposit = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/wallet/deposit/list', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_DEPOSIT,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_DEPOSIT,
            payload: error.response.data
        });

    });
};

export const getDepositApprovalList = (res_data) => (dispatch) => {
    axios.get(process.env.REACT_APP_SLOT_URL + '/admin/deposit/approval', {
        params: res_data,
        headers: {
            'X-Authorization': 'INWILGX2OiteEiZBVpPTHiixPBJu8mjA5Bo0ekLnXra8KaK1PbTanAqr0lZic0w1'
        }
    }).then( (response) => {
        dispatch ({
            type: type.GET_DEPOSIT_APPROVAL,
            payload: response
        })
    }).catch (error => {
        dispatch ({
            type: type.GET_DEPOSIT_APPROVAL,
            payload: {"rst":"0","errCode":500,"msg":"system_error"}
        });
    });
};
