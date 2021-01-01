import React, { Component } from 'react';
import "./Timer.scss";
import jwt from "jsonwebtoken";
import { text } from "../../common/public-key";
import moment from "moment";
import {Modal, Row, Button} from 'antd';
import { postTokenRefresh } from "../../store/ducks/refreshToken/actions";
import {connect} from "react-redux";
import Countdown from 'react-countdown';
import {setLocale, t} from "react-i18nify";

class SessionTimer extends Component{

    constructor(props){
        super(props);
        this.state = {
            ModalText: 'Your session will be ended in ',
            visible: false,
            confirmLoading: false,
            initialTime: 240000,
            loading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSessionEnd = this.onSessionEnd.bind(this);
        this.getSessionTime = this.getSessionTime.bind(this);
    }

    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    componentDidMount() {
        let time = 0;

        time = this.getSessionTime();

        if (time <= 0){
            this.onSessionEnd();
        }

        this.setState({initialTime: time});
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if (nextProps.refresh_data !== this.props.refresh_data) {

            if (nextProps.refresh_data.statusCode === 200){
                sessionStorage.setItem("accessToken", nextProps.refresh_data.data.access_token);
                sessionStorage.setItem("refreshToken", nextProps.refresh_data.data.refresh_token);

                let time = 0;

                time = this.getSessionTime();

                this.setState({
                    initialTime: time,
                    visible: false,
                    loading: false
                });
            }else{
                this.onSessionEnd();
            }
        }
    }

    getSessionTime(){
        let time = 0;
        time = jwt.verify(sessionStorage.getItem("accessToken"), text, {algorithm: 'RS256'}, function (err, decoded_token) {

            if(err === null){
                const access_exp = moment.unix(decoded_token.exp);
                const diff = access_exp.diff(moment(), 'seconds');

                return (diff + 10) * 1000;
            }
        });

        return time;
    }

    onSessionEnd(){
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        setTimeout(function(){
            window.location.href = "/admin/login";
        }, 1000);
    }

    onChange(e){
        // console.log(e);
        if (this.state.visible !== true && (e.days * 86400 + e.hours * 3600 + e.minutes * 60 + e.seconds) < 120 ){
        // if (this.state.visible !== true && (e.minutes * 60 + e.seconds) < 130 ){
            let time = 0;

            time = this.getSessionTime();

            this.setState({
                remainingTime: time,
                visible: true
            });
        }

        if (e.days * 86400 + e.hours * 3600 + e.minutes * 60 + e.seconds <= 1){
        // if (e.minutes * 60 + e.seconds <= 10){
            this.onSessionEnd();
        }
    }

    handleOk = () => {
        const data = {};

        data.refresh_token = sessionStorage.getItem("refreshToken");

        this.setState({loading: true});

        this.props.postTokenRefresh(data);
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
        this.onSessionEnd();
    };

    render() {

        const { visible, confirmLoading, initialTime, remainingTime } = this.state;

        const renderer = ({ hours, minutes, seconds, completed }) => {
            return (
                <span>{minutes} {t("timer.minutes")} {seconds} {t("timer.seconds")}</span>
            );
        };

        return (

            <div>
                {!visible &&
                <div className="none-display">
                    <Countdown date={Date.now() + initialTime} renderer={renderer} onTick={this.onChange}/>
                </div>
                }

                {visible &&
                <Modal
                    title={t("timer.session_expiring")}
                    visible={true}
                    confirmLoading={confirmLoading}
                    closable={false}
                    footer={[
                        <>
                            <Button onClick={this.handleCancel}>{t("timer.i_m_done")}</Button>
                            <Button type="primary" onClick={this.handleOk} loading={this.state.loading}>{t("timer.wait_a_minute")}</Button>
                        </>
                    ]}
                >

                    <p className="timer">
                        <Row gutter={16}>
                            {t("timer.expire_desc")}&nbsp;
                            <Countdown date={Date.now() + remainingTime} renderer={renderer} onTick={this.onChange}/>
                        </Row>
                    </p>

                </Modal>
                }
            </div>

        )
    }
}

const mapStateToProps = state => {
    const { refresh } = state;

    return { refresh_data: refresh.data };
};

const mapDispatchToProps = {
    postTokenRefresh
};

export default connect(mapStateToProps, mapDispatchToProps) (SessionTimer);
