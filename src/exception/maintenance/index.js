import React, { Component } from 'react';

import { t } from 'react-i18nify';
import './index.scss';

import maintenanceImg from '../../public/images/img-under-maintenance-2.png';
import {Link} from "react-router-dom";

class Maintenance extends Component{
    state = {
        targetLocation: "/login"
    }

    UNSAFE_componentWillMount = () => {
        this.setState({
            targetLocation: (sessionStorage.getItem("accessToken")) ? "/home" : "/login"
        })
    }

    render() {
        return (
            <div className="Maintenance">
                <div className="pt-5">
                    <div className="col-12 text-center text-light lbl-error text-uppercase">{t('global.error')}</div>
                    <img src={maintenanceImg} alt={'underMaintenance'} width={'100%'}/>
                    <div className="col-12 text-center text-light lbl-error text-uppercase">{t('global.under_maintenance')}</div>
                </div>

                <div className="px-4 pb-4">
                    <Link to={this.state.targetLocation} className="btn btn-primary col-12 text-uppercase">{t('global.back')}</Link>
                </div>
            </div>
        )
    }
}

export default Maintenance;
