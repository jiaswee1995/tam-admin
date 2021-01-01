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
import { postNotiList } from "../../../store/ducks/notification/actions";
import { getLanguage } from "../../../store/ducks/language/actions";
import PageContent from "../../../components/Content";
import FilterFieldContainer from "../../../components/FilterFieldContainer";
import "./index.scss";

class notiList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total_records: 0,
            page: 1,
            order_field: "created_at",
            order_type: "asc",
            sortedData: { columnKey: "created_at", order: "desc" },
            loading: true,
            collapsed: false,
            date_range: [],
            min_rate: "",
            max_rate: "",
            wallet_type: [],
            module: "APP",
            module_id: "",
            lang_code: "",
            status: "",
            search: "",
            lang:[]
        };
        const data = {};
        data.page = 1;
        data.limit = 10;
        data.order_field = this.state.order_field;
        data.order_type = this.state.order_type;
        data.module_type = "APP";

        this.props.postNotiList(data);

        this.props.getLanguage();

        this.handleType = this.handleType.bind(this);
        this.handleModuleId = this.handleModuleId.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleSummit = this.handleSummit.bind(this);
        this.handleLangCode = this.handleLangCode.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    UNSAFE_componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.notification_data !== this.props.notification_data) {
            if (nextProps.notification_data.statusCode === 200) {
                if (nextProps.notification_data.status === "success") {
                    this.setState({
                        data: nextProps.notification_data.data,
                        total_records: nextProps.notification_data.total_records,
                        loading: false,
                    });
                }
            } else {
                message.error(nextProps.notification_data.msg);
                this.setState({
                    loading: false,
                });
            }
        }

        if (nextProps.language_data !== this.props.language_data) {
            let l_data = JSON.parse(nextProps.language_data);
            if (l_data.statusCode === 200) {
                if (l_data.status === "success") {
                    this.setState({
                        lang: l_data.data,
                    });
                }
            } 
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }
    }

    handleChange = (pagination, filters, sorter) => {
        const data = {};

        data.module_id = parseInt(this.state.module_id);
        data.module_type = this.state.module;
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
                : "asc";
        data.lang_code = this.state.lang_code;
        data.date_range = this.state.date_range;
        data.status = this.state.status;
        data.search = this.state.search;

        this.setState({
            loading: true,
            sortedData: sorter,
            page: pagination.current,
        });

        this.props.postNotiList(data);
    };

    handleSummit() {
        const data = {};

        data.module_id = parseInt(this.state.module_id);
        data.module_type = this.state.module;
        data.page = 1;
        data.limit = 10;
        data.order_field = this.state.order_field;
        data.order_type = this.state.order_type;
        data.lang_code = this.state.lang_code;
        data.date_range = this.state.date_range;
        data.status = this.state.status;
        data.search = this.state.search;

        this.setState({
            loading: true,
        });

        this.props.postNotiList(data);
    }

    handleModuleId(e) {
        if (e.target.value === "") {
            e.target.value = "";
        }

        this.setState({
            module_id: e.target.value,
        });
    }

    handleStatus(e) {
        if (e.target.value === "") {
            e.target.value = "";
        }

        this.setState({
            status: e.target.value,
        });
    }

    handleSearch(e) {
        if (e.target.value === "") {
            e.target.value = "";
        }

        this.setState({
            search: e.target.value,
        });
    }

    handleType(e) {
        this.setState({
            module: e,
        });
    }

    handleLangCode(e) {
        this.setState({
            lang_code: e,
        });
    }

    onDateChange(date, dateString) {
        this.setState({
            date_range: dateString,
        });
    }

    render() {
        const { Option } = Select;

        const {
            data,
            total_records,
            page,
            sortedData,
            loading,
            module_id,
            status,
            search,
            // lang_code,
            lang
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
                title: t("notification.modules_id"),
                dataIndex: "modules_id",
                key: "modules_id",
                sorter: (a, b) => a.modules_id - b.modules_id,
                sortOrder: sortedInfo.columnKey === "modules_id" && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: t("notification.locale"),
                dataIndex: "locale",
                key: "locale",
                sorter: (a, b) => a.locale.length - b.locale.length,
                sortOrder: sortedInfo.columnKey === "locale" && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: t("notification.subject"),
                dataIndex: "subject",
                key: "subject",
                sorter: (a, b) => a.subject - b.subject,
                sortOrder: sortedInfo.columnKey === "subject" && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: t("notification.message"),
                dataIndex: "message",
                key: "message",
                sorter: (a, b) => a.message - b.message,
                sortOrder: sortedInfo.columnKey === "message" && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: t("notification.sent_at"),
                dataIndex: "sent_at",
                key: "sent_at",
                sorter: (a, b) => a.sent_at - b.sent_at,
                sortOrder: sortedInfo.columnKey === "sent_at" && sortedInfo.order,
                ellipsis: true,
                align: "right",
            },
            {
                title: t("notification.sent_by"),
                dataIndex: "sent_by",
                key: "sent_by",
                sorter: (a, b) => a.sent_by - b.sent_by,
                sortOrder: sortedInfo.columnKey === "sent_by" && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: t("table_list.status"),
                dataIndex: "status",
                key: "status",
                sorter: (a, b) => a.status - b.status,
                sortOrder: sortedInfo.columnKey === "status" && sortedInfo.order,
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
                width: 250,
            },
        ];

        let lang_list = lang.map(function(item,i){
            return <Option value={item.locale}>{item.name}</Option>
        })

        return (
            <PageContent
                page_title={t("notification.notification_list")}
                // add_button_url="/notification/add"
                main_menu_id={["sub1"]}
                sub_menu_id={["27"]}
            >
                <FilterFieldContainer>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("filter.module_type")}</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Select
                                defaultValue={t("filter.please_select")}
                                className="w-10"
                                onChange={this.handleType}
                                required={true}
                            >
                                <Option value="API">{t("filter.api")}</Option>
                                <Option value="APP">{t("filter.app")}</Option>
                            </Select>
                        </Col>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("filter.module_id")}</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Input value={module_id} onChange={this.handleModuleId} />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("filter.lang_code")}</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Select
                                defaultValue={t("filter.please_select")}
                                className="w-10"
                                onChange={this.handleLangCode}
                                required={true}
                            >
                                {lang_list}
                            </Select>
                        </Col>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("filter.status")}</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Input value={status} onChange={this.handleStatus} />
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("filter.search")}</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Input value={search} onChange={this.handleSearch} />
                        </Col>

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
                        className="bg-light p-2 m-5"
                        rowKey="uid"
                        columns={columns}
                        dataSource={data}
                        dataIndex={true}
                        scroll={{ x: 1800 }}
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
    const { notification, header_data, language } = state;
    return {
        notification_data: notification.data,
        header_data: header_data.data,
        language_data: language.lang
    };
};
const mapDispatchToProps = {
    postNotiList,
    getLanguage
};
export default connect(mapStateToProps, mapDispatchToProps)(notiList);
