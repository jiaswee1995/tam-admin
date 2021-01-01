import * as type from './types';
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

export const getLanguage = (data) => dispatch => {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", process.env.REACT_APP_SLOT_URL + "/api/v1/member/language/list", false); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json")
    xmlHttp.setRequestHeader("Authorization", sessionStorage.getItem("accessToken"))
    xmlHttp.onreadystatechange = function (e) {
        dispatch ({
            type: type.GET_LANGUAGE,
            payload: xmlHttp.response
        })
        };
    xmlHttp.send( null );
};