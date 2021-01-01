import React, { Component } from "react";
import { Table, Space, Button, Input, message } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Highlighter from "react-highlight-words";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import { postTranslationList } from "../../../store/ducks/translation/actions";
import PageContent from "../../../components/Content";
import { setLocale, t } from "react-i18nify";

import "./index.scss";

const initialState = {
    email: "",
    phone: "",
    user_group: "",
};

class translationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            theme: "dark",
            current: "1",
            data: [],
            total_records: 0,
            email: "",
            phone: "",
            page: 1,
            user_group: "",
            admin_list_data: [],
            collapsed: false,
            searchText: "",
            searchedColumn: "",
            loading: true,
        };

        const data = {};
        data.type = "";
        data.page = 1;
        data.limit = 10;

        this.props.postTranslationList(data);
        this.onChange = this.onChange.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.callback = this.callback.bind(this);
        this.handleUserGroup = this.handleUserGroup.bind(this);
    }

    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.translation_list_data !== this.props.translation_list_data) {
            if (nextProps.translation_list_data.statusCode === 200) {
                if (nextProps.translation_list_data.status === "success") {
                    this.setState({
                        data: nextProps.translation_list_data.data,
                        total_records: nextProps.translation_list_data.total_records,
                        loading: false,
                    });
                }
            } else {
                message.error(nextProps.translation_list_data.msg);
                this.setState({
                    loading: false,
                });
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }
    }

    toggle = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    handleClear() {
        this.setState({ ...initialState });
    }

    handleEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleUserGroup(e) {
        this.setState({ user_group: e.target.value });
    }

    callback(key) {
        console.log(key);
    }

    handleSearch() {
        this.setState(
            {
                email: this.state.email,
                phone: this.state.contact_no,
                loading: true,
            },
            () => {
                const data = {};

                data.email = this.state.email;
                data.contactNo = this.state.contact_no;
                data.page = 1;
                data.limit = 10;

                this.props.postAdminList(data);
            }
        );
    }

    onChange(page, pageSize) {
        this.setState({ page: page }, () => {
            const data = {};

            data.email = this.state.email;
            data.page = this.state.page;
            data.limit = 10;

            this.setState({
                loading: true,
            });

            this.props.postTranslationList(data);
        });
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
                             setSelectedKeys,
                             selectedKeys,
                             confirm,
                             clearFilters,
                         }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        this.handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: "" });
    };

    render() {
        const { data, total_records, page, loading } = this.state;

        const columns = [
            {
                title: t("table_list.no"),
                dataIndex: "index",
                key: "index",
                width: "5%",
                render: (record, text, index) => index + 1 + (page - 1) * 10,
            },
            {
                title: t("table_list.locale"),
                dataIndex: "locale",
                key: "locale",
            },
            {
                title: t("table_list.name"),
                dataIndex: "name",
                key: "name",
            },
            {
                title: t("table_list.type"),
                dataIndex: "type",
                key: "type",
            },
            {
                title: t("table_list.value"),
                dataIndex: "value",
                key: "value",
            },
            {
                title: t("table_list.action"),
                key: "action",
                render: (text, record) => (
                    <Space size="middle">
                        <Link
                            to={{
                                pathname: "/translation/edit",
                                state: {
                                    id: record.id,
                                    locale: record.locale,
                                    name: record.name,
                                    type: record.type,
                                    value: record.value,
                                },
                            }}
                        >
                            <EditOutlined />
                        </Link>
                    </Space>
                ),
                align: "right",
            },
        ];

        return (
            <PageContent
                page_title={t("translate.title_translate")}
                add_button_url="/translation/add"
                sub_menu_id={["11"]}
            >
                {/* <FilterFieldContainer
                    children={
                        <>
                            <Row gutter={[16, 16]}>
                                <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                    <label>Email:</label>
                                </Col>
                                <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                    <Input
                                        value={this.state.email}
                                        onChange={this.handleEmail}
                                    />
                                </Col>
                            </Row>

                          <Row gutter={[16, 16]}>
                                <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                    <label>User Group:</label>
                                </Col>
                                <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                    <Input
                                        value={this.state.user_group}
                                        onChange={this.handleUserGroup}
                                    />
                                </Col>
                            </Row>

                            <Row gutter={[16, 16]}>
                                <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                    <button type="submit" className="ant-btn ant-btn-primary" onClick={this.handleSearch}><span>Search</span></button>
                                    <button type="button" className="ant-btn" style={{margin: "0px 8px"}} onClick={this.handleClear}><span>Clear</span>
                                    </button>
                                </Col>
                            </Row>
                        </>
                    }
                    /> */}
                    <Table
                        className="bg-light p-2 m-5"
                        rowKey="uid"
                        columns={columns}
                        dataSource={data}
                        dataIndex={true}
                        onChange={this.onChange}
                        scroll={{ x: 700 }}
                        loading={loading}
                        pagination={{
                            defaultCurrent: 1,
                            onChange: this.onChange,
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
    const { translation, header_data } = state;

    return {
        translation_list_data: translation.data,
        header_data: header_data.data,
    };
};

const mapDispatchToProps = {
    postTranslationList,
};
export default connect(mapStateToProps, mapDispatchToProps)(translationList);
