import { Form, Input, Button, message, Row, Col, Select, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import { LoadingOutlined } from '@ant-design/icons';

import { postAdminLogin} from "../../../store/ducks/adminLogin/actions";
import { getLanguage } from "../../../store/ducks/language/actions";

import logo from "../../../public/images/logo-forture-mick.png";

import "./index.scss";
import Zoom from 'react-reveal/Zoom';

class adminLogin extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password: "",
            modal2Visible: true,
            lang: "en",
            lang_arr: [],
            loading: false,
            disabled: false,
            input_email: t("login.please_input_your_email"),
            valid_email: t("login.please_enter_valid_email_address"),
            input_password: t("login.please_input_your_password")
        }

        this.handleAdminLogin = this.handleAdminLogin.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChangeLanguage = this.handleChangeLanguage.bind(this);

        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
    }

    componentDidMount() {
        if (sessionStorage.getItem("tokenExpired") === "true"){
            message.error("Session TimeOut");
            sessionStorage.removeItem("tokenExpired");
        }
    }

    componentWillMount() {
        this.props.getLanguage();
        sessionStorage.setItem("lang", sessionStorage.getItem("lang") !== null ? sessionStorage.getItem("lang") : this.state.lang);
        setLocale(sessionStorage.getItem("lang") !== null ? sessionStorage.getItem("lang") : this.state.lang);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.admin_data !== this.props.admin_data) {
            this.setState({
                loading: false,
                disabled: false
            });

            if (nextProps.admin_data.statusCode === 200)
            {
                if (nextProps.admin_data.status === 'success') {
                    sessionStorage.setItem("accessToken", nextProps.admin_data.data.access_token);
                    sessionStorage.setItem("refreshToken", nextProps.admin_data.data.refresh_token);

                    window.location.href = "/dashboard";
                }
            } else {
                let msg = nextProps.admin_data.msg;
                message.error(msg);
            }
        }

        if(nextProps.language !== this.props.language) {
            let lang_json = JSON.parse(nextProps.language);
            this.setState({ lang_arr: lang_json.data }, () => {

            });
        }
    }

    async handleAdminLogin(event) {
        event.preventDefault('auction-form');
        const data = [];

        data['email'] = this.state.email;
        data['password'] = this.state.password;

        this.props.postAdminLogin(data);
    }

    onChange(event){
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    handleChangeLanguage(e, i) {

        setLocale(e);
        sessionStorage.setItem("lang", e);

        this.setState({ 
            lang: e ,
            input_email: t("login.please_input_your_email"),
            valid_email: t("login.please_enter_valid_email_address"),
            input_password: t("login.please_input_your_password"),
            email: this.state.email,
            password: this.state.password
        }, () => {});

        window.location.reload();

    }

    render(){
        const { email, password, loading, disabled, input_email, input_password, valid_email } = this.state;
        const { Option } = Select;
        const antIcon = <LoadingOutlined spin />;
        const Logo = () => (
            <img src={logo} alt="admin logo" width="150"/>
        )

        const onFinish = values => {
            this.setState({
                loading: true,
                disabled: true
            });

            const data = {};

            data.email = values.email;
            data.password = values.password;

            this.props.postAdminLogin(data);
        };

        const language_arry = this.state.lang_arr.map(function(item, i){
            return(<Option value={item.locale}>{item.name}</Option>);
        });

        const select_language = (
            <Select
                defaultValue={sessionStorage.getItem("lang") !== null ? sessionStorage.getItem("lang") : this.state.lang}
                style={{width: "100%"}} size="large"
                onChange={this.handleChangeLanguage}>
                {language_arry}
            </Select>
        );


        return (
            <div id="loginForm">
                <div className="logo">
                    
                </div>
                {/* <Modal
                    title={<Logo/>}
                    centered
                    visible={this.state.modal2Visible}
                    footer={false}
                    closable={false}
                    wrapClassName="login-modal"
                > */}
                <Zoom top>
                <div className="login__root">
                    <Row>
                        <Col className="center-item" span={24}>
                         <Logo />
                        </Col>
                    </Row>
                    <div className="overlay-bg"></div>
                    <Form
                        name="normal_login"
                        className="p-5"
                        onFinish={onFinish}
                        onSubmit={this.handleAdminLogin}
                        >

                        <Row>
                            <Col xs={24} md={24}>
                                <Form.Item
                                    props={this.state.lang}
                                    name="email"
                                    rules={[{
                                        required: true,
                                        message: input_email
                                    },{
                                        type: "email",
                                        message: valid_email
                                    }]}>
                                    <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('login.username')} value={email} onChange={this.onChange}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={24} md={24}>
                                <Form.Item
                                    props={this.state.lang}
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: input_password
                                        },
                                    ]}>

                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder={t('login.password')}
                                        size="large"
                                        value={password}
                                        onChange={this.onChange}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={24} md={24}>
                                <Form.Item>
                                    {select_language}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={24} md={24}>
                                <Form.Item>
                                    <Button type="primary" disabled={disabled} size="large" htmlType="submit" className="button button-login">
                                        {loading === true &&
                                            <Spin indicator={antIcon} size="small" spinning="false"/>
                                        } {t("login.login")}
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
                </Zoom>
                {/* </Modal> */}
            </div>
      );
    }
}

const mapStateToProps = (state) => {
    const { adminLogin, language } = state;

    return {
        admin_data : adminLogin.data,
        language: language.lang
    }
};

const mapDispatchToProps = {
    postAdminLogin,
    getLanguage
};

export default connect(mapStateToProps, mapDispatchToProps) (adminLogin);
