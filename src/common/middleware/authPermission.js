import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from "jsonwebtoken";
// import moment from "moment";
// import axios from "axios";

import { text } from "../public-key";
// import { GenHash } from "../helpers";
import { postIsAuthenticated } from "../../store/ducks/auth/actions";
import {Redirect} from "react-router-dom";

export default (ComposedComponent) => {
    class Authentication extends Component {
        state = {
            isAuthenticated: true,
            loading: false
        }

        UNSAFE_componentWillMount() {
            jwt.verify(sessionStorage.getItem("accessToken"), text, {algorithm: 'RS256'}, function (err, decoded_token) {
                console.log(err)
                if (err === null) {
                    this.setState({
                        isAuthenticated: true
                    }, () => {
                        this.props.postIsAuthenticated(false);
                    });
                } else {

                    // jwt.verify(sessionStorage.getItem("refreshToken"), text, {algorithm: 'RS256'}, function (err, decoded_refresh) {
                    //     if (err !== null) {
                    //         this.setState({
                    //             isAuthenticated: false
                    //         }, () => {
                    //             if(sessionStorage.getItem("tokenExpired") != null) {
                    //                 sessionStorage.setItem("tokenExpired", "true");
                    //             }
                    //
                    //             sessionStorage.removeItem("uname");
                    //             sessionStorage.removeItem("accessToken");
                    //             sessionStorage.removeItem("refreshToken");
                    //         });
                    //     } else {
                    //         const refresh_exp = moment.unix(decoded_refresh.exp).format("YYYY-MM-DD h:m:s");
                    //         const current_datetime = moment().format("YYYY-MM-DD h:m:s");
                    //
                    //         if (refresh_exp > current_datetime) {
                    //             axios.post(process.env.REACT_APP_SLOT_URL + "/api/v1/token/refresh", {
                    //                 "refresh_token": sessionStorage.getItem("refreshToken")
                    //             }, {
                    //                 headers: {
                    //                     'Authorization': sessionStorage.getItem("accessToken")
                    //                 }
                    //             }).then((response) => {
                    //                 sessionStorage.setItem("accessToken", response.data.data.access_token);
                    //                 sessionStorage.setItem("refreshToken", response.data.data.refresh_token);
                    //                 //this line of code having re-render issue
                    //                 this.setState({
                    //                     isAuthenticated: true
                    //                 }, () => {
                    //                     this.props.postIsAuthenticated(true);
                    //                 });
                    //             }).catch(err => {
                    //                 this.setState({
                    //                     isAuthenticated: false
                    //                 }, () => {
                    //                     sessionStorage.removeItem("accessToken");
                    //                     sessionStorage.removeItem("refreshToken");
                    //                     sessionStorage.setItem("tokenExpired", "false");
                    //                 });
                    //             })
                    //
                    //         } else {
                    //             this.setState({
                    //                 isAuthenticated: false
                    //             }, () => {
                    //                 sessionStorage.setItem("tokenExpired", "true");
                    //                 sessionStorage.removeItem("uname");
                    //                 sessionStorage.removeItem("accessToken");
                    //                 sessionStorage.removeItem("refreshToken");
                    //             });
                    //         }
                    //     }
                    // }.bind(this));
                }
            }.bind(this));
        }

        render() {
            return (this.state.isAuthenticated === true) ? <ComposedComponent {...this.props}/> : <Redirect to='/admin/login' />;
        }
    }

    const mapStateToProps = state => {
        const { login } = state;

        return { authenticated: login.data };
    };

    const mapDispatchToProps = {
        postIsAuthenticated
    };

    return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}