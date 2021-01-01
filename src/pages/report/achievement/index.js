import React, { Component } from "react";
import {
    Table,
    Space,
    Button,
    Input,
    message,
    Row,
    Col,
    Tag,
    // Select,
    // Typography,
} from "antd";
import { connect } from "react-redux";
import { t, setLocale } from "react-i18nify";
import {
    postCycleList
} from "../../../store/ducks/report/actions";
import FilterFieldContainer from "../../../components/FilterFieldContainer";
import PageContent from "../../../components/Content";
import "./index.scss";
class achievement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: "dark",
            current: "1",
            data: [],
            total_records: 0,
            user_id: "",
            sponsor: "",
            contact_no: undefined,
            page: 1,
            order_field: "user_id",
            order_type: "asc",
            sortedData: {},
            loading: false,
            collapsed: false,
            searchText: "",
            searchedColumn: "",
            detail_data: [],
            button_loading: false,
            visible: false,
            new_password: "",
            edit_contact: "",
            edit_sponsor: "",
            status: "",
        };

        this.handleUserId = this.handleUserId.bind(this);
        this.handleContact = this.handleContact.bind(this);
        this.handleSponsor = this.handleSponsor.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleRow = this.handleRow.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleNewContact = this.handleNewContact.bind(this);
        this.handleNewSponsor = this.handleNewSponsor.bind(this);
        this.handleNewPass = this.handleNewPass.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));

        // const data = {};

        // data.user_id = "";
        // data.page = "1";
        // data.limit = "10";
        // data.order_field = this.state.order_field;
        // data.order_type = "asc";

        // this.props.postMemberList(data);
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
    }

    handleUserId(e) {
        this.setState({ user_id: e.target.value });
    }

    handleSponsor(e) {
        this.setState({ sponsor: e.target.value });
    }

    handleContact(e) {
        this.setState({ contact_no: e.target.value });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
            new_password: "",
        });
    };

    handleNewContact(e) {
        this.setState({
            edit_contact: e.target.value,
        });
    }

    handleNewSponsor(e) {
        this.setState({
            edit_sponsor: e.target.value,
        });
    }

    handleSearch() {
        const data = {};

        data.user_id = this.state.user_id;
        data.page = "1";
        data.limit = "10";
        data.sponsor = this.state.sponsor;
        data.order_field = this.state.order_field;
        data.order_type = this.state.order_type;

        this.setState(
            {
                user_id: this.state.user_id,
                contact_no: this.state.contact_no,
                loading: true,
            },
            () => {
                this.props.postCycleList(data);
            }
        );
    }

    handleReset() {
        this.setState({
            user_id: "",
            contact_no: "",
            sponsor: "",
        });
    }

    handleNewPass(e) {
        this.setState({
            new_password: e.target.value,
        });
    }

    handleStatus(e) {
        this.setState({
            status: e,
        });
    }

    handleChange = (pagination, filters, sorter) => {
        const data = {};

        data.user_id = this.state.user_id;
        data.contact_no = this.state.contact_no;
        data.sponsor = this.state.sponsor;
        data.page = pagination.current.toString();
        data.limit = pagination.pageSize.toString();
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

        this.props.postMemberList(data);
    };

    handleRow = (record) => {
        this.props.postMemberDetail(record.user_id);

        this.setState({
            loading: true,
        });
    };

    handleSubmit() {
        const data = {};

        data.email = this.state.detail_data.email;
        data.sponsor = this.state.edit_sponsor;
        data.status =
            this.state.status === ""
                ? this.state.detail_data.status
                : this.state.status;
        data.contact_no = this.state.edit_contact;
        data.password = this.state.new_password;

        this.props.postMemberUpdate(data);

        this.setState({
            button_loading: true,
        });
    }

    render() {
        const {
            data,
            total_records,
            page,
            sortedData,
            loading,
            // button_loading,
            // detail_data,
            // new_password,
            // edit_contact,
            // edit_sponsor,
        } = this.state;
        const sortedInfo = sortedData || {};
        // const { Option } = Select;
        // const { Title } = Typography;
        const columns = [
            {
                title: t("table_list.no"),
                dataIndex: "index",
                key: "index",
                width: "6%",
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
                title: t("table_list.amount"),
                dataIndex: "amount",
                key: "amount",
                sorter: (a, b) => a.amount - b.amount,
                sortOrder: sortedInfo.columnKey === "amount" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("achievement.block"),
                dataIndex: "block",
                key: "block",
                sorter: (a, b) => a.block - b.block,
                sortOrder: sortedInfo.columnKey === "block" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("achievement.delay"),
                dataIndex: "delay",
                key: "delay",
                sorter: (a, b) => a.delay - b.delay,
                sortOrder: sortedInfo.columnKey === "delay" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("achievement.earn"),
                dataIndex: "earn",
                key: "earn",
                sorter: (a, b) => a.earn - b.earn,
                sortOrder: sortedInfo.columnKey === "earn" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("achievement.limit"),
                dataIndex: "limit",
                key: "limit",
                sorter: (a, b) => a.limit - b.limit,
                sortOrder: sortedInfo.columnKey === "limit" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("achievement.id"),
                dataIndex: "id",
                key: "id",
                sorter: (a, b) => a.id - b.id,
                sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
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
                width: "9%",
                render: (text, record, index) => {
                    let color = "green";
                    let status = "";
                    switch (text.toLowerCase()) {
                        case "":
                            color = "";
                            status = text;
                            break;
                        case "i":
                            color = "red";
                            status = t("member_list.inactive");
                            break;
                        default:
                            color = "";
                            status = record.status;
                    }

                    return (
                        <>
                            <Tag color={color} key={index} class>
                                <span className="text-capitalize">{status}</span>
                            </Tag>
                        </>
                    );
                },
            },
            {
                title: t("table_list.created_at"),
                dataIndex: "started",
                key: "started",
                sorter: (a, b) => a.started - b.started,
                sortOrder: sortedInfo.columnKey === "started" && sortedInfo.order,
                ellipsis: true,
                width: "15%",
            },
        ];

        const local_setting = {
            emptyText: t("global.no_data"),
            page: 12,
        };

        return (
            <PageContent
                page_title={t("achievement.achievement")}
                add_button_url=""
                main_menu_id={["sub1"]}
                sub_menu_id={["2"]}
            >
                <FilterFieldContainer>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("filter.user_id")}:</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Input value={this.state.user_id} onChange={this.handleUserId} />
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("filter.sponsor")}:</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Input value={this.state.sponsor} onChange={this.handleSponsor} />
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 6 }} sm={{ span: 16 }} xs={{ span: 24 }}>
                            <Space>
                                <Button type="primary" onClick={this.handleSearch}>
                                    {t("filter.search")}
                                </Button>
                                <Button type="default" onClick={this.handleReset}>
                                    {t("filter.clear")}
                                </Button>
                            </Space>
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
                        onChange={this.handleChange}
                        loading={loading}
                        locale={local_setting}
                        pagination={{
                            defaultCurrent: 1,
                            total: total_records,
                            showTotal: (total) =>
                                `${t("table_list.total")} ${total} ${t("table.list.items")}`,
                        }}
                        // onRow={(record, rowIndex) => {
                        //     return {
                        //         onClick: (event) => {
                        //             this.handleRow(record);
                        //         }, // click row
                        //     };
                        // }}
                    />
            </PageContent>
        );
    }
}
const mapStateToProps = (state) => {
    const { report, header_data } = state;

    return {
        report_data: report.cycle_data,
        header_data: header_data.data,
    };
};

const mapDispatchToProps = {
    postCycleList
};
export default connect(mapStateToProps, mapDispatchToProps)(achievement);
