import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import PageContent from "../../../components/Content";
import connect from "react-redux/es/connect/connect";

class SMSDetail extends Component{
    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        // if(nextProps.sms_data !== this.props.sms_data){
        //     if(nextProps.sms_data.statusCode === 200){
        //     // console.log(nextProps.sms_data)
        //     this.setState({
        //         balance: parseFloat(nextProps.sms_data.data.balance),
        //         currency: nextProps.sms_data.data.currency,
        //         type: nextProps.sms_data.data.account,
        //         expired: nextProps.sms_data.data.date_expired,
        //         })
        //     } else {
        //         sessionStorage.removeItem("accessToken");
        //         sessionStorage.removeItem("refreshToken");
        //         window.location.href = "/admin/login";
        //     }
        // }

    }

    render() {

        return (
            <PageContent page_title={t('draw.draw')} add_button_url="">
                <div className="content__root">
                   <h1>FIFIFI</h1>
                </div>
            </PageContent>
        )
    }
}

const mapStateToProps = (state) => {
    // const { sms } = state;
    return {
        // sms_data : sms.data
    }
};

const mapDispatchToProps = {
    // postGetSMSBalance
};

export default connect (mapStateToProps, mapDispatchToProps) (SMSDetail);