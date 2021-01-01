import React, { Component } from "react";
import {
    Table,
    message,
    Select,
    Row,
    Col,
    Input,
    Button,
    DatePicker,
} from "antd";
import { connect } from "react-redux";
import { t, setLocale } from "react-i18nify";

import PageContent from "../../../components/Content";
import FilterFieldContainer from "../../../components/FilterFieldContainer";

import {
    postBetList,
    postMechList,
} from "../../../store/ducks/betTrans/actions";
import { getWalletTypeList } from "../../../store/ducks/wallet/actions";

import "./index.scss";

class betTrans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total_records: 0,
            page: 1,
            order_field: "created_at",
            order_type: "desc",
            sortedData: { columnKey: "created_at", order: "descend" },
            loading: true,
            collapsed: false,
            searchText: "",
            searchedColumn: "",
            mech_data: [],
            mach_code: "",
            user_id: "",
            date_range: [],
            min_rate: "",
            max_rate: "",
            wallet_type: [],
            wallet: "",
        };

        const data = {};
        data.page = 1;
        data.limit = 10;
        data.order_field = this.state.order_field;
        data.order_type = this.state.order_type;

        this.props.postBetList(data);

        const mData = {};
        mData.page = 1;
        mData.limit = 20;

        this.props.postMechList(mData);
        this.props.getWalletTypeList();

        this.handleType = this.handleType.bind(this);
        this.handleUserId = this.handleUserId.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleMin = this.handleMin.bind(this);
        this.handleMax = this.handleMax.bind(this);
        this.handleCode = this.handleCode.bind(this);
        this.handleSummit = this.handleSummit.bind(this);
    }

    UNSAFE_componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.bet_list_data !== this.props.bet_list_data) {
            if (nextProps.bet_list_data.statusCode === 200) {
                if (nextProps.bet_list_data.status === "success") {
                    this.setState({
                        data: nextProps.bet_list_data.data,
                        total_records: nextProps.bet_list_data.total_records,
                        loading: false,
                    });
                }
            } else {
                message.error(nextProps.bet_list_data.msg);
            }
        }

        if (nextProps.mech_list_data !== this.props.mech_list_data) {
            if (nextProps.mech_list_data.statusCode === 200) {
                if (nextProps.mech_list_data.status === "success") {
                    this.setState({
                        mech_data: nextProps.mech_list_data.data,
                    });
                }
            } else {
                message.error(nextProps.mech_list_data.msg);
            }
        }

        if (nextProps.wallet_type !== this.props.wallet_type) {
            if (nextProps.wallet_type.statusCode === 200) {
                if (nextProps.wallet_type.status === "success") {
                    this.setState({ wallet_type: nextProps.wallet_type.data });
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
        let win_rate_range = [];
        let min_rate =
            this.state.min_rate !== "" ? parseInt(this.state.min_rate) : 0;
        let max_rate =
            this.state.max_rate !== "" ? parseInt(this.state.max_rate) : 0;

        data.user_id = this.state.user_id;
        data.wallet_type = this.state.wallet;
        data.page = pagination.current;
        data.limit = 10;
        data.order_field =
            sorter.column !== undefined ? sorter.field : this.state.order_field;
        data.order_type =
            sorter.order !== false
                ? sorter.order === "ascend"
                ? "asc"
                : sorter.order === "descend"
                    ? "desc"
                    : "asc"
                : this.state.order_type;
        data.mach_code = this.state.mach_code;
        data.date_range = this.state.date_range;

        if (min_rate !== 0) {
            win_rate_range.push(min_rate);
        }

        if (max_rate !== 0) {
            win_rate_range.push(max_rate);
        }

        data.pay_win_rate_range = win_rate_range;

        this.setState({
            loading: true,
            sortedData: sorter,
            page: pagination.current,
        });

        this.props.postBetList(data);
    };

    handleSummit() {
        const data = {};
        let win_rate_range = [];
        let min_rate =
            this.state.min_rate !== "" ? parseInt(this.state.min_rate) : 0;
        let max_rate =
            this.state.max_rate !== "" ? parseInt(this.state.max_rate) : 0;

        data.user_id = this.state.user_id;
        data.wallet_type = this.state.wallet;
        data.page = 1;
        data.limit = 10;
        data.order_field = this.state.order_field;
        data.order_type = this.state.order_type;
        data.mach_code = this.state.mach_code;
        data.date_range = this.state.date_range;

        if (min_rate !== 0) {
            win_rate_range.push(min_rate);
        }

        if (max_rate !== 0) {
            win_rate_range.push(max_rate);
        }

        data.pay_win_rate_range = win_rate_range;

        this.setState({ loading: true });

        this.props.postBetList(data);
    }

    handleUserId(e) {
        if (e.target.value === "") {
            e.target.value = "";
        }

        this.setState({ user_id: e.target.value });
    }

    handleType(e) {
        this.setState({ wallet: e });
    }

    handleCode(e) {
        this.setState({
            mach_code: e,
        });
    }

    handleMin(e) {
        this.setState({
            min_rate: e.target.value,
        });
    }

    handleMax(e) {
        this.setState({
            max_rate: e.target.value,
        });
    }

    onDateChange(date, dateString) {
        this.setState({
            date_range: dateString[0] !== "" ? dateString : [],
        });
    }

    render() {
        const { Option } = Select;
        let mech_list, wallet_list;

        const {
            data,
            total_records,
            page,
            sortedData,
            loading,
            mech_data,
            user_id,
            min_rate,
            max_rate,
            wallet_type,
        } = this.state;
        const sortedInfo = sortedData || {};
        const columns = [
            {
                title: t("table_list.no"),
                dataIndex: "index",
                key: "index",
                width: "3%",
                render: (text, record, index) => index + 1 + (page - 1) * 10,
            },
            {
                title: t("bet.mach_code"),
                dataIndex: "mach_code",
                key: "mach_code",
                sorter: (a, b) => a.mach_code - b.mach_code,
                sortOrder: sortedInfo.columnKey === "mach_code" && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: t("table_list.user_id"),
                dataIndex: "user_id",
                key: "user_id",
                sorter: (a, b) => a.member_id.length - b.member_id.length,
                sortOrder: sortedInfo.columnKey === "member_id" && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: t("bet.trans_id"),
                dataIndex: "id",
                key: "id",
                sorter: (a, b) => a.id - b.id,
                sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("bet.bet_line"),
                dataIndex: "bet_line",
                key: "bet_line",
                sorter: (a, b) => a.bet_line - b.bet_line,
                sortOrder: sortedInfo.columnKey === "bet_line" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("bet.bet_token"),
                dataIndex: "bet_token",
                key: "bet_token",
                sorter: (a, b) => a.bet_token - b.bet_token,
                sortOrder: sortedInfo.columnKey === "bet_token" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("bet.bet_tot"),
                dataIndex: "bet_tot",
                key: "bet_tot",
                sorter: (a, b) => a.bet_tot - b.bet_tot,
                sortOrder: sortedInfo.columnKey === "bet_tot" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("bet.pay_line"),
                dataIndex: "pay_line",
                key: "pay_line",
                sorter: (a, b) => a.pay_line - b.pay_line,
                sortOrder: sortedInfo.columnKey === "pay_line" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("bet.pay_token"),
                dataIndex: "pay_token",
                key: "pay_token",
                sorter: (a, b) => a.pay_token - b.pay_token,
                sortOrder: sortedInfo.columnKey === "pay_token" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("bet.pay_tot"),
                dataIndex: "pay_tot",
                key: "pay_tot",
                sorter: (a, b) => a.pay_tot - b.pay_tot,
                sortOrder: sortedInfo.columnKey === "pay_tot" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("bet.pay_rate"),
                dataIndex: "pay_rate",
                key: "pay_rate",
                sorter: (a, b) => a.pay_rate - b.pay_rate,
                sortOrder: sortedInfo.columnKey === "pay_rate" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("bet.pay_win_rate"),
                dataIndex: "pay_win_rate",
                key: "pay_win_rate",
                sorter: (a, b) => a.pay_win_rate - b.pay_win_rate,
                sortOrder: sortedInfo.columnKey === "pay_win_rate" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("bet.stop_at"),
                dataIndex: "stop_at",
                key: "stop_at",
                sorter: (a, b) => a.stop_at - b.stop_at,
                sortOrder: sortedInfo.columnKey === "stop_at" && sortedInfo.order,
                ellipsis: true,
                align: "right",
                width: 330,
            },
            {
                title: t("table_list.created_at"),
                dataIndex: "created_at",
                key: "created_at",
                sorter: (a, b) => a.created_at - b.created_at,
                sortOrder: sortedInfo.columnKey === "created_at" && sortedInfo.order,
                ellipsis: true,
                align: "right",
                width: 250,
            },
        ];

        mech_list = mech_data.map(function (item, i) {
            return <Option value={item.mach_code}>{item.mach_code}</Option>;
        });

        wallet_list = wallet_type.map(function (item, i) {
            return (
                <Option label={item.b_display_code} value={item.currency_code}>
                    {item.b_display_code}
                </Option>
            );
        });

        return (
            <PageContent
                page_title={t("bet.bet_transaction_list")}
                add_button_url=""
                main_menu_id={["sub1"]}
                sub_menu_id={["27"]}
            >
                <FilterFieldContainer>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("filter.machine_code")}</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Select
                                defaultValue={t("filter.please_select")}
                                className="w-10"
                                onChange={this.handleCode}
                                required={true}
                            >
                                {mech_list}
                            </Select>
                        </Col>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("filter.user_id")}</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Input value={user_id} onChange={this.handleUserId} />
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
                        <Col md={3} xs={24} sm={{ span: 24 }}>
                            <label>{t("bet.pay_win_rate")}</label>
                        </Col>
                        <Col md={6} xs={24} sm={{ span: 24 }}>
                            <Input.Group compact>
                                <Input
                                    style={{
                                        width: "40%",
                                        textAlign: "center",
                                    }}
                                    placeholder={t("filter.minimum")}
                                    value={min_rate}
                                    onChange={this.handleMin}
                                />
                                <Input
                                    className="site-input-split"
                                    style={{
                                        width: "20%",
                                        borderLeft: 0,
                                        borderRight: 0,
                                        pointerEvents: "none",
                                        textAlign: "center"
                                    }}
                                    placeholder="~"
                                    disabled
                                />
                                <Input
                                    className="site-input-right"
                                    style={{
                                        width: "40%",
                                        textAlign: "center",
                                    }}
                                    placeholder={t("filter.maximum")}
                                    value={max_rate}
                                    onChange={this.handleMax}
                                />
                            </Input.Group>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("filter.wallet_type")}</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Select
                                defaultValue={t("filter.please_select")}
                                className="w-10"
                                onChange={this.handleType}
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
                        </Col>
                    </Row>
                </FilterFieldContainer>
                
                    <Table
                        rowKey="uid"
                        className="bg-light p-2 m-5"
                        columns={columns}
                        dataSource={data}
                        dataIndex={true}
                        scroll={{ x: 2100 }}
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
    const { betTransList, wallet, header_data } = state;
    return {
        bet_list_data: betTransList.data,
        mech_list_data: betTransList.mech_data,
        wallet_type: wallet.data,
        header_data: header_data.data,
    };
};
const mapDispatchToProps = {
    postBetList,
    postMechList,
    getWalletTypeList,
};
export default connect(mapStateToProps, mapDispatchToProps)(betTrans);
