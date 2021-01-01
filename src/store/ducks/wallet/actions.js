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

export const getWalletTypeList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/wallet/type',
        {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.GET_WALLET_TYPE_LIST,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.GET_WALLET_TYPE_LIST,
            payload: error.response.data
        });

    });
};

export const getWalletBalanceAmount = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/wallet/balance', {
            "user_id": data.user_id,
            "wallet_type": data.wallet_type
        }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.GET_WALLET_BALANCE,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.GET_WALLET_BALANCE,
            payload: error.response.data
        });

    });
};

export const getWalletSetting = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/wallet/setting', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
       }
   }).then( (response) => {
        dispatch ({
            type: type.GET_WALLET_SETTING,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.GET_WALLET_SETTING,
            payload: error.response.data
        });

    });
};

export const postEwtBlock = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/wallet/block', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
        }
    }).then( (response) => {
        dispatch ({
            type: type.POST_EWT_BLOCK,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_EWT_BLOCK,
            payload: error.response.data
        });

    });
};

export const postGetMemberAddrList = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/member/addresslist', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
        }
    }).then( (response) => {
        dispatch ({
            type: type.POST_MEM_ADDR_LIST,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_MEM_ADDR_LIST,
            payload: error.response.data
        });

    });
};