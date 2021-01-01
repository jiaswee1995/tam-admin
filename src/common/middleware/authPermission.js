import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from "jsonwebtoken";
// import moment from "moment";
// import axios from "axios";

// import { text } from "../public-key";
// import { GenHash } from "../helpers";
import { postIsAuthenticated } from "../../store/ducks/auth/actions";
import {Redirect} from "react-router-dom";

export default (ComposedComponent) => {
    class Authentication extends Component {
        state = {
            isAuthenticated: true,
            loading: false
        };

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