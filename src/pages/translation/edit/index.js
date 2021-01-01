import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, message } from "antd";
import { postTranslationUpdate } from "../../../store/ducks/translation/actions";
import PageContent from "../../../components/Content";
import { setLocale, t } from "react-i18nify";

import "./index.scss";

class translationEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type:
                this.props.location.state === undefined
                    ? ""
                    : this.props.location.state.type,
            locale:
                this.props.location.state === undefined
                    ? ""
                    : this.props.location.state.locale,
            name:
                this.props.location.state === undefined
                    ? ""
                    : this.props.location.state.name,
            value:
                this.props.location.state === undefined
                    ? ""
                    : this.props.location.state.value,
            id:
                this.props.location.state === undefined
                    ? ""
                    : this.props.location.state.id,
        };
    }
    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    componentDidMount() {
        if (sessionStorage.getItem("tokenExpired") === "true") {
            sessionStorage.setItem("tokenExpired", "false");
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (
            nextProps.translation_update_data !== this.props.translation_update_data
        ) {
            if (nextProps.translation_update_data.statusCode === 200) {
                if (nextProps.translation_update_data.status === "success") {
                    message.success("success");
                    setTimeout(function () {
                        window.location.href = "/translation/list";
                    }, 1000);
                }
            } else {
                message.error(nextProps.translation_update_data.msg);
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }
    }

    render() {
        const { type, locale, name, value } = this.state;
        const layout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 10 },
        };

        const onFinish = (values) => {
            const data = {};
            data.id = this.state.id;
            data.value = values.value;

            this.props.postTranslationUpdate(data);
        };

        return (
            <PageContent page_title="Translation Update">
                <div className="site-layout-content m-5">
                    <Form
                        {...layout}
                        name="normal_login"
                        id="admin-login"
                        className="member-form"
                        onFinish={onFinish}
                        onSubmit={this.handleAdminLogin}
                        initialValues={{
                            value: value,
                        }}
                        action="/admin"
                    >
                        <Form.Item name="type" label="Type">
                            <Input placeholder={type} disabled />
                        </Form.Item>

                        <Form.Item name="locale" label="Locale">
                            <Input placeholder={locale} disabled />
                        </Form.Item>

                        <Form.Item name="name" label="Name">
                            <Input placeholder={name} disabled />
                        </Form.Item>

                        <Form.Item
                            name="value"
                            label="Value"
                            rules={[
                                {
                                    required: true,
                                    message:  t("validate.field_required"),
                                },
                            ]}
                        >
                            <Input placeholder={value} />
                        </Form.Item>

                        <Form.Item className="tail">
                            <div className="button-group">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="add-form-button"
                                >
                                     {t("filter.update")}
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </PageContent>
        );
    }
}

const mapStateToProps = (state) => {
    const { translation, header_data } = state;

    return {
        translation_update_data: translation.update_data,
        header_data: header_data.data,
    };
};

const mapDispatchToProps = {
    postTranslationUpdate,
};
export default connect(mapStateToProps, mapDispatchToProps)(translationEdit);
