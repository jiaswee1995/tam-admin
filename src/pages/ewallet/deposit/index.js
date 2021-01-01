import React, { Component } from "react";
import {
    Table,
    message,
    Select,
    Row,
    Col,
    Input,
    DatePicker,
    Button,
} from "antd";
import { connect } from "react-redux";
import { postDeposit } from "../../../store/ducks/deposit/actions";
import PageContent from "../../../components/Content";
import { getWalletTypeList } from "../../../store/ducks/wallet/actions";
import FilterFieldContainer from "../../../components/FilterFieldContainer";
import "./index.scss";
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

class deposit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total_records: 0,
            page: 1,
            order_field: "created_at",
            order_type: "desc",
            sortedData: {},
            loading: true,
            user_id: "",
            wallet_type: [],
            sponsor_id: "",
            date_range: [],
            wallet: "",
        };
        const data = {};
        data.page = "1";
        data.limit = "100";
        data.order_field = this.state.order_field;
        data.order_type = this.state.order_type;

        this.props.postDeposit(data);
        this.props.getWalletTypeList();

        this.handleUserId = this.handleUserId.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleSummit = this.handleSummit.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleSponsorId = this.handleSponsorId.bind(this);
    }

    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.deposit_list_data !== this.props.deposit_list_data) {
            if (nextProps.deposit_list_data.statusCode === 200) {
                if (nextProps.deposit_list_data.status === "success") {
                    this.setState({
                        data: nextProps.deposit_list_data.data,
                        total_records: nextProps.deposit_list_data.total_records,
                        loading: false,
                    });
                }
            } else {
                message.error(nextProps.deposit_list_data.msg);
            }
        }

        if (nextProps.wallet_data !== this.props.wallet_data) {
            if (nextProps.wallet_data.statusCode === 200) {
                if (nextProps.wallet_data.status === "success") {
                    this.setState({
                        wallet_type: nextProps.wallet_data.data,
                    });
                }
            } else {
                message.error(nextProps.wallet_data.msg);
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }
    }

    handleType(e) {
        this.setState({
            wallet: e,
        });
    }

    onDateChange(date, dateString) {
        this.setState({
            date_range: dateString,
        });
    }

    handleUserId(e) {
        if (e.target.value === "") {
            e.target.value = "";
        }

        this.setState({
            user_id: e.target.value,
        });
    }

    handleSponsorId(e) {
        if (e.target.value === "") {
            e.target.value = "";
        }

        this.setState({
            sponsor_id: e.target.value,
        });
    }

    handleSummit() {
        const data = {};

        data.user_id = this.state.user_id;
        data.user_sponsor_id = this.state.sponsor_id;
        data.wallet_type = this.state.wallet;
        data.date_from = this.state.date_range[0];
        data.date_to = this.state.date_range[1];
        data.page = "1";
        data.limit = "10";
        data.order_field = this.state.order_field;
        data.order_type = this.state.order_type;
        data.date_range = this.state.date_range;

        this.setState({
            loading: true,
        });

        this.props.postDeposit(data);
    }

    handleChange = (pagination, filters, sorter) => {
        const data = {};

        data.user_id = this.state.user_id;
        data.user_sponsor_id = this.state.sponsor_id;
        data.wallet_type = this.state.wallet;
        data.date_from = this.state.date_range[0];
        data.date_to = this.state.date_range[1];
        data.page = pagination.current.toString();
        data.limit = "10";
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

        this.props.postDeposit(data);
    };

    render() {
        const { Option } = Select;
        let wallet_list;

        const {
            data,
            total_records,
            page,
            sortedData,
            loading,
            wallet_type,
            user_id,
            sponsor_id,
        } = this.state;
        const sortedInfo = sortedData || {};
        const columns = [
            {
                title: t("table_list.no"),
                dataIndex: "index",
                key: "index",
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
                width: "10%",
            },
            {
                title: t("table_list.wallet_type"),
                dataIndex: "wallet_type",
                key: "wallet_type",
                sorter: (a, b) => a.wallet_type - b.wallet_type,
                sortOrder: sortedInfo.columnKey === "wallet_type" && sortedInfo.order,
                ellipsis: true,
                width: "10%",
            },
            {
                title: t("table_list.doc_no"),
                dataIndex: "doc_no",
                key: "doc_no",
                sorter: (a, b) => a.doc_no - b.doc_no,
                sortOrder: sortedInfo.columnKey === "doc_no" && sortedInfo.order,
                ellipsis: true,
                width: "12%",
                render: (text, record, index) => {
                    return (
                        <a
                            href={record.transaction_hash}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {record.doc_no}
                        </a>
                    );
                },
            },
            {
                title: t("table_list.amount"),
                dataIndex: "amount",
                key: "amount",
                sorter: (a, b) => a.amount - b.amount,
                sortOrder: sortedInfo.columnKey === "amount" && sortedInfo.order,
                ellipsis: true,
                align: "right",
                width: 50,
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
                title: t("table_list.created_at"),
                dataIndex: "created_at",
                key: "created_at",
                sorter: (a, b) => a.created_at - b.created_at,
                sortOrder: sortedInfo.columnKey === "created_at" && sortedInfo.order,
                ellipsis: true,
                align: "right",
                width: 175,
            },
        ];

        wallet_list = wallet_type.map(function (item, i) {
            return (
                <Option label={item.b_display_code} value={item.currency_code}>
                    {item.b_display_code}
                </Option>
            );
        });

        return (
            <PageContent
                page_title={t("deposit.title_deposit")}
                add_button_url=""
                main_menu_id={[8]}
                sub_menu_id={[28]}
            >
                <FilterFieldContainer>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("filter.user_id")}:</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Input value={user_id} onChange={this.handleUserId} />
                        </Col>
                        <Col md={3} xs={24} sm={{ span: 24 }}>
                            <label>{t("filter.date")}:</label>
                        </Col>
                        <Col md={6} xs={24} sm={{ span: 24 }}>
                            <DatePicker.RangePicker
                                locale={locale}
                                onChange={this.onDateChange}
                                className="w-10"
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("filter.wallet_type")}:</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Select
                                defaultValue={t("filter.please_select")}
                                className="w-10"
                                onChange={this.handleType}
                                required={true}
                            >
                                <Option label={t("filter.please_select")} value="">
                                    {t("filter.please_select")}
                                </Option>
                                {wallet_list}
                            </Select>
                        </Col>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("filter.sponsor")} :</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Input value={sponsor_id} onChange={this.handleSponsorId} />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 6 }} sm={{ span: 16 }} xs={{ span: 24 }}>
                            <Button
                                type="primary"
                                onClick={this.handleSummit}
                                loading={loading}
                            >
                                {t("filter.search")}
                            </Button>
                        </Col>
                    </Row>
                </FilterFieldContainer>

                    <Table
                        rowKey="uid"
                        className="bg-light m-5 p-2"
                        columns={columns}
                        dataSource={data}
                        dataIndex={true}
                        scroll={{ x: 1000 }}
                        onChange={this.handleChange}
                        loading={loading}
                        pagination={{
                            defaultCurrent: 1,
                            total: total_records,
                            showTotal: (total) =>
                                `${t("table_list.total")} ${total} ${t("table_list.items")}`,
                        }}
                    />
            </PageContent>
        );
    }
}

const mapStateToProps = (state) => {
    const { deposit, wallet, header_data } = state;
    return {
        deposit_list_data: deposit.data,
        wallet_data: wallet.data,
        header_data: header_data.data,
    };
};

const mapDispatchToProps = {
    postDeposit,
    getWalletTypeList,
};

export default connect(mapStateToProps, mapDispatchToProps)(deposit);
