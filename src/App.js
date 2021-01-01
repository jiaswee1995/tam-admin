import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import jwt from "jsonwebtoken";
import "./translations/i18nify";
// import { text } from "./common/public-key";
import { Provider } from "react-redux";
import { RoutingTest } from "./pages";
import Store from "./store/store";
import NotFound from './exception/notFound';
import SideBar from "./components/SideBar";
// import SessionTimer from "./components/Timer";
import { Layout } from "antd";
import RequiredAuth from "./common/middleware/authPermission";
import RequiredPublicAuth from "./common/middleware/authPublicPermission";
import adminLogin from "./pages/admin/login";
import dashboard from "./pages/dashboard";

import "antd/dist/antd.css";
import './App.css';
import './sass/base.scss'
import './sass/app.scss'

function AppRouter() {

    let auth = false;

    // if (sessionStorage.getItem("accessToken") != null && sessionStorage.getItem("refreshToken") != null){
    //     jwt.verify(sessionStorage.getItem("accessToken"), text, {algorithm: 'RS256'}, function (err, decoded_token) {
    //
    //         if (err === null && decoded_token !== null) {
    //             auth = true;
    //         }
    //     });
    // }

    // if (sessionStorage.getItem("accessToken") != null){
    //     jwt.verify(sessionStorage.getItem("accessToken"), text, {algorithm: 'RS256'}, function (err, decoded_token) {
    //
    //         if (err === null && decoded_token !== null) {
    //             axios.post(process.env.REACT_APP_SLOT_URL + "/api/v1/token/refresh", {
    //                 "refresh_token": sessionStorage.getItem("refreshToken")
    //             }, {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': sessionStorage.getItem("accessToken")
    //                 }
    //             }).then((response) => {
    //                 if (response.data.statusCode === 200){
    //                     auth = true;
    //
    //                     sessionStorage.setItem("accessToken", response.data.data.access_token);
    //                     sessionStorage.setItem("refreshToken", response.data.data.refresh_token);
    //                 }else{
    //                     auth = false;
    //
    //                     sessionStorage.setItem("tokenExpired", "true");
    //                     sessionStorage.removeItem("uname");
    //                     sessionStorage.removeItem("accessToken");
    //                     sessionStorage.removeItem("refreshToken");
    //                     // window.location.href = "/admin/login";
    //                 }
    //             }).catch(err => {
    //                 auth = false;
    //
    //                 sessionStorage.setItem("tokenExpired", "true");
    //                 sessionStorage.removeItem("uname");
    //                 sessionStorage.removeItem("accessToken");
    //                 sessionStorage.removeItem("refreshToken");
    //                 // window.location.href = "/admin/login";
    //             });
    //
    //             auth = true;
    //
    //             setInterval(function () {
    //
    //                 axios.post(process.env.REACT_APP_SLOT_URL + "/api/v1/token/refresh", {
    //                     "refresh_token": sessionStorage.getItem("refreshToken")
    //                 }, {
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         'Authorization': sessionStorage.getItem("accessToken")
    //                     }
    //                 }).then((response) => {
    //
    //                     if (response.data.statusCode === 200){
    //                         sessionStorage.setItem("accessToken", response.data.data.access_token);
    //                         sessionStorage.setItem("refreshToken", response.data.data.refresh_token);
    //                     }else{
    //                         auth = false;
    //                         sessionStorage.setItem("tokenExpired", "true");
    //                         sessionStorage.removeItem("uname");
    //                         sessionStorage.removeItem("accessToken");
    //                         sessionStorage.removeItem("refreshToken");
    //                         // window.location.href = "/admin/login";
    //                     }
    //
    //                 }).catch(err => {
    //                     auth = false;
    //
    //                     sessionStorage.setItem("tokenExpired", "true");
    //                     sessionStorage.removeItem("uname");
    //                     sessionStorage.removeItem("accessToken");
    //                     sessionStorage.removeItem("refreshToken");
    //                     // window.location.href = "/admin/login";
    //                 })
    //
    //                 sessionStorage.setItem("tokenExpired", "false");
    //             }, 150000);
    //         }
    //         else {
    //             auth = false;
    //
    //             sessionStorage.setItem("tokenExpired", "true");
    //             sessionStorage.removeItem("uname");
    //             sessionStorage.removeItem("accessToken");
    //             sessionStorage.removeItem("refreshToken");
    //             // window.location.href = "/admin/login";
    //         }
    //     });
    // }

    return (
        <Provider store={Store}>
            <Layout>
                <Router>
                    {auth &&
                    sessionStorage.getItem("accessToken") !== null &&
                    sessionStorage.getItem("accessToken") !== undefined &&
                    sessionStorage.getItem("accessToken") !== "" &&
                        <SideBar />
                    }

                    {/*{auth &&*/}
                    {/*sessionStorage.getItem("accessToken") !== null &&*/}
                    {/*sessionStorage.getItem("accessToken") !== undefined &&*/}
                    {/*sessionStorage.getItem("accessToken") !== "" &&*/}
                    {/*    <SessionTimer />*/}
                    {/*}*/}

                    <Switch>
                        <Route exact path="/" component={RequiredPublicAuth(adminLogin)}/>
                        <Route exact path="/admin" component={RequiredPublicAuth(adminLogin)}/>
                        <Route exact path="/admin/login" component={RequiredPublicAuth(adminLogin)}/>

                        <Route exact path="/dashboard" component={RequiredAuth(dashboard)}/>
                        {auth &&
                        RoutingTest().map((route, index) => (
                            <Route exact path={route.path} key={index} component={(RequiredAuth(route.component))}/>
                        ))
                        }
                        <Route component={RequiredAuth(NotFound)}/>
                    </Switch>
                </Router>
            </Layout>
        </Provider>
    );

}

export default AppRouter;
