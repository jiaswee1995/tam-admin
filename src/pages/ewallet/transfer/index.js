import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.scss";
import {
    Row,
    Col,
    Input,
    Form,
    Button,
    Divider,
    Select,
    InputNumber,
    message,
} from "antd";
import { postTransfer } from "../../../store/ducks/transfer/actions";
import {
    getWalletTypeList,
    getWalletSetting,
} from "../../../store/ducks/wallet/actions";
import PageContent from "../../../components/Content";
import { setLocale, t } from "react-i18nify";

class Transfer extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            theme: "dark",
            current: "1",
            wallet_type: [],
            loadings: [],
            minTransfer: 1,
            maxTransfer: 10000,
        };
        this.props.getWalletTypeList();

        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    handleSelect(e) {
        const data = {};
        data.wallet_type = e;
        this.props.getWalletSetting(data);
    }

    componentDidMount() {
        if (sessionStorage.getItem("tokenExpired") === "true") {
            sessionStorage.setItem("tokenExpired", "false");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.wallet_transfer !== this.props.wallet_transfer) {
            if (nextProps.wallet_transfer.statusCode === 200) {
                if (nextProps.wallet_transfer.status === "success") {
                    message.success("Success");
                    this.formRef.current.resetFields();
                }
            } else {
                message.error(nextProps.wallet_transfer.msg);
            }
            this.setState(({ loadings }) => {
                const newLoadings = [...loadings];
                newLoadings[0] = false;

                return {
                    loadings: newLoadings,
                };
            });
        }

        if (nextProps.wallet_type !== this.props.wallet_type) {
            if (nextProps.wallet_type.statusCode === 200) {
                if (nextProps.wallet_type.status === "success") {
                    this.setState({
                        wallet_type: nextProps.wallet_type.data,
                    });
                }
            } else {
                message.error(nextProps.wallet_type.msg);
            }
        }

        if (nextProps.wallet_setting !== this.props.wallet_setting) {
            if (nextProps.wallet_setting.statusCode === 200) {
                if (
                    nextProps.wallet_setting.status === "success" &&
                    nextProps.wallet_setting.data.length > 0
                ) {
                    this.setState({
                        minTransfer: nextProps.wallet_setting.data[0].transfer_setting.min,
                        maxTransfer: nextProps.wallet_setting.data[0].transfer_setting.max,
                    });
                }
            } else {
                message.error(nextProps.wallet_type.msg);
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }
    }

    render() {
        let wallet_list;
        const { Option } = Select;
        const { TextArea } = Input;
        const { wallet_type, loadings, minTransfer, maxTransfer } = this.state;
        const layout = {
            labelCol: { span: 24 },
            wrapperCol: { span: 24 },
        };

        const onFinish = (values) => {
            const data = {};
            this.setState(({ loadings }) => {
                const newLoadings = [...loadings];
                newLoadings[0] = true;

                return {
                    loadings: newLoadings,
                };
            });

            data.transfer_from = values.transfer_from;
            data.transfer_to = values.transfer_to;
            data.wallet_type = values.wallet_type;
            data.admin_remark = values.admin_remark;
            data.user_remark = values.user_remark;
            data.amount = values.amount.toString();

            this.props.postTransfer(data);
        };

        wallet_list = wallet_type.map(function (item, i) {
            return <Option value={item.currency_code}>{item.b_display_code}</Option>;
        });

        return (
            <PageContent
                page_title={t("transfer.title_transfer")}
                add_button_url=""
                main_menu_id={["sub2"]}
                sub_menu_id={["6"]}
            >
                <div className="bg-light p-2 m-5">
                    <Form
                        {...layout}
                        name="transfer-form"
                        id="admin-login"
                        className="transfer-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        ref={this.formRef}
                    >
                        <Row style={{ minHeight: "70%" }}>
                            <Col span={24}>
                                <Col
                                    span={24}
                                    style={{
                                        padding: 24,
                                        border: "solid",
                                        borderWidth: 0.5,
                                        borderColor: "lightgrey",
                                    }}
                                >
                                    <h2 className="H2">{t("transfer.transfer_detail")}</h2>
                                    <Divider style={{ width: "70%" }} />
                                    <Row>
                                        <Col md={{ span: 12 }} xs={{ span: 24 }} sm={{ span: 24 }}>
                                            <Form.Item
                                                name="transfer_from"
                                                label={t("transfer.user_id_from")}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: t("validate.field_required"),
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder={t("transfer.user_id_from")}
                                                    onSearch={(value) => console.log(value)}
                                                    style={{ width: "100%" }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col
                                            md={{ span: 12 }}
                                            xs={{ span: 24 }}
                                            sm={{ span: 24 }}
                                            className="pl-2"
                                        >
                                            <Form.Item
                                                name="transfer_to"
                                                label={t("transfer.user_id_to")}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: t("validate.field_required"),
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder={t("transfer.user_id_to")}
                                                    onSearch={(value) => console.log(value)}
                                                    style={{ width: "100%" }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Form.Item
                                        name="wallet_type"
                                        label={t("global.wallet_type")}
                                        rules={[
                                            { required: true, message: t("validate.field_required") },
                                        ]}
                                    >
                                        <Select
                                            defaultValue={t("filter.please_select")}
                                            style={{ width: "100%" }}
                                            onChange={this.handleSelect}
                                        >
                                            {wallet_list}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="amount"
                                        label={t("global.amount")}
                                        rules={[
                                            { required: true, message: t("validate.field_required") },
                                        ]}
                                    >
                                        <InputNumber
                                            min={minTransfer}
                                            max={maxTransfer}
                                            defaultValue={10}
                                            style={{ width: "100%" }}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="admin_remark"
                                        label={t("global.admin_remark")}
                                    >
                                        <TextArea rows={2} style={{ width: "100%" }} />
                                    </Form.Item>

                                    <Form.Item name="user_remark" label={t("global.user_remark")}>
                                        <TextArea rows={2} style={{ width: "100%" }} />
                                    </Form.Item>

                                    <Col offset={6} md={12}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="login-form-button"
                                            block
                                            loading={loadings[0]}
                                        >
                                            {t("global.submit")}
                                        </Button>
                                    </Col>
                                </Col>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </PageContent>
        );
    }
}
const mapStateToProps = (state) => {
    const { walletTransfer, wallet, header_data } = state;

    return {
        wallet_transfer: walletTransfer.data,
        wallet_type: wallet.data,
        wallet_setting: wallet.arr_data,
        header_data: header_data.data,
    };
};

const mapDispatchToProps = {
    postTransfer,
    getWalletTypeList,
    getWalletSetting,
};
export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
