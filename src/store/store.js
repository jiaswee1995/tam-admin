import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Raven from 'raven-js';

import * as reducers from "./ducks/index";

const rootReducer = (state, action) => {
    return combineReducers(reducers)(state, action);
};

const crashReporter = store => next => action => {
    try {

        if (action.payload.statusCode === 401 || action.payload.statusCode === 10035){
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
            setTimeout(function(){}, 500);
            window.location.href = "/admin/login";
        }

        return next(action)
    } catch (err) {
        console.error('Caught an exception!', err)
        Raven.captureException(err, {
            extra: {
                action,
                state: store.getState()
            }
        })
        throw err
    }
}

export default createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        crashReporter
    ),
);