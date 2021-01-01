import React, { Component } from "react";
import { connect } from "react-redux";
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
import { postAdjustment } from "../../../store/ducks/adjustment/actions";
import {
    getWalletTypeList,
    getWalletBalanceAmount,
} from "../../../store/ducks/wallet/actions";
import PageContent from "../../../components/Content";
import { setLocale, t } from "react-i18nify";

import "./index.scss";

class Adjustment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: "dark",
            current: "1",
            wallet_list_data: [],
            userId: "",
            walletType: "",
            current_balance: "0",
            amount: "0",
            balance_after: "0",
            loading: false,
        };

        this.onChange = this.onChange.bind(this);
        this.handleAmount = this.handleAmount.bind(this);
        this.handleWalletBalance = this.handleWalletBalance.bind(this);
    }

    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    onChange(e) {
        const { name, value } = e.target;

        this.setState({ [name]: value });

        if (
            name === "userId" &&
            this.state.walletType !== "" &&
            this.state.walletType !== "Please Select"
        ) {
            const data = {};
            data.user_id = e.target.value;
            data.wallet_type = this.state.walletType;
            this.props.getWalletBalanceAmount(data);
        }
    }

    handleAmount(e) {
        this.setState({ amount: e });

        if (e === "" || e === null) {
            this.setState({
                amount: "0",
                balance_after: this.state.current_balance,
            });
        }
    }

    handleWalletBalance(e) {
        this.setState({ walletType: e });
        const data = {};
        data.user_id = this.state.userId;
        data.wallet_type = e;

        if (this.state.userId !== "") {
            this.props.getWalletBalanceAmount(data);
        }
    }

    componentDidMount() {
        this.props.getWalletTypeList();
        if (sessionStorage.getItem("tokenExpired") === "true") {
            sessionStorage.setItem("tokenExpired", "false");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.wallet_data !== this.props.wallet_data) {
            if (nextProps.wallet_data.statusCode === 200) {
                if (nextProps.wallet_data.status === "success") {
                    this.setState({ loading: false });
                    message.success("Success");
                }
            } else {
                message.error(nextProps.wallet_data.msg);
                this.setState({
                    loading: false,
                });
            }
        }

        if (nextProps.wallet_list_data !== this.props.wallet_list_data) {
            let wallet_list_data = nextProps.wallet_list_data;
            if (wallet_list_data.statusCode === 200) {
                if (wallet_list_data.status === "success") {
                    this.setState({ wallet_list_data: wallet_list_data.data });
                }
            } else {
                message.error(nextProps.wallet_list_data.msg);
            }
        }

        if (nextProps.balance_data !== this.props.balance_data) {
            let balance_data = nextProps.balance_data;
            if (balance_data.statusCode === 200) {
                if (balance_data.status === "success") {
                    this.setState({ current_balance: balance_data.data.balance });
                }
            } else {
                // message.error('Error');
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }
    }

    render() {
        const { Option } = Select;
        const { TextArea } = Input;

        const layout = {
            labelCol: { span: 24 },
            wrapperCol: { span: 24 },
        };

        const onFinish = (values) => {
            const data = {};

            data.user_id = this.state.userId;
            data.wallet_type = this.state.walletType;
            data.amount = this.state.amount.toString();
            data.admin_remark = values.admin_remark;
            data.user_remark = values.user_remark;

            this.setState({
                loading: true,
            });

            this.props.postAdjustment(data);
        };

        let options = [];
        options = this.state.wallet_list_data.map(function (value, index) {
            return (
                <Option key={index} value={value.currency_code}>
                    {value.b_display_code}
                </Option>
            );
        });

        return (
            <PageContent
                page_title={t("adjustment.title_adjustment")}
                main_menu_id={["sub2"]}
                sub_menu_id={["5"]}
            >
                <div className="bg-light p-4 m-5">
                    <Row style={{ minHeight: "70%" }}>
                        <Col
                            md={12}
                            xs={24}
                            style={{
                                padding: 24,
                                border: "solid",
                                borderWidth: 0.5,
                                borderColor: "lightgrey",
                            }}
                        >
                            <strong>{t("adjustment.adjustment_detail")}</strong>
                            <Divider className="w-7" />
                            <Form
                                {...layout}
                                name="normal_login"
                                id="admin-login"
                                className="adjustment-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onSubmit={this.handleAdminLogin}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="user_id"
                                    label={t("filter.user_id")}
                                    rules={[
                                        {
                                            required: true,
                                            message: t("validate.field_required"),
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={t("filter.user_id")}
                                        name="userId"
                                        onSearch={(value) => console.log(value)}
                                        className="w-10"
                                        onChange={this.onChange}
                                        required={true}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="wallet_type"
                                    label={t("filter.wallet_type")}
                                    rules={[
                                        {
                                            required: true,
                                            message: t("validate.field_required"),
                                        },
                                    ]}
                                >
                                    <Select
                                        defaultValue={t("filter.please_select")}
                                        name="walletType"
                                        onChange={this.handleWalletBalance}
                                        required={true}
                                        className="w-10"
                                    >
                                        {options}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="amount_label"
                                    label={t("global.amount")}
                                    rules={[
                                        {
                                            required: true,
                                            message: t("validate.field_required"),
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        name="amount"
                                        onChange={this.handleAmount}
                                        value={this.state.amount}
                                        className="w-10"
                                        required={true}
                                    />
                                </Form.Item>

                                <Form.Item name="admin_remark" label={t("global.admin_remark")}>
                                    <TextArea rows={2} className="w-10" />
                                </Form.Item>

                                <Form.Item
                                    name="user_remark"
                                    label={t("global.user_remark")}
                                    rules={[
                                        {
                                            required: true,
                                            message: t("validate.field_required"),
                                        },
                                    ]}
                                >
                                    <TextArea rows={2} className="w-10" />
                                </Form.Item>
                                <div className="button-group">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        block
                                        loading={this.state.loading}
                                    >
                                        {t("global.submit")}
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                        <Col
                            md={12}
                            xs={24}
                            style={{
                                padding: 5,
                                border: "solid",
                                borderWidth: 0.5,
                                borderColor: "lightgrey",
                            }}
                        >
                            <Row gutter={[8, 8]}>
                                <Col md={24}>
                                    <h4>{t("adjustment.current_balance")}</h4>
                                </Col>
                                <Col md={24}>
                                    <h2>{this.state.current_balance}</h2>
                                </Col>
                            </Row>

                            <Row gutter={[8, 8]}>
                                <Col md={24}>
                                    <h4>{t("adjustment.adjust_value")}</h4>
                                </Col>
                                <Col md={24}>
                                    <h2>{this.state.amount === "" ? "0" : this.state.amount}</h2>
                                </Col>
                            </Row>

                            <Row gutter={[8, 8]}>
                                <Col md={24}>
                                    <h4>{t("adjustment.balance_after_adjust")}</h4>
                                </Col>
                                <Col md={24}>
                                    <h2>
                                        {parseFloat(this.state.current_balance) +
                                        (this.state.amount === ""
                                            ? 0
                                            : parseFloat(this.state.amount))}
                                    </h2>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </PageContent>
        );
    }
}
const mapStateToProps = (state) => {
    const { walletAdjustment, wallet, header_data } = state;

    return {
        wallet_data: walletAdjustment.data,
        wallet_list_data: wallet.data,
        balance_data: wallet.balance_data,
        header_data: header_data.data,
    };
};

const mapDispatchToProps = {
    postAdjustment,
    getWalletTypeList,
    getWalletBalanceAmount,
};
export default connect(mapStateToProps, mapDispatchToProps)(Adjustment);
