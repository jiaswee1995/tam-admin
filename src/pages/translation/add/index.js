import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, message, Row, Col } from "antd";
import { postTranslationAdd } from "../../../store/ducks/translation/actions";
import PageContent from "../../../components/Content";
import { 
    // setLocale,
     t } from "react-i18nify";

import "./index.scss";

class translationAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            locale: "",
            name: "",
            value: "",
        };
    }

    componentDidMount() {
        if (sessionStorage.getItem("tokenExpired") === "true") {
            sessionStorage.setItem("tokenExpired", "false");
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.translation_add_data !== this.props.translation_add_data) {
            if (nextProps.translation_add_data.statusCode === 200) {
                if (nextProps.translation_add_data.status === "success") {
                    message.success("success");
                }
            } else {
                message.error(nextProps.translation_add_data.msg);
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }
    }
    render() {
        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 20 },
        };

        const onFinish = (values) => {
            const data = {};
            data.type = values.type;
            data.locale = values.locale;
            data.name = values.name;
            data.value = values.value;

            this.props.postTranslationAdd(data);
        };

        return (
            <PageContent page_title="Translation Add">
                <div className="site-layout-content m-5 p-6">
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
                                    name="type"
                                    label="Type"
                                    labelAlign="left"
                                    rules={[
                                        {
                                            required: true,
                                            message: t("validate.field_required"),
                                        },
                                    ]}
                                >
                                    <Input placeholder="Type" />
                                </Form.Item>
                            </Col>
                            <Col md={{ span: 12 }} xs={{ span: 24 }} sm={{ span: 24 }}>
                                <Form.Item
                                    name="locale"
                                    label="Locale"
                                    labelAlign="left"
                                    rules={[
                                        {
                                            required: true,
                                            message: t("validate.field_required"),
                                        },
                                    ]}
                                >
                                    <Input placeholder="Locale" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={{ span: 12 }} xs={{ span: 24 }} sm={{ span: 24 }}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    labelAlign="left"
                                    rules={[
                                        {
                                            required: true,
                                            message: t("validate.field_required")
                                        },
                                    ]}
                                >
                                    <Input placeholder="Name" />
                                </Form.Item>
                            </Col>
                            <Col md={{ span: 12 }} xs={{ span: 24 }} sm={{ span: 24 }}>
                                <Form.Item
                                    name="value"
                                    label="Value"
                                    labelAlign="left"
                                    rules={[
                                        {
                                            required: true,
                                            message: t("validate.field_required")
                                        },
                                    ]}
                                >
                                    <Input placeholder="Value" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 24 }} xs={{ span: 24 }} sm={{ span: 24 }}>
                                <Form.Item className="tail">
                                    <div className="button-group">
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="add-form-button"
                                        >
                                            {t("filter.add")}
                                        </Button>
                                        <Button
                                            htmlType="submit"
                                            className="back-form-button ml-2"
                                        >
                                           {t("filter.back")}
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
    const { translation, header_data } = state;

    return {
        translation_add_data: translation.add_data,
        header_data: header_data.data,
    };
};

const mapDispatchToProps = {
    postTranslationAdd,
};
export default connect(mapStateToProps, mapDispatchToProps)(translationAdd);
