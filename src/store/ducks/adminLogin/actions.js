import * as type from './types';
import axios from 'axios';

export const postAdminLogin = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/login', data, {
        headers: { 'Content-Type': 'application/json' }
    }).then( (response) => {
        dispatch ({
            type: type.POST_ADMINLOGIN,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_ADMINLOGIN,
            payload: error.response.data
        });
    });
};
