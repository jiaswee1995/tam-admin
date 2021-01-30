/* eslint-disable jsx-a11y/anchor-is-valid */
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
    Modal,
    Select,
    Typography,
} from "antd";
import { connect } from "react-redux";
import { t, setLocale } from "react-i18nify";
import { FormOutlined, LockFilled } from "@ant-design/icons";
import {
    postMemberList,
    postMemberDetail,
    postMemberUpdate,
} from "../../../store/ducks/memberList/actions";
import {
    postResetMember,
} from "../../../store/ducks/memberReset/actions";
import FilterFieldContainer from "../../../components/FilterFieldContainer";
import PageContent from "../../../components/Content";
import "./index.scss";
class listMember extends Component {
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
            loading: true,
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
            confirm_visible: false,
            change_visible: false,
            change_user : ""
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
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleConfirmChange = this.handleConfirmChange.bind(this);
    }

    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));

        const data = {};

        data.user_id = "";
        data.page = "1";
        data.limit = "10";
        data.order_field = this.state.order_field;
        data.order_type = "asc";

        this.props.postMemberList(data);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.member_list_data !== this.props.member_list_data) {
            if (nextProps.member_list_data.rst === '1') {
                this.setState({
                    data: nextProps.member_list_data.data.currentPageItems,
                    total_records: nextProps.member_list_data.data.totalPageItems,
                    loading: false,
                });
            } else {
                message.error(nextProps.member_list_data.msg);
                this.setState({
                    loading: false
                });
            }
        }

        if (nextProps.detail_data !== this.props.detail_data) {
            if (nextProps.detail_data.statusCode === 200) {
                if (nextProps.detail_data.status === "success") {
                    this.setState({
                        detail_data: nextProps.detail_data.data,
                        edit_contact: nextProps.detail_data.data.mobile,
                        edit_sponsor: nextProps.detail_data.data.sponsor,
                        visible: true,
                        loading: false,
                    });
                }
            } else {
                message.error(nextProps.detail_data.msg);
                this.setState({
                    loading: false
                });
            }
        }

        if (nextProps.update_data !== this.props.update_data) {
            if (nextProps.update_data.statusCode === 200) {
                if (nextProps.update_data.status === "success") {
                    message.success(nextProps.update_data.status);
                    this.setState({
                        visible: false,
                        button_loading: false,
                        loading: true,
                    });

                    const data = {};

                    data.user_id = "";
                    data.page = this.state.page.toString();
                    data.limit = "10";
                    data.order_field = this.state.order_field;
                    data.order_type = "asc";

                    this.props.postMemberList(data);
                }
            } else {
                message.error(nextProps.update_data.msg);
                this.setState({
                    loading: false,
                    button_loading: false,
                });
            }
        }

        if (nextProps.reset_data !== this.props.reset_data) {
            if (nextProps.reset_data.statusCode === 200) {
                if (nextProps.reset_data.status === "success") {
                    message.success(nextProps.reset_data.status);
                    this.setState({
                        confirm_visible: false,
                        visible: false,
                        button_loading: false,
                        loading: false,
                    });
            } else {
                message.error(nextProps.reset_data.msg);
                this.setState({
                    confirm_visible: false,
                    loading: false,
                    button_loading: false,
                });
            }
        }
    }
    }

    handleConfirmChange(e){
        const data = {};
        data.user_id = this.state.change_user;
        this.props.postResetMember(data);

        this.setState({
            button_loading: true,
        });
    }

    handleConfirm(e) {
        this.setState({ 
            confirm_visible: true,
            change_user: e.user_id
        });
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
            confirm_visible: false,
            change_visible: false,
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
        data.contact_no = this.state.contact_no;
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
                this.props.postMemberList(data);
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
            page: pagination.current.toString(),
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
        data.sponsor = this.state.edit_sponsor;
        data.user_id = this.state.user_id;
        data.status =
            this.state.status === ""
                ? status
                : this.state.status;
        data.contact_no = this.state.edit_contact;
        data.password = this.state.new_password;
        data.user_id = this.state.user_id;

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
            button_loading,
            detail_data,
            new_password,
            edit_contact,
            edit_sponsor,
            confirm_visible,
            // user_id,
            // change_visible
        } = this.state;
        const sortedInfo = sortedData || {};
        const { Option } = Select;
        const { Title } = Typography;
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
                dataIndex: "username",
                key: "username",
                sorter: (a, b) => a.username - b.username,
                sortOrder: sortedInfo.columnKey === "username" && sortedInfo.order,
                ellipsis: true,
                // width: "10%",
            },
            {
                title: t("member_list.contact_no"),
                dataIndex: "mobile_no",
                key: "mobile_no",
                sorter: (a, b) => a.mobile_no - b.mobile_no,
                sortOrder: sortedInfo.columnKey === "mobile_no" && sortedInfo.order,
                ellipsis: true,
                // align: "right",
            },
            {
                title: t("member_list.email"),
                dataIndex: "email",
                key: "email",
                sorter: (a, b) => a.email.length - b.email.length,
                sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: t("member_list.status"),
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
                        case "a":
                            status = t("member_list.activated");
                            break;
                        case "i":
                            color = "red";
                            status = t("member_list.inactive");
                            break;
                        default:
                            color = "";
                            status = text;
                    }

                    return (
                        <>
                            <Tag color={color} key={index} class>
                                <span className="text-capitalize">{status}</span>
                            </Tag>
                        </>
                    );
                },
            },{
                title: t("member_list.kyc_status"),
                dataIndex: "kyc_status",
                key: "kyc_status",
                sorter: (a, b) => a.kyc_status - b.kyc_status,
                sortOrder: sortedInfo.columnKey === "kyc_status" && sortedInfo.order,
                ellipsis: true,
                width: "9%",
                render: (text, record, index) => {
                    let color = "green";
                    let status = "";

                    switch (text.toLowerCase()) {
                        case "a":
                            status = t("member_list.activated");
                            break;
                        case "i":
                            color = "red";
                            status = t("member_list.inactive");
                            break;
                        default:
                            color = "";
                            status = text;
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
                title: t("admin_list.action"),
                key: "action",
                render: (text, record) => (
                    <Row gutter={[8,8]}>
                        <Col>
                            <Space
                                size="middle"
                                onClick={(a) => {
                                    this.handleRow(record);
                                }}
                            >
                                <a>
                                    <FormOutlined />
                                </a>
                            </Space>
                        </Col>
                        <Col>
                            <Space
                                size="middle"
                                onClick={(a) => {
                                    this.handleConfirm(record);
                                }}
                            >
                                <a>
                                    <LockFilled />
                                </a>
                            </Space>
                        </Col>
                    </Row>
                ),
                width: "10%",
            },
        ];

        const local_setting = {
            emptyText: t("global.no_data"),
            page: 12,
        };

        return (
            <PageContent
                page_title={t("member_list.member_list")}
                add_button_url=""
                main_menu_id={["sub1"]}
                sub_menu_id={["2"]}
            >
                <Modal
                    maskClosable
                    className="pb-0 bg-light"
                    visible={confirm_visible}
                    closable={true}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button
                            loading={button_loading}
                            type="primary"
                            onClick={this.handleConfirmChange}
                        >
                            {t("header.yes")}
                        </Button>,
                         <Button key="back" onClick={this.handleCancel}>
                         {t("header.no")}
                        </Button>
                    ]}
                >
                     <Title level={4}>{t("member_list.confirm_change_password")}</Title>
                     <div className="modal">
                         <div>{t("member_list.confirm_change")}</div>
                     </div>
                </Modal>
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
                    <Title level={4}>{t("member_list.edit_member")}</Title>
                    <div className="modal">
                        {/*<Row gutter={[16, 16]}>*/}
                        {/*    <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>*/}
                        {/*        <label>{t("table_list.user_id")}</label>*/}
                        {/*    </Col>*/}
                        {/*    <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>*/}
                        {/*        <Input*/}
                        {/*            name="user_id"*/}
                        {/*            defaultValue={detail_data.user_id}*/}
                        {/*            value={user_id}*/}
                        {/*            placeholder={t("table_list.user_id")}*/}
                        {/*            onChange={this.handleUserId}*/}

                        {/*        />*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
                        <Row gutter={[16, 16]}>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <label>{t("member_list.email")}</label>
                            </Col>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <Input
                                    name="email"
                                    type="email"
                                    value={detail_data.email}
                                    placeholder={t("admin_list.email")}
                                    disabled
                                />
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <label>{t("member_list.contact_no")}</label>
                            </Col>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <Input
                                    name="mobile"
                                    value={edit_contact}
                                    placeholder={t("member_list.contact_no")}
                                    onChange={this.handleNewContact}
                                    disabled
                                />
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]}>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <label>{t("member_list.sponsor")}</label>
                            </Col>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <Input
                                    name="sponsor"
                                    value={edit_sponsor}
                                    placeholder={t("admin_list.sponsor")}
                                    onChange={this.handleNewSponsor}
                                    disabled
                                />
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]}>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <label>{t("header.password")}</label>
                            </Col>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <Input
                                    className="oldpassword"
                                    type="password"
                                    autoComplete="new-password"
                                    value={new_password}
                                    placeholder={t("header.new_password")}
                                    onChange={this.handleNewPass}
                                />
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]}>
                            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <label>{t("member_list.status")}</label>
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
                                    <Option value={"D"}>{t("filter.delete")}</Option>;
                                </Select>
                            </Col>
                        </Row>
                    </div>
                </Modal>
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
                            <label>{t("filter.contact_no")}:</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Input
                                value={this.state.contact_no}
                                onChange={this.handleContact}
                            />
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
                        scroll={{ x: 1500 }}
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
    const { memberList, header_data, resetMember } = state;

    return {
        member_list_data: memberList.data,
        header_data: header_data.data,
        detail_data: memberList.detail_data,
        update_data: memberList.update_data,
        reset_data: resetMember.data
    };
};

const mapDispatchToProps = {
    postMemberList,
    postMemberDetail,
    postMemberUpdate,
    postResetMember
};
export default connect(mapStateToProps, mapDispatchToProps)(listMember);
