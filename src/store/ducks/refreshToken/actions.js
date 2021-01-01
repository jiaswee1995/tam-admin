import * as type from './types';
import axios from "axios";

export const postTokenRefresh = (data) => dispatch => {
    axios.post(process.env.REACT_APP_SLOT_URL + '/api/v1/token/refresh', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("accessToken")
        }
    }).then( (response) => {
        dispatch ({
            type: type.POST_REFRESH_TOKEN,
            payload: response.data
        })
    }).catch (error => {
        dispatch ({
            type: type.POST_REFRESH_TOKEN,
            payload: error.response.data
        });

    });
};