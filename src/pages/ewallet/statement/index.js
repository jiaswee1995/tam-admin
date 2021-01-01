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
    Table,
    DatePicker,
    message,
} from "antd";
import {
    postStatement,
    postBalanceSummary,
} from "../../../store/ducks/statement/actions";
import { getWalletTypeList } from "../../../store/ducks/wallet/actions";
import PageContent from "../../../components/Content";
import { setLocale, t } from "react-i18nify";
import localeCn from "antd/es/date-picker/locale/zh_CN";
import localeEn from "antd/es/date-picker/locale/en_US";
let locale;

switch (sessionStorage.getItem("lang")) {
    case "en":
        locale = localeEn;
        break;
    case "zh-CN":
        locale = localeCn;
        break;
    default:
        locale = localeEn;
        break;
}

class Statement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: "dark",
            current: "1",
            data: [],
            balance_data: [],
            total_records: 0,
            page: 1,
            user_id: "",
            email: "",
            wallet: "",
            date_from: "",
            date_to: "",
            order_field: "created_at",
            order_type: "desc",
            wallet_type: [],
            sortedData: {},
            loading: false,
            balance_loading: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.props.getWalletTypeList();
    }

    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    componentDidMount() {
        if (sessionStorage.getItem("tokenExpired") === "true") {
            sessionStorage.setItem("tokenExpired", "false");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.wallet_statement !== this.props.wallet_statement) {
            if (nextProps.wallet_statement.statusCode === 200) {
                if (nextProps.wallet_statement.status === "success") {
                    this.setState({
                        data: nextProps.wallet_statement.data,
                        total_records: nextProps.wallet_statement.total_records,
                        loading: false,
                    });
                } else {
                    message.error(nextProps.wallet_statement.msg);
                }
            } else {
                message.error(nextProps.wallet_statement.msg);
                this.setState({
                    loading: false,
                });
            }
        }

        if (nextProps.wallet_balance !== this.props.wallet_balance) {
            if (nextProps.wallet_balance.statusCode === 200) {
                if (nextProps.wallet_balance.status === "success") {
                    this.setState({
                        balance_data: nextProps.wallet_balance.data,
                        balance_loading: false,
                    });
                } else {
                    message.error(nextProps.wallet_balance.msg);
                }
            } else {
                message.error(nextProps.wallet_balance.msg);
                this.setState({
                    balance_loading: false,
                });
            }
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

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }
    }

    handleChange = (pagination, filters, sorter) => {
        const data = {};

        data.user_id = this.state.user_id;
        data.wallet_type = this.state.wallet;
        data.page = pagination.current;
        data.limit = pagination.pageSize;
        data.date_from = this.state.date_from;
        data.date_to = this.state.date_to;
        data.order_field =
            sorter.column !== undefined ? sorter.field : this.state.order_field;
        data.order_type =
            sorter.order !== false
                ? sorter.order === "ascend"
                ? "asc"
                : sorter.order === "descend"
                    ? "desc"
                    : "asc"
                : "asc";

        this.setState({
            loading: true,
            sortedData: sorter,
            page: pagination.current,
        });

        this.props.postStatement(data);
    };

    render() {
        const { Option } = Select;
        let wallet_list;

        const {
            data,
            total_records,
            page,
            wallet_type,
            sortedData,
            loading,
            balance_data,
            balance_loading,
        } = this.state;

        const sortedInfo = sortedData || {};

        const rangeConfig = {
            rules: [{ type: "array" }],
        };

        const layout = {
            labelCol: { span: 24 },
            wrapperCol: { span: 24 },
        };

        const columns = [
            {
                title: t("table_list.wallet_type"),
                dataIndex: "wallet_type",
                key: "wallet_type",
                width: "20%",
            },
            {
                title: t("table_list.wallet_total_in"),
                dataIndex: "total_in",
                key: "total_in",
                align: "right",
            },

            {
                title: t("table_list.wallet_total_out"),
                dataIndex: "total_out",
                key: "total_out",
                align: "right",
            },
            {
                title: t("table_list.balance"),
                dataIndex: "balance",
                key: "balance",
                align: "right",
            },
        ];

        const columns2 = [
            {
                title: t("table_list.no"),
                dataIndex: "id",
                key: "id",
                width: "5%",
                render: (text, record, index) => index + 1 + (page - 1) * 10,
            },

            {
                title: t("table_list.user_id"),
                dataIndex: "user_id",
                key: "user_id",
                sorter: (a, b) => a.user_id - b.user_id,
                sortOrder: sortedInfo.columnKey === "user_id" && sortedInfo.order,
                ellipsis: true,
            },

            {
                title: t("table_list.wallet_type"),
                dataIndex: "wallet_type",
                key: "wallet_type",
                sorter: (a, b) => a.wallet_type - b.wallet_type,
                sortOrder: sortedInfo.columnKey === "wallet_type" && sortedInfo.order,
                ellipsis: true,
            },

            {
                title: t("table_list.doc_no"),
                dataIndex: "doc_no",
                key: "doc_no",
                sorter: (a, b) => a.doc_no - b.doc_no,
                sortOrder: sortedInfo.columnKey === "doc_no" && sortedInfo.order,
                ellipsis: true,
            },

            {
                title: t("table_list.type"),
                dataIndex: "transaction_type",
                key: "transaction_type",
                sorter: (a, b) => a.transaction_type - b.transaction_type,
                sortOrder:
                    sortedInfo.columnKey === "transaction_type" && sortedInfo.order,
                ellipsis: true,
            },

            {
                title: t("table_list.amount"),
                dataIndex: "amount",
                key: "amount",
                sorter: (a, b) => a.amount - b.amount,
                sortOrder: sortedInfo.columnKey === "amount" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },

            {
                title: t("table_list.status"),
                dataIndex: "status",
                key: "status",
                sorter: (a, b) => a.status - b.status,
                sortOrder: sortedInfo.columnKey === "status" && sortedInfo.order,
                ellipsis: true,
                width: "5%",
            },

            {
                title: t("table_list.remark"),
                dataIndex: "admin_remark",
                key: "admin_remark",
                sorter: (a, b) => a.admin_remark - b.admin_remark,
                sortOrder: sortedInfo.columnKey === "admin_remark" && sortedInfo.order,
                ellipsis: true,
            },

            {
                title: t("table_list.created_at"),
                dataIndex: "created_at",
                key: "created_at",
                sorter: (a, b) => a.created_at - b.created_at,
                sortOrder: sortedInfo.columnKey === "created_at" && sortedInfo.order,
                ellipsis: true,
                align: "right",
                width: "15%",
            },
        ];

        const onFinish = (values) => {
            const data = {};
            const rangeValue = values["date"];

            if (rangeValue !== null && rangeValue !== undefined) {
                const value = {
                    ...values,
                    date: [
                        rangeValue[0].format("YYYY-MM-DD"),
                        rangeValue[1].format("YYYY-MM-DD"),
                    ],
                };

                data.date_from = value.date[0];
                data.date_to = value.date[1];
                this.setState({
                    date_from: value.date[0],
                    date_to: value.date[1],
                });
            }
            data.user_id = values.user_id;
            data.wallet_type = values.wallet_type;
            data.page = 1;
            data.limit = 10;
            data.order_field = this.state.order_field;
            data.order_type = this.state.order_type;

            this.setState({
                user_id: values.user_id,
                wallet: values.wallet_type,
                loading: true,
                balance_loading: true,
            });

            this.props.postStatement(data);
            this.props.postBalanceSummary(data);
        };

        wallet_list = wallet_type.map(function (item, i) {
            return <Option value={item.currency_code}>{item.b_display_code}</Option>;
        });

        return (
            <PageContent
                page_title={t("statement.title_statement")}
                add_button_url=""
                main_menu_id={["sub2"]}
                sub_menu_id={["7"]}
            >
                <div className="bg-light p-4 m-5">
                    <Row style={{ minHeight: "100%" }}>
                        <div className="left">
                            <Form
                                {...layout}
                                name="normal_login"
                                id="admin-login"
                                className="transfer-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="user_id"
                                    label={t("global.user_id")}
                                    rules={[
                                        { required: true, message: t("validate.field_required") },
                                    ]}
                                >
                                    <Input
                                        placeholder={t("global.user_id")}
                                        onSearch={(value) => console.log(value)}
                                        style={{ width: "100%" }}
                                    />
                                </Form.Item>

                                <Form.Item name="wallet_type" label={t("global.wallet_type")}>
                                    <Select
                                        defaultValue={t("filter.please_select")}
                                        style={{ width: "100%" }}
                                    >
                                        {wallet_list}
                                        <Option value="">--None--</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="date"
                                    label={t("global.date")}
                                    {...rangeConfig}
                                >
                                    <DatePicker.RangePicker
                                        locale={locale}
                                        style={{ width: "100%" }}
                                    />
                                </Form.Item>

                                <Form.Item className="tail">
                                    <div className="button-group">
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="login-form-button"
                                        >
                                            {t("global.submit")}
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                        <div className="right">
                            <Row>
                                <Col span={1} className="divide-col">
                                    <Divider
                                        className="divider"
                                        style={{ width: 3, height: "100%" }}
                                        type="vertical"
                                    />
                                </Col>
                                <Col span={23} className="content-col">
                                    <div className="right-content">
                                        <Row>
                                            <Col span={12} style={{ padding: 3 }}>
                                                <p>{t("statement.name")}:</p>
                                            </Col>
                                            <Col span={12} style={{ padding: 3 }}>
                                                <p>{t("statement.join_date")}:</p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={12} style={{ padding: 3 }}>
                                                <p>{t("statement.member_type")}:</p>
                                            </Col>
                                            <Col span={12} style={{ padding: 3 }}>
                                                <p>{t("statement.packageNode")}:</p>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={24} style={{ padding: 3 }}>
                                                <h2 className="H2">{t("statement.current_summary")}</h2>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={24} style={{ padding: 3 }}>
                                                <Table
                                                    rowKey="uid"
                                                    columns={columns}
                                                    pagination={false}
                                                    dataIndex={true}
                                                    dataSource={balance_data}
                                                    loading={balance_loading}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={24} style={{ padding: 3 }}>
                                                <h2 className="H2">{t("statement.transaction_details")}</h2>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={24} style={{ padding: 3 }}>
                                                <Table
                                                    rowKey="uid"
                                                    columns={columns2}
                                                    pagination={{
                                                        defaultCurrent: 1,
                                                        total: total_records,
                                                        showTotal: (total) =>
                                                            `${t("table_list.total")} ${total} ${t(
                                                                "table_list.items"
                                                            )}`,
                                                        // onChange:this.onChange,
                                                        style: { position: "relative", top: 15 },
                                                    }}
                                                    dataIndex={true}
                                                    dataSource={data}
                                                    scroll={{ x: 1300 }}
                                                    onChange={this.handleChange}
                                                    loading={loading}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </div>
            </PageContent>
        );
    }
}
const mapStateToProps = (state) => {
    const { walletStatement, wallet, header_data } = state;

    return {
        wallet_statement: walletStatement.data,
        wallet_balance: walletStatement.balance_data,
        wallet_type: wallet.data,
        header_data: header_data.data,
    };
};

const mapDispatchToProps = {
    postStatement,
    getWalletTypeList,
    postBalanceSummary,
};
export default connect(mapStateToProps, mapDispatchToProps)(Statement);
