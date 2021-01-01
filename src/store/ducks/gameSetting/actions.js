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

export const postGameSetting = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/slotadmin/getpaytokenbymachcode', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_GAMESETTING,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_GAMESETTING,
            payload: error.response !== undefined ? error.response.data : error
        });

    });
};

export const postMachCode = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/slotadmin/getmachbymachcode', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_MACHCODE,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_MACHCODE,
            payload: error.response !== undefined ? error.response.data : error
        });

    });
};

export const postMachUpdate = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/slotadmin/updatemach', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_MACHUPDATE,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_MACHUPDATE,
            payload: error.response !== undefined ? error.response.data : error
        });

    });
};
