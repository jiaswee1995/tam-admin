import React, { Component } from "react";
import {
    Table,
    Space,
    Button,
    Input,
    Row,
    Col,
    message,
    Modal,
    Typography,
    Select,
} from "antd";
import { connect } from "react-redux";
import { t, setLocale } from "react-i18nify";
import {
    postAdminList,
    postAdminDetail,
    postAdminUpdate,
} from "../../../store/ducks/adminList/actions";
import { postUserGroup } from "../../../store/ducks/adminAdd/actions";
import { FormOutlined } from "@ant-design/icons";
import FilterFieldContainer from "../../../components/FilterFieldContainer";
import PageContent from "../../../components/Content";

import "./index.scss";

const initialState = {
    email: "",
    phone: "",
    user_group: "",
};

class AdminList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            theme: "dark",
            current: "1",
            data: [],
            user_data: [],
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
            visible: false,
            detail_data: [],
            edit_user_group: "",
            default_user_group: "",
            status: "",
            new_password: "",
            button_loading: false,
        };

        const data = {};
        data.user_id = "";
        data.user_group = "";
        data.page = 1;
        data.limit = 10;

        this.props.postAdminList(data);

        const data2 = {};
        this.props.postUserGroup(data2);

        this.onChange = this.onChange.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.callback = this.callback.bind(this);
        this.handleUserGroup = this.handleUserGroup.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleNewPass = this.handleNewPass.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleUser = this.handleUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    UNSAFE_componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.admin_list_data !== this.props.admin_list_data) {
            if (nextProps.admin_list_data.statusCode === 200) {
                if (nextProps.admin_list_data.status === "success") {
                    this.setState({
                        data: nextProps.admin_list_data.data,
                        total_records: nextProps.admin_list_data.total_records,
                        loading: false,
                    });
                }
            } else {
                message.error(nextProps.admin_list_data.msg);
                this.setState({
                    loading: false,
                });
            }
        }

        if (nextProps.detail_data !== this.props.detail_data) {
            if (nextProps.detail_data.statusCode === 200) {
                if (nextProps.detail_data.status === "success") {
                    this.setState({
                        detail_data: nextProps.detail_data.data,
                        visible: true,
                        loading: false,
                        edit_user_group: nextProps.detail_data.data.user_group,
                    });
                }
            } else {
                message.error(nextProps.detail_data.msg);
                this.setState({
                    loading: false,
                });
            }
        }

        if (nextProps.update_data !== this.props.update_data) {
            if (nextProps.update_data.statusCode === 200) {
                if (nextProps.update_data.status === "success") {
                    message.success(nextProps.update_data.status);
                    this.setState({
                        visible: false,
                        loading: true,
                        button_loading: false,
                    });

                    const data = {};
                    data.user_id = "";
                    data.user_group = "";
                    data.page = this.state.page;
                    data.limit = 10;

                    this.props.postAdminList(data);
                }
            } else {
                message.error(nextProps.update_data.msg);
                this.setState({
                    loading: false,
                    button_loading: false,
                });
            }
        }

        if (nextProps.user_group_data !== this.props.user_group_data) {
            if (nextProps.user_group_data.statusCode === 200) {
                if (nextProps.user_group_data.status === "success") {
                    this.setState({
                        user_data: nextProps.user_group_data.data,
                    });
                }
            } else {
                message.error(nextProps.user_group_data.msg);
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

    handleStatus(e) {
        this.setState({ status: e });
    }

    handleUser(e) {
        this.setState({ edit_user_group: e });
    }

    handleSubmit() {
        const data = {};
        let status = "";
        
        switch (this.state.detail_data.status) {
            case "Active" :
                status = "A";
                break;
                
            case "Inactive" :
                status = "I";
                break;

            case "Terminate":
                status = "T";
                break;
            
            default:
                status = this.state.status;
                break;
        }

        data.email = this.state.detail_data.email;
        data.user_group_id =
            this.state.edit_user_group === ""
                ? ""
                : this.state.edit_user_group.toString();
        data.status =
            this.state.status === ""
                ? status
                : this.state.status;
        data.new_password = this.state.new_password;

        this.props.postAdminUpdate(data);

        this.setState({
            button_loading: true,
        });
    }

    handleEdit(e) {
        this.setState({
            visible: true,
        });
    }

    callback(key) {}

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
                data.user_group = this.state.user_group;
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

            this.props.postAdminList(data);
        });
    }

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: "" });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            new_password: "",
            edit_user_group: "",
        });
    };

    handleNewPass(e) {
        this.setState({
            new_password: e.target.value,
        });
    }
    render() {
        const {
            data,
            total_records,
            page,
            loading,
            user_data,
            button_loading,
            detail_data,
            default_user_group,
        } = this.state;
        const { Title } = Typography;
        const { Option } = Select;
        const columns = [
            {
                title: t("table_list.no"),
                dataIndex: "id",
                key: "id",
                width: "5%",
                render: (record, text, index) => index + 1 + (page - 1) * 10,
            },
            {
                title: t("admin_list.email"),
                dataIndex: "email",
                key: "email",
            },
            {
                title: t("admin_list.user_group"),
                dataIndex: "user_group",
                key: "user_group",
            },
            {
                title: t("admin_list.action"),
                key: "action",
                render: (text, record) => (
                    <Space
                        size="middle"
                        onClick={(a) => {
                            this.props.postAdminDetail(record.email);
                            this.setState({
                                loading: true,
                                edit_email: record.email,
                                default_user_group: record.user_group,
                            });
                        }}
                    >
                        <FormOutlined />
                    </Space>
                ),
            },
        ];

        let user_group;

        user_group = user_data.map(function (item, i) {
            return (
                <Option key={i} value={item.id}>
                    {item.name}
                </Option>
            );
        });

        return (
            <PageContent
                page_title={t("admin_list.admin_list")}
                add_button_url="/admin/add"
            >
                <Modal
                    maskClosable
                    className="pb-0 bg-light"
                    visible={this.state.visible}
                    closable={true}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            {t("header.return")}
                        </Button>,
                        <Button
                            loading={button_loading}
                            type="primary"
                            onClick={this.handleSubmit}
                        >
                            {t("header.change")}
                        </Button>,
                    ]}
                >
                    <Title level={4}>{t("admin_list.edit_admin")}</Title>
                    <div className="modal">
                        <Row gutter={[16, 16]}>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <label>{t("admin_list.email")}</label>
                            </Col>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <Input
                                    className="oldpassword"
                                    type="email"
                                    value={detail_data.email}
                                    autoComplete="new-password"
                                    placeholder={t("admin_list.email")}
                                    disabled
                                />
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <label>{t("header.new_password")}</label>
                            </Col>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <Input
                                    className="oldpassword"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder={t("header.new_password")}
                                    onChange={this.handleNewPass}
                                />
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <label>{t("admin_list.status")}</label>
                            </Col>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <Select
                                    defaultValue={detail_data.status}
                                    name="user_group"
                                    required={true}
                                    style={{ width: "100%" }}
                                    onChange={this.handleStatus}
                                >
                                    <Option value={"I"}>{t("filter.inactive")}</Option>;
                                    <Option value={"A"}>{t("filter.active")}</Option>;
                                    <Option value={"T"}>{t("filter.terminate")}</Option>;
                                </Select>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <label>{t("admin_list.user_group")}</label>
                            </Col>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <Select
                                    defaultValue={default_user_group}
                                    name="user_group"
                                    required={true}
                                    style={{ width: "100%" }}
                                    onChange={this.handleUser}
                                >
                                    {user_group}
                                </Select>
                            </Col>
                        </Row>
                    </div>
                </Modal>
                <FilterFieldContainer
                    children={
                        <>
                            <Row gutter={[16, 16]}>
                                <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                    <label>{t("filter.email")}</label>
                                </Col>
                                <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                    <Input value={this.state.email} onChange={this.handleEmail} />
                                </Col>

                                <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                    <label>{t("filter.user_group")}</label>
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
                                    <button
                                        type="submit"
                                        className="ant-btn ant-btn-primary"
                                        onClick={this.handleSearch}
                                    >
                                        <span>{t("filter.search")}</span>
                                    </button>
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
                        </>
                    }
                />

                <Table
                    rowKey="uid"
                    className="bg-light p-2 m-5"
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
                            `${t("table_list.total")} ${total} ${t("table_list.item")}`,
                    }}
                />
            </PageContent>
        );
    }
}

const mapStateToProps = (state) => {
    const { adminList, header_data, adminAdd } = state;

    return {
        admin_list_data: adminList.data,
        header_data: header_data.data,
        user_group_data: adminAdd.user_data,
        detail_data: adminList.detail_data,
        update_data: adminList.update_data,
    };
};

const mapDispatchToProps = {
    postAdminList,
    postUserGroup,
    postAdminDetail,
    postAdminUpdate,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminList);
