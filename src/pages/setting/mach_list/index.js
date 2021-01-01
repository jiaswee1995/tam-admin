import React, { Component } from "react";
import { Table, message } from "antd";
import { connect } from "react-redux";
import { postMechList } from "../../../store/ducks/betTrans/actions";
import PageContent from "../../../components/Content";
import { t, setLocale } from "react-i18nify";

import "./index.scss";

class machList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total_records: 0,
            page: 1,
            order_field: "mach_code",
            order_type: "asc",
            sortedData: {},
            loading: true,
        };
        const data = {};
        data.page = 1;
        data.limit = 10;

        this.props.postMechList(data);

        this.handleRow = this.handleRow.bind(this);
    }

    UNSAFE_componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.mech_list_data !== this.props.mech_list_data) {
            if (nextProps.mech_list_data.statusCode === 200) {
                if (nextProps.mech_list_data.status === "success") {
                    this.setState({
                        data: nextProps.mech_list_data.data,
                        total_records: nextProps.mech_list_data.total_records,
                        loading: false,
                    });
                }
            } else {
                message.error(nextProps.mech_list_data.msg);
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }
    }

    handleChange = (pagination, filters, sorter) => {
        const data = {};
        data.page = 1;
        data.limit = 20;
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

        this.props.postMechList(data);
    };

    handleRow = (record) => {
        this.props.history.push({
            pathname: "/setting/mach-list/edit",
            state: { data: record },
        });
    };

    render() {
        const { data, total_records, page, sortedData, loading } = this.state;
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
                title: t("mach.mach_code"),
                dataIndex: "mach_code",
                key: "mach_code",
                sorter: (a, b) => a.mach_code - b.mach_code,
                sortOrder: sortedInfo.columnKey === "mach_code" && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: t("mach.description"),
                dataIndex: "mach_desc",
                key: "mach_desc",
                sorter: (a, b) => a.mach_desc - b.mach_desc,
                sortOrder: sortedInfo.columnKey === "mach_desc" && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: t("mach.win_rate"),
                dataIndex: "win_rate",
                key: "win_rate",
                sorter: (a, b) => a.win_rate - b.win_rate,
                sortOrder: sortedInfo.columnKey === "win_rate" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("mach.win_big_rate"),
                dataIndex: "win_big_rate",
                key: "win_big_rate",
                sorter: (a, b) => a.win_big_rate - b.win_big_rate,
                sortOrder: sortedInfo.columnKey === "win_big_rate" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("mach.free_line"),
                dataIndex: "free_line",
                key: "free_line",
                sorter: (a, b) => a.free_line - b.free_line,
                sortOrder: sortedInfo.columnKey === "free_line" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("mach.free_hit"),
                dataIndex: "free_hit",
                key: "free_hit",
                sorter: (a, b) => a.free_hit - b.free_hit,
                sortOrder: sortedInfo.columnKey === "free_hit" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("mach.free_symbol"),
                dataIndex: "free_symbol",
                key: "free_symbol",
                sorter: (a, b) => a.free_symbol - b.free_symbol,
                sortOrder: sortedInfo.columnKey === "free_symbol" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("mach.free_token"),
                dataIndex: "free_token",
                key: "free_token",
                sorter: (a, b) => a.free_token - b.free_token,
                sortOrder: sortedInfo.columnKey === "free_token" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("mach.cur_bet"),
                dataIndex: "cur_bet",
                key: "cur_bet",
                sorter: (a, b) => a.cur_bet - b.cur_bet,
                sortOrder: sortedInfo.columnKey === "cur_bet" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("mach.cur_pay_line"),
                dataIndex: "cur_pay_line",
                key: "cur_pay_line",
                sorter: (a, b) => a.cur_pay_line - b.cur_pay_line,
                sortOrder: sortedInfo.columnKey === "cur_pay_line" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("mach.status"),
                dataIndex: "status",
                key: "status",
                sorter: (a, b) => a.status - b.status,
                sortOrder: sortedInfo.columnKey === "status" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
        ];

        return (
            <PageContent
                page_title={t("mach.machine_list")}
                add_button_url=""
                main_menu_id={[8]}
                sub_menu_id={[28]}
            >
                    <Table
                        rowKey="uid"
                        className="bg-light p-2 m-5"
                        columns={columns}
                        dataSource={data}
                        dataIndex={true}
                        scroll={{ x: 2000 }}
                        onChange={this.handleChange}
                        loading={loading}
                        pagination={{
                            defaultCurrent: 1,
                            total: total_records,
                            showTotal: (total) =>
                                `${t("table_list.total")} ${total} ${t("table_list.item")}`,
                        }}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    this.handleRow(record);
                                }, // click row
                            };
                        }}
                    />
            </PageContent>
        );
    }
}
const mapStateToProps = (state) => {
    const { betTransList, header_data } = state;
    return {
        mech_list_data: betTransList.mech_data,
        header_data: header_data.data,
    };
};
const mapDispatchToProps = {
    postMechList,
};
export default connect(mapStateToProps, mapDispatchToProps)(machList);
