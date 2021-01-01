import React, { Component } from "react";
import { connect } from "react-redux";
import { t, setLocale } from "react-i18nify";
import { UserOutlined } from "@ant-design/icons";
// import { DownOutlined } from '@ant-design/icons';
import {
    Menu,
    Dropdown,
    message,
    Layout,
    Avatar,
    Modal,
    Button,
    Input,
    Row,
    Col,
    Typography,
} from "antd";
import { GlobalOutlined, LogoutOutlined } from "@ant-design/icons";
import { postAdminLogout } from "../../store/ducks/adminLogout/actions";
import { getLanguage } from "../../store/ducks/language/actions";
import { postChangeLanguage } from "../../store/ducks/pageHeader/actions";
import { postChangePassword } from "../../store/ducks/changePassword/actions";

import "./Header.scss";

class Headers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            theme: "dark",
            current: "1",
            collapsed: false,
            language:
                this.props.language_data !== undefined
                    ? JSON.parse(this.props.language_data).data
                    : [],
            lang: "en",
            visible: false,
            current_password: "",
            new_password: "",
            confirm_password: "",
            loading: false,
        };

        this.onClick = this.onClick.bind(this);
        this.onChange= this.onChange.bind(this);
        this.handleCancel= this.handleCancel.bind(this);
        this.handlePass= this.handlePass.bind(this);
        this.handleNewPass= this.handleNewPass.bind(this);
        this.handleConPass= this.handleConPass.bind(this);
        this.handleSummit= this.handleSummit.bind(this);
        this.removeStorage= this.removeStorage.bind(this);
    }

    UNSAFE_componentWillMount() {
        if (sessionStorage.getItem("lang_arr") === null) {
            this.props.getLanguage();
        } else {
            const decoded_lang = JSON.parse(sessionStorage.getItem("lang_arr"));
            this.setState({ language: decoded_lang });
        }
    }

    removeStorage(){
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
    }
    
    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.admin_logout_data !== this.props.admin_logout_data) {
            this.removeStorage();
            setTimeout(function(){}, 1000);
            window.location.href = "/admin/login";
        }

        if (
            nextProps.language_data !== this.props.language_data ||
            nextProps.language_data === this.props.language_data
        ) {
            if (sessionStorage.getItem("lang_arr") !== null) {
                const decoded_lang = JSON.parse(sessionStorage.getItem("lang_arr"));
                this.setState({ language: decoded_lang });
            } else {
                let l_data = JSON.parse(nextProps.language_data);

                if (l_data.statusCode === 200) {
                    if (sessionStorage.getItem("lang_arr") === null) {
                        sessionStorage.setItem("lang_arr", JSON.stringify(l_data.data));

                        this.setState({ language: l_data.data });
                    }
                } else {
                    message.error(l_data.msg);
                }
            }

            this.setState({});
        }

        if (nextProps.password_data !== this.props.password_data) {
            if (nextProps.password_data.statusCode === 200) {
                if (nextProps.password_data.status === "success") {
                    message.success(nextProps.password_data.status);
                    this.setState({
                        loading: false,
                    });
                } else {
                    message.error(nextProps.password_data.msg);
                    this.setState({
                        loading: false,
                    });
                }
            } else {
                message.error(nextProps.password_data.msg);
                this.setState({
                    loading: false,
                });
            }
        }
    }

    handlePass(e) {
        this.setState({
            current_password: e.target.value,
        });
    }

    handleNewPass(e) {
        this.setState({
            new_password: e.target.value,
        });
    }

    handleConPass(e) {
        this.setState({
            confirm_password: e.target.value,
        });
    }

    handleSummit() {
        const data = {};

        data.current_password = this.state.current_password;
        data.new_password = this.state.new_password;
        data.confirm_password = this.state.confirm_password;

        this.props.postChangePassword(data);

        this.setState({
            loading: true,
        });
    }

    toggle = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    onClick(key) {
        const data = [];

        if (key.key === "logout") {
            this.props.postAdminLogout(data);
        }

        if (key.key === "password") {
            this.setState({ visible: true });
        }
    }

    onChange(key) {
        console.log(key);
        this.setState({ lang: key.key });
        setLocale(key.key);
        sessionStorage.setItem("lang", key.key);
        this.props.postChangeLanguage(key.key);
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        const { language, loading } = this.state;

        const { Header } = Layout;
        const { Title } = Typography;

        const langMenu = (
            <Menu onClick={this.onChange} className="lang-menu">
                {language.map((locale) => (
                    <Menu.Item key={locale.locale}>
                        {locale.name}
                        {/* <span role="img" aria-label={languageLabels[locale.locale]}>
                        {languageIcons[locale.locale]}
                    </span>{' '}
                    {languageLabels[locale.locale]} */}
                    </Menu.Item>
                ))}
            </Menu>
        );

        const avatarMenu = (
            <Menu className="avatarMenu" onClick={this.onClick}>
                <Menu.Item key="password">
                    <UserOutlined />
                    {t("header.password")}
                </Menu.Item>

                <Menu.Divider />

                <Menu.Item key="logout">
                    <LogoutOutlined />
                    {t("header.logout")}
                </Menu.Item>
            </Menu>
        );

        return (
            <Header className="header header-padding">
                <Modal
                    maskClosable
                    className="pb-0 bg-light"
                    visible={this.state.visible}
                    closable={true}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            {t("header.return")}
                        </Button>,
                        <Button
                            loading={loading}
                            type="primary"
                            onClick={this.handleSummit}
                        >
                            {t("header.change")}
                        </Button>,
                    ]}
                >
                    <Title level={4}>{t("header.change_password")}</Title>
                    <div className="modal">
                        <Row gutter={[16, 16]}>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <label>{t("header.old_password")}</label>
                            </Col>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <Input
                                    className="oldpassword"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder={t("header.old_password")}
                                    onChange={this.handlePass}
                                />
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <label>{t("header.new_password")}</label>
                            </Col>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <Input
                                    className="oldpassword"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder={t("header.new_password")}
                                    onChange={this.handleNewPass}
                                />
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <label>{t("header.confirm_password")}</label>
                            </Col>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <Input
                                    className="oldpassword"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder={t("header.confirm_password")}
                                    onChange={this.handleConPass}
                                />
                            </Col>
                        </Row>
                    </div>
                </Modal>
                <span className="lang">
          <Dropdown
              overlay={langMenu}
              overlayClassName="overlayMenu"
              trigger="click"
          >
            <GlobalOutlined
                size={64}
                title="语言"
                style={{
                    float: "right",
                    marginTop: 6,
                    lineHeight: 1,
                    fontSize: 30,
                }}
            />
          </Dropdown>
        </span>

                <span className="avatar">
          <Dropdown overlay={avatarMenu} overlayClassName="overlayMenu">
            <Avatar
                style={{ float: "right", marginTop: 5, marginRight: 10 }}
                icon={<UserOutlined />}
            />
          </Dropdown>
        </span>
        {/* <span className="uid">
            <Dropdown overlay={avatarMenu} overlayClassName="overlayMenu">
                <span style={{ float: "right", marginTop: '-9px', marginRight: '12px' }}>User Group <DownOutlined /></span>
            </Dropdown>
        </span> */}
            </Header>
        );
    }
}

const mapStateToProps = (state) => {
    const { adminLogout, language, header_data, password } = state;

    return {
        admin_logout_data: adminLogout.data,
        language_data: language.lang,
        header_data: header_data.data,
        password_data: password.data,
    };
};

const mapDispatchToProps = {
    postAdminLogout,
    getLanguage,
    postChangeLanguage,
    postChangePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(Headers);
