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

export const postNotiList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/notification/list', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_NOTILIST,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_NOTILIST,
            payload: error.response.data
        });

    });
};

export const postModuleList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/notification/module/list', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_MODULELIST,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_MODULELIST,
            payload: error.response.data
        });

    });
};

export const postNotiSend = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/notification/send', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_NOTISEND,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_NOTISEND,
            payload: error.response.data
        });

    });
};

export const postLanguageList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/language/list', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_GET_LANGUAGE_LIST,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_GET_LANGUAGE_LIST,
            payload: error.response.data
        });

    });
};


export const postNotificationSendSponsor = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/notification/sendbysponsor', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_NOTI_SEND,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_NOTI_SEND,
            payload: error.response.data
        });

    });
};

export const postMoudleList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/notification/module/list', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_MODULE_LIST,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_MODULE_LIST,
            payload: error.response.data
        });

    });
};


export const postNotificationSend = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/notification/send', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.POST_NOTI_SEND,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_NOTI_SEND,
            payload: error.response.data
        });

    });
};