import * as type from './types';
import axios from 'axios';

export const postAdminLogout = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/admin/logout', {
        "access_user": ""
    }, {
         headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem("accessToken")
        }
    }).then( (response) => {
        dispatch ({
            type: type.POST_ADMINLOGOUT,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_ADMINLOGOUT,
            payload: error
        });

    });
};
