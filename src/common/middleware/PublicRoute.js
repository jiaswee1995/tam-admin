import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            sessionStorage.getItem("accessToken")
                ? <Redirect to='/home' />
                : <Component {...props} />
        )} />
)

export default PrivateRoute;