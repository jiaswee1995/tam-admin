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
    // InputNumber,
    message,
    Checkbox
} from "antd";
import {
    getWalletTypeList,
    postEwtBlock
} from "../../../store/ducks/wallet/actions";
import PageContent from "../../../components/Content";
import { setLocale, t } from "react-i18nify";

import "./index.scss";

class Block extends Component {
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
            block_arr: [],
            block_json: []
        };

        this.onChange = this.onChange.bind(this);
        this.handleAmount = this.handleAmount.bind(this);
        this.handleWalletBalance = this.handleWalletBalance.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
    }

    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    handleChecked(e, type) {
        let block_arr;
        let block_json;

        block_json = [];
        block_arr = this.state.block_arr;

        block_arr[type] = e.target.checked;

        for (var key in block_arr) {
            block_json.push({ "type": key, "status": block_arr[key]});
        }

        this.setState({
            block_arr: block_arr,
            block_json: block_json
        });
    }

    onChange(e) {
        const { name, value } = e.target;

        this.setState({ [name]: value });
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

    handleSubmit(e){
        const data = {};
        data.user_id = this.state.userId;
        data.wallet_type = this.state.walletType;
        data.block_json = JSON.stringify(this.state.block_arr);
        this.props.postEwtBlock(data);
    }

    handleWalletBalance(e) {
        this.setState({ walletType: e });
    }

    componentDidMount() {
        this.props.getWalletTypeList();
        if (sessionStorage.getItem("tokenExpired") === "true") {
            sessionStorage.setItem("tokenExpired", "false");
        }
    }

    componentWillReceiveProps(nextProps) {

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

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }

        if (nextProps.post_data !== this.props.post_data) {
            if (nextProps.post_data.statusCode === 200) {
                message.success("Success");
            }else{
                message.error(nextProps.post_data.msg);
            }

            this.setState({loading: false});
        }
    }

    render() {
        const { Option } = Select;

        const layout = {
            labelCol: { span: 24 },
            wrapperCol: { span: 24 },
        };

        const onFinish = (values) => {
            const data = {};

            this.setState({
                loading: true,
            });

            data.user_id = this.state.userId;
            data.wallet_type = this.state.walletType;
            data.block_json = JSON.stringify(this.state.block_json);
            this.props.postEwtBlock(data);
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
                page_title={t("eblock.eblock")}
                main_menu_id={["sub2"]}
                sub_menu_id={["5"]}
            >
                <div className="bg-light p-4 m-5">
                    <Row style={{ minHeight: "70%" }}>
                        <Col
                            md={24}
                            xs={24}
                            style={{
                                padding: 24,
                                border: "solid",
                                borderWidth: 0.5,
                                borderColor: "lightgrey",
                            }}
                        >
                            <strong>{t("eblock.eblock")}</strong>
                            <Divider className="w-7" />
                            <Form
                                {...layout}
                                name="normal_login"
                                id="admin-login"
                                className="block-form"
                                initialValues={{
                                    remember: true,
                                }}
                                // onSubmit={this.handleAdminLogin}
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
                                    name="block_transfer"
                                >
                                    <Col
                                        md={24}
                                        xs={24}
                                        style={{
                                            padding: '0px 0px 24px'
                                        }}
                                    >
                                        <Checkbox onChange={(e) => this.handleChecked(e, "transfer")}>{t("eblock.block_transfer")}</Checkbox>
                                    </Col>
                                </Form.Item>
                                <Form.Item
                                    name="block_withdraw"
                                >
                                    <Col
                                        md={24}
                                        xs={24}
                                        style={{
                                            padding: '0px 0px 24px'
                                        }}
                                    >
                                        <Checkbox onChange={(e) => this.handleChecked(e, "withdraw")}>{t("eblock.block_withdrawal")}</Checkbox>
                                    </Col>
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
                    </Row>
                </div>
            </PageContent>
        );
    }
}
const mapStateToProps = (state) => {
    const { wallet, header_data } = state;

    return {
        post_data: wallet.post_data,
        wallet_list_data: wallet.data,
        header_data: header_data.data,
    };
};

const mapDispatchToProps = {
    postEwtBlock,
    getWalletTypeList
};
export default connect(mapStateToProps, mapDispatchToProps)(Block);
