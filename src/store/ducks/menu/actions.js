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

export const getUserMenuList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/user/group/list', {
        'user_group_code': data !== undefined ? data.userGroupSelected : "",
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem("accessToken")
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.GET_USER_MENU_LIST,
            payload: response
        })
    }).catch (error => {
        dispatch ({
            type: type.GET_USER_MENU_LIST,
            payload: {"rst":"0","msg":"system_error","data":{"statusCode":401}}
        });

    });
};

export const getMenuDetail = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/user/group/detail', {
        'user_group_code': data !== undefined ? data.userGroupSelected : "",
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem("accessToken")
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.GET_MENU_DETAIL,
            payload: response
        })
    }).catch (error => {
        dispatch ({
            type: type.GET_MENU_DETAIL,
            payload: {"rst":"0","msg":"system_error","data":{"statusCode":401}}
        });

    });
};

export const postGroupMenu = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/user/group/permission', {
        'user_group_selected': data.user_group_selected,
        'menu_selected': data.menu_selected,
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem("accessToken")
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
        }
    }).then( (response) => {
        dispatch ({
            type: type.POST_GROUP_MENU,
            payload: response
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_GROUP_MENU,
            payload: {"rst":"0","msg":"system_error","data":{"statusCode":401}}
        });

    });
};

export const postSidebarMenu = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/menu/sidebar/condition', {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem("accessToken")
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken"),
            'Accept-Language': sessionStorage.getItem("lang")
        }
    }).then( (response) => {
        dispatch ({
            type: type.POST_SIDEBAR_MENU,
            payload: response
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_SIDEBAR_MENU,
            payload: error.response.data
        });

    });
};