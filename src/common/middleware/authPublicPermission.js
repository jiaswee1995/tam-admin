import React, { Component } from 'react';
import jwt from "jsonwebtoken";

// import { text } from "../public-key";
import {Redirect} from "react-router-dom";

export default (ComposedComponent) => {
    class AuthenticationPublic extends Component {
        state = {
            isAuthenticated: false,
            isLoading: false
        };

        render() {
            return (this.state.isAuthenticated === false) ? <ComposedComponent {...this.props}/> : <Redirect to='/home' />;
        }
    }

    return AuthenticationPublic;
}