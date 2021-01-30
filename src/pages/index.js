import React from 'react';
import { Route } from 'react-router-dom';
import DashboardRoutes from '../routes/dashboard/routes';
import HomeRoutes from '../routes/home/routes';
import adminRoutes from '../routes/admin/routes';
import memberRoutes from '../routes/member/routes';
import reportRoutes from '../routes/report/routes';
import salesRoutes from '../routes/sales/routes';
import ewalletRoutes from '../routes/ewallet/routes';
import settingRoutes from '../routes/setting/routes';
import translationRoutes from '../routes/translation/routes';
import notificationRoutes from '../routes/notification/routes';
import otpRoute from '../routes/otp/routes';
import sicboRoute from '../routes/sicbo/routes';
import roulRoute from '../routes/roulette/routes';
import bacRoute from '../routes/baccarat/routes';

import './index.scss';

let rootRoutes = Array.prototype.concat(
    HomeRoutes,
    DashboardRoutes,
    adminRoutes,
    memberRoutes,
    reportRoutes,
    salesRoutes,
    ewalletRoutes,
    settingRoutes,
    translationRoutes,
    notificationRoutes,
    otpRoute,
    sicboRoute,
    roulRoute,
    bacRoute,
);

export const RoutingTest = () => {
    // let route_obj = {};
    // let route_collection = [];
    let final_route = [];
    // let xmlHttp = new XMLHttpRequest();
    // xmlHttp.open( "GET", process.env.REACT_APP_SLOT_URL + "/api/v1/admin/menu/sidebar", false ); // false for synchronous request
    // xmlHttp.setRequestHeader("Content-Type", "application/json")
    // xmlHttp.setRequestHeader("Authorization", sessionStorage.getItem("accessToken"))
    // xmlHttp.send( null );
    // route_obj = JSON.parse(xmlHttp.responseText);
    //
    // if (route_obj.data !== undefined && route_obj.statusCode === 200){
    //     route_obj.data.menu_list.map(function (value, index) {
    //         if (value.url !== ""){
    //             route_collection.push(value.url);
    //         }
    //         return null;
    //     })
    // }else if (route_obj.statusCode === 401){
    //     sessionStorage.removeItem("accessToken");
    //     sessionStorage.removeItem("refreshToken");
    //     // window.location.href = "/admin/login";
    // }


    rootRoutes.map(function (route, index) {
        // if (route_collection.includes(route.path)){
            final_route.push(route);
        // }
        return null
    })

    let reactRoutes = final_route.map((route, index) => (
        <Route
            exact={true}
            key={index}
            path={route.path}
            component={route.component}
        />
    ));

    let temp = [];

    reactRoutes.map((route, index) => (
        temp.push(route.props)
    ));

    return temp;
}