import React, { Component } from 'react';
import jwt from "jsonwebtoken";

import { text } from "../public-key";
import {Redirect} from "react-router-dom";

export default (ComposedComponent) => {
    class AuthenticationPublic extends Component {
        state = {
            isAuthenticated: false,
            isLoading: false
        }

        checkAuth = () => {
            return jwt.verify(sessionStorage.getItem("accessToken"), text, {algorithm: 'RS256'}, function (err, decoded_token) {
                if (err === null) {
                   return true;
                } else {
                    return false;
                }
            });
        }

        UNSAFE_componentWillMount() {
            if(sessionStorage.getItem("accessToken") != null) {
                console.log(this.checkAuth())
                if(this.checkAuth()) {
                    // eslint-disable-next-line react/no-direct-mutation-state
                    this.state.isAuthenticated = true;
                    this.setState({ isAuthenticated: true });
                }else{
                    this.setState({ isAuthenticated: false });
                }
            }else{
                this.setState({ isAuthenticated: false });
            }
        }

        componentDidMount() {
            if(!this.state.isAuthenticated) {
                sessionStorage.removeItem("uname");
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("refreshToken");
            }
        }

        render() {
            return (this.state.isAuthenticated === false) ? <ComposedComponent {...this.props}/> : <Redirect to='/home' />;
        }
    }

    return AuthenticationPublic;
}