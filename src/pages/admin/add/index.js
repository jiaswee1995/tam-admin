import React, { Component } from "react";
import { connect } from "react-redux";
import { t, setLocale } from "react-i18nify";
import { Form, Input, Button, message, Select, Row, Col } from "antd";
import {
    postAddAdmin,
    postUserGroup,
} from "../../../store/ducks/adminAdd/actions";
import PageContent from "../../../components/Content";

import "./index.scss";

class AdminAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: "dark",
            current: "1",
            data: [],
        };

        this.changeTheme = (value) => {
            this.setState({
                theme: value ? "dark" : "light",
            });
        };

        this.handleClick = (e) => {
            this.setState({
                current: e.key,
            });
        };
        const data = {};
        this.props.postUserGroup(data);
    }

    UNSAFE_componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    componentDidMount() {
        if (sessionStorage.getItem("tokenExpired") === "true") {
            sessionStorage.setItem("tokenExpired", "false");
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.admin_add_data !== this.props.admin_add_data) {
            if (nextProps.admin_add_data.statusCode === 200) {
                if (nextProps.admin_add_data.status === "success") {
                    message.success("success");
                }
            } else {
                message.error(nextProps.admin_add_data.msg);
            }
        }

        if (nextProps.user_group_data !== this.props.user_group_data) {
            if (nextProps.user_group_data.statusCode === 200) {
                if (nextProps.user_group_data.status === "success") {
                    this.setState({
                        data: nextProps.user_group_data.data,
                    });
                }
            } else {
                message.error(nextProps.user_group_data.msg);
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }
    }
    render() {
        const { Option } = Select;
        let user_group;

        const { data } = this.state;

        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        const onFinish = (values) => {
            const data = {};
            data.email = values.email;
            data.password = values.password;
            data.user_group = values.user_group.toString();

            this.props.postAddAdmin(data);
        };

        user_group = data.map(function (item, i) {
            return (
                <Option key={i} value={item.id}>
                    {item.name}
                </Option>
            );
        });

        return (
            <PageContent page_title={t("admin_add.admin_add")}>
                <div className="bg-light p-4 m-5">
                    <Form
                        {...layout}
                        name="normal_login"
                        id="admin-login"
                        className="member-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onSubmit={this.handleAdminLogin}
                        action="/admin"
                    >
                        <Row>
                            <Col md={{ span: 12 }} xs={{ span: 24 }} sm={{ span: 24 }}>
                                <Form.Item
                                    name="email"
                                    labelAlign="left"
                                    label={t("admin_add.email")}
                                    rules={[
                                        {
                                            required: true,
                                            message: t("admin_add.require_email"),
                                        },
                                    ]}
                                >
                                    <Input placeholder="Email" onChange={this.onChange} />
                                </Form.Item>
                            </Col>

                            <Col md={{ span: 12 }} xs={{ span: 24 }} sm={{ span: 24 }}>
                                <Form.Item
                                    name="password"
                                    label={t("admin_add.password")}
                                    rules={[
                                        {
                                            required: true,
                                            message: t("admin_add.require_password"),
                                        },
                                    ]}
                                >
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        onChange={this.onChange}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 12 }} xs={{ span: 24 }} sm={{ span: 24 }}>
                                <Form.Item
                                    name="user_group"
                                    labelAlign="left"
                                    label={t("admin_add.user_group")}
                                    rules={[
                                        {
                                            required: true,
                                            message: t("admin_add.require_user_group"),
                                        },
                                    ]}
                                >
                                    <Select
                                        defaultValue={t("admin_add.please_select")}
                                        name="user_group"
                                        required={true}
                                    >
                                        {user_group}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 24 }} xs={{ span: 24 }} sm={{ span: 24 }}>
                                <Form.Item className="tail" noStyle>
                                    <div className="admin-button">
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="add-form-button"
                                        >
                                            {t("admin_add.add")}
                                        </Button>
                                        <Button
                                            href="/admin/list"
                                            className="back-form-button"
                                            style={{ marginLeft: 5 }}
                                        >
                                            {t("admin_add.back")}
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </PageContent>
        );
    }
}

const mapStateToProps = (state) => {
    const { adminAdd, header_data } = state;

    return {
        admin_add_data: adminAdd.data,
        user_group_data: adminAdd.user_data,
        header_data: header_data.data,
    };
};

const mapDispatchToProps = {
    postAddAdmin,
    postUserGroup,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminAdd);
