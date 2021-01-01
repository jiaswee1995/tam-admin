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

export const postStatement = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/wallet/statement', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_STATEMENT,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_STATEMENT,
            payload: error.response.data
        });

    });
};

export const postBalanceSummary = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/wallet/balance/summary', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_BALANCESUMMARY,
            payload: response.data
        })
    }).catch (error => {
        console.log(error.response.data);
        dispatch ({
            type: type.POST_BALANCESUMMARY,
            payload: error.response.data
        });

    });
};