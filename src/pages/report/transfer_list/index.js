import React, { Component } from "react";
import {
    Table,
    message,
    Row,
    Col,
    Input,
    DatePicker,
    Button,
    Select,
} from "antd";
import { connect } from "react-redux";
import { t, setLocale } from "react-i18nify";
import { postTransferList } from "../../../store/ducks/report/actions";
import {
    getWalletTypeList,
    getWalletSetting,
} from "../../../store/ducks/wallet/actions";
import PageContent from "../../../components/Content";
import "./index.scss";
import FilterFieldContainer from "../../../components/FilterFieldContainer";
const { Option } = Select;

const initialState = {
    wallet_from: "Please Select",
    wallet_to: "Please Select",
    user_id: "",
    sponsor_user_id: "",
    date_from: "",
    date_to: "",
};

class ConvertList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total_records: 0,
            page: "1",
            order_field: "created_at",
            order_type: "desc",
            wallet_from: "CASH",
            wallet_to: "",
            sortedData: {},
            loading: true,
            user_id: "",
            date_range: "",
            sponsor_user_id: "",
            date_from: "",
            date_to: "",
            wallet_type: [],
            wallet_to_list: [],
        };
        const data = {};
        data.page = "1";
        data.limit = "10";
        data.wallet_from = this.state.wallet_from;
        data.order_field = this.state.order_field;
        data.order_type = this.state.order_type;

        this.props.postTransferList(data);
        this.props.getWalletTypeList();

        this.handleUserId = this.handleUserId.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleSponsorUserId = this.handleSponsorUserId.bind(this);
        this.handleSummit = this.handleSummit.bind(this);
        this.handleTypeFrom = this.handleTypeFrom.bind(this);
        this.handleTypeTo = this.handleTypeTo.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }
    UNSAFE_componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.report_data !== this.props.report_data) {
            if (nextProps.report_data.statusCode === 200) {
                if (nextProps.report_data.status === "success") {
                    this.setState({
                        data: nextProps.report_data.data,
                        total_records: nextProps.report_data.total_records,
                        loading: false,
                    });
                }
            } else {
                message.error(nextProps.report_data.msg);
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

        if (nextProps.wallet_setting !== this.props.wallet_setting) {
            if (nextProps.wallet_setting.statusCode === 200) {
                if (nextProps.wallet_setting.status === "success") {
                    if (
                        nextProps.wallet_setting.data[0].transfer_setting.wallets !==
                        null &&
                        nextProps.wallet_setting.data[0].transfer_setting.wallets.length > 0
                    ) {
                        this.setState({
                            wallet_to_list:
                            nextProps.wallet_setting.data[0].transfer_setting.wallets,
                        });
                    } else {
                        this.setState({
                            wallet_to_list: [],
                        });
                    }
                }
            } else {
                message.error(nextProps.wallet_setting.msg);
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }
    }

    handleClear() {
        this.setState({ ...initialState });
    }

    handleSummit(e) {
        const data = {};
        data.page = "1";
        data.limit = "10";
        data.user_id = this.state.user_id;
        data.sponsor_user_id = this.state.sponsor_user_id;
        data.wallet_from = this.state.wallet_from;
        data.wallet_to = this.state.wallet_from;
        data.date_from = this.state.date_from;
        data.date_to = this.state.date_to;
        data.order_field = this.state.order_field;
        data.order_type = this.state.order_type;

        this.props.postTransferList(data);
    }

    handleTypeFrom(e) {
        this.setState({
            wallet_from: e,
        });
        //
        // const data = {};
        // data.wallet_type = e;
        //
        // this.props.getWalletSetting(data);
    }

    handleTypeTo(e) {
        this.setState({
            wallet_to: e,
        });
    }

    handleUserId(e) {
        this.setState({ user_id: e.target.value });
    }

    handleSponsorUserId(e) {
        this.setState({ sponsor_user_id: e.target.value });
    }

    onDateChange(date, dateString) {
        this.setState({
            date_from: dateString[0],
            date_to: dateString[1],
        });
    }

    handleChange = (pagination, filters, sorter) => {
        const data = {};
        data.page = pagination.current;
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

        this.props.postTransferList(data);
    };

    render() {
        const {
            data,
            total_records,
            page,
            sortedData,
            loading,
            user_id,
            sponsor_user_id,
            wallet_type,
            wallet_from,
        } = this.state;
        const sortedInfo = sortedData || {};
        const columns = [
            {
                title: t("table_list.no"),
                dataIndex: "index",
                key: "index",
                width: 50,
                render: (text, record, index) => index + 1 + (page - 1) * 10,
            },
            {
                title: t("report_transfer.user_id_from"),
                dataIndex: "member_from",
                key: "member_from",
                sorter: (a, b) => a.member_from - b.member_from,
                sortOrder: sortedInfo.columnKey === "member_from" && sortedInfo.order,
                ellipsis: true,
                width: "8%",
            },
            {
                title: t("report_transfer.user_id_to"),
                dataIndex: "member_to",
                key: "member_to",
                sorter: (a, b) => a.member_to - b.member_to,
                sortOrder: sortedInfo.columnKey === "member_to" && sortedInfo.order,
                ellipsis: true,
                width: "8%",
            },
            {
                title: t("table_list.amount"),
                dataIndex: "amount_to",
                key: "amount_to",
                sorter: (a, b) => a.amount_to - b.amount_to,
                sortOrder: sortedInfo.columnKey === "amount_to" && sortedInfo.order,
                ellipsis: true,
                align: "right",
                width: "5%",
            },
            {
                title: t("report_transfer.wallet_from"),
                dataIndex: "wallet_from",
                key: "wallet_from",
                sorter: (a, b) => a.wallet_from - b.wallet_from,
                sortOrder: sortedInfo.columnKey === "wallet_from" && sortedInfo.order,
                ellipsis: true,
                width: "5%",
            },
            {
                title: t("report_transfer.wallet_to"),
                dataIndex: "wallet_to",
                key: "wallet_to",
                sorter: (a, b) => a.wallet_to - b.wallet_to,
                sortOrder: sortedInfo.columnKey === "wallet_to" && sortedInfo.order,
                ellipsis: true,
                width: "5%",
            },
            {
                title: t("table_list.doc_no"),
                dataIndex: "doc_no",
                key: "doc_no",
                sorter: (a, b) => a.doc_no - b.doc_no,
                sortOrder: sortedInfo.columnKey === "doc_no" && sortedInfo.order,
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
                width: "10%",
                align: "right",
            },
        ];

        let wallet_list;

        wallet_list = wallet_type.map(function (item, i) {
            return (
                <Option label={item.b_display_code} value={item.currency_code}>
                    {item.b_display_code}
                </Option>
            );
        });

        return (
            <PageContent
                page_title={t("report_transfer.transfer_list")}
                add_button_url=""
                main_menu_id={[8]}
                sub_menu_id={[28]}
            >
                <FilterFieldContainer>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("filter.user_id")}</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Input value={user_id} onChange={this.handleUserId} />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("filter.sponsor_user_id")}</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Input
                                value={sponsor_user_id}
                                onChange={this.handleSponsorUserId}
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col md={3} xs={24} sm={{ span: 24 }}>
                            <label>{t("filter.date")}</label>
                        </Col>
                        <Col md={6} xs={24} sm={{ span: 24 }}>
                            <DatePicker.RangePicker
                                onChange={this.onDateChange}
                                className="w-10"
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("filter.wallet_type")}</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Select
                                defaultValue={t('filter.please_select')}
                                value={wallet_from}
                                className="w-10"
                                onChange={this.handleTypeFrom}
                                required={true}
                            >
                                {wallet_list}
                            </Select>
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
                            <button
                                type="button"
                                className="ant-btn"
                                style={{ margin: "0px 8px" }}
                                onClick={this.handleClear}
                            >
                                <span>{t("filter.clear")}</span>
                            </button>
                        </Col>
                    </Row>
                </FilterFieldContainer>  
                    <Table
                        rowKey="uid"
                        className="bg-light p-2 m-5"
                        columns={columns}
                        dataSource={data}
                        dataIndex={true}
                        scroll={{ x: 1300 }}
                        onChange={this.handleChange}
                        loading={loading}
                        pagination={{
                            defaultCurrent: 1,
                            total: total_records,
                            showTotal: (total) =>
                                `${t("table_list.total")} ${total} ${t("table_list.item")}`,
                        }}
                    />
            </PageContent>
        );
    }
}
const mapStateToProps = (state) => {
    const { report, wallet, header_data } = state;
    return {
        report_data: report.data,
        wallet_type: wallet.data,
        wallet_setting: wallet.arr_data,
        header_data: header_data.data,
    };
};
const mapDispatchToProps = {
    postTransferList,
    getWalletTypeList,
    getWalletSetting,
};
export default connect(mapStateToProps, mapDispatchToProps)(ConvertList);
