import React, { Component } from "react";
import { Table, Button, Input, Row, Col, message, DatePicker } from "antd";
import { connect } from "react-redux";
import { t, setLocale } from "react-i18nify";
import { postSalesList } from "../../../store/ducks/salesList/actions";
import FilterFieldContainer from "../../../components/FilterFieldContainer";
import PageContent from "../../../components/Content";

import "./index.scss";

class listSales extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: "1",
            data: [],
            total_records: 0,
            page: 1,
            date_from: "",
            date_to: "",
            user_id: "",
            sponsor_id: "",
            order_field: "created_at",
            order_type: "desc",
            collapsed: false,
            searchText: "",
            searchedColumn: "",
            loading: false,
            sortedData: {},
        };

        this.onChange = this.onChange.bind(this);
        this.handleUserId = this.handleUserId.bind(this);
        this.handleSponsor = this.handleSponsor.bind(this);
        this.handleSummit = this.handleSummit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.setState({ loading: true });

        setLocale(sessionStorage.getItem("lang"));

        const data = {};

        data.user_id = this.state.user_id;
        data.sponsor_id = this.state.sponsor_id;
        data.date_from = this.state.date_from;
        data.date_to = this.state.date_to;
        data.page = 1;
        data.limit = 10;
        data.order_field = "created_at";
        data.order_type = "desc";

        this.props.postSalesList(data);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.sales_list_data !== this.props.sales_list_data) {
            if (nextProps.sales_list_data.statusCode === 200) {
                if (nextProps.sales_list_data.status === "success") {
                    this.setState({
                        data: nextProps.sales_list_data.data,
                        total_records: nextProps.sales_list_data.total_records,
                        loading: false,
                    });
                }
            } else {
                message.error(nextProps.sales_list_data.msg);
                this.setState({
                    loading: false,
                });
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }
    }

    handleChange = (pagination, filters, sorter) => {
        this.setState({ page: pagination.current }, () => {
            const data = {};

            data.user_id = this.state.user_id;
            data.sponsor_id = this.state.sponsor_id;
            data.page = pagination.current;
            data.date_from = this.state.date_from;
            data.date_to = this.state.date_to;
            data.limit = pagination.pageSize;
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

            this.props.postSalesList(data);

            this.setState({
                loading: true,
                sortedData: sorter,
            });
        });
    };

    handleDateChange(date, dateString) {
        this.setState({
            date_from: dateString[0],
            date_to: dateString[1],
        });
    }

    onChange(page, pageSize) {
        this.setState({ page: page }, () => {
            const data = {};

            data.user_id = this.state.user_id;
            data.sponsor_id = this.state.sponsor_id;
            data.page = page;
            data.date_from = this.state.date_from;
            data.date_to = this.state.date_to;
            data.limit = pageSize;

            this.props.postSalesList(data);
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

    handleSummit() {
        const data = {};

        data.user_id = this.state.user_id;
        data.sponsor_id = this.state.sponsor_id;
        data.order_field = this.state.order_field;
        data.order_type = this.state.order_type;
        data.date_from = this.state.date_from;
        data.date_to = this.state.date_to;
        data.page = 1;
        data.limit = 10;

        this.setState({
            user_id: this.state.user_id,
            sponsor_id: this.state.sponsor_id,
            loading: true,
        });

        this.props.postSalesList(data);
    }

    handleSponsor(e) {
        this.setState({
            sponsor_id: e.target.value,
        });
    }

    render() {
        const { data, total_records, page, loading, sortedData } = this.state;
        const sortedInfo = sortedData || {};
        const columns = [
            {
                title: t("table_list.no"),
                dataIndex: "id",
                key: "id",
                width: "5%",
                render: (text, record, index) => index + 1 + (page - 1) * 10,
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
                title: t("table_list.user_id"),
                dataIndex: "user_id",
                key: "user_id",
                sorter: (a, b) => a.user_id - b.user_id,
                sortOrder: sortedInfo.columnKey === "user_id" && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: t("sale.sponsor"),
                dataIndex: "sponsor",
                key: "sponsor",
                sorter: (a, b) => a.sponsor - b.sponsor,
                sortOrder: sortedInfo.columnKey === "sponsor" && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: t("table_list.created_at"),
                dataIndex: "created_at",
                key: "created_at",
                align: "right",
                sorter: (a, b) => a.created_at - b.created_at,
                sortOrder: sortedInfo.columnKey === "created_at" && sortedInfo.order,
                ellipsis: true,
                width: "15%",
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
                title: t("table_list.amount"),
                dataIndex: "total_amount",
                key: "total_amount",
                align: "right",
                sorter: (a, b) => a.total_amount - b.total_amount,
                sortOrder: sortedInfo.columnKey === "total_amount" && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: t("sale.total_bv"),
                dataIndex: "total_bv",
                key: "total_bv",
                align: "right",
                sorter: (a, b) => a.total_bv - b.total_bv,
                sortOrder: sortedInfo.columnKey === "total_bv" && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: t("sale.total_pv"),
                dataIndex: "total_pv",
                key: "total_pv",
                align: "right",
                sorter: (a, b) => a.total_pv - b.total_pv,
                sortOrder: sortedInfo.columnKey === "total_pv" && sortedInfo.order,
                ellipsis: true,
            },
        ];

        return (
            <PageContent
                page_title={t("sale.sale_list")}
                add_button_url=""
                main_menu_id={["sub5"]}
                sub_menu_id={["12"]}
            >
                <FilterFieldContainer>
                    <Row gutter={[16, 16]}>
                        <Col md={3} xs={24}>
                            <label>{t("filter.user_id")}</label>
                        </Col>
                        <Col md={6} xs={24}>
                            <Input
                                name="user_id"
                                value={this.state.user_id}
                                onChange={this.handleUserId}
                            />
                        </Col>

                        <Col md={3} xs={24}>
                            <label>{t("filter.sponsor")}</label>
                        </Col>
                        <Col md={6} xs={24}>
                            <Input
                                name="sponsor"
                                value={this.state.sponsor_id}
                                onChange={this.handleSponsor}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col md={3} xs={24} sm={{ span: 24 }}>
                            <label>{t("filter.date")}</label>
                        </Col>
                        <Col md={6} xs={24} sm={{ span: 24 }}>
                            <DatePicker.RangePicker
                                onChange={this.handleDateChange}
                                className="w-10"
                            />
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col md={6} xs={24}>
                            <Button
                                type="primary"
                                className="login-form-button"
                                onClick={this.handleSummit}
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
                    scroll={{ x: 1300 }}
                    loading={loading}
                    onChange={this.handleChange}
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
    const { salesList, header_data } = state;

    return {
        sales_list_data: salesList.data,
        header_data: header_data.data,
    };
};

const mapDispatchToProps = {
    postSalesList,
};

export default connect(mapStateToProps, mapDispatchToProps)(listSales);
