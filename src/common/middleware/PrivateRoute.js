import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            sessionStorage.getItem("accessToken")
            ? <Component {...props} />
            : <Redirect to='/landing' />
    )} />
)

export default PrivateRoute;