/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from "react";
import { Button, Col, Row, message, Collapse, Modal } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import { connect } from "react-redux";
import { t, setLocale } from "react-i18nify";

import {
    getUserMenuList,
    postGroupMenu,
    getMenuDetail,
} from "../../store/ducks/menu/actions";

import PageContent from "../../components/Content";

import "./userGroupMenu.scss";

class UserGroupMenu extends Component {
    constructor(props) {
        super(props);

        this.myRef = React.createRef();

        this.state = {
            userGroupList: [],
            menuList: [],
            loadings: [],
            userGroupSelected: "",
            menuListSelected: [],
            defaultCheckedMenu: [],
            visible: false,
            confirmLoading: false,
            treeSpecial: [],
            loadingTree: true,
            loadingUserTree: true,
        };

        this.callback = this.callback.bind(this);
        this.enterLoading = this.enterLoading.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.postGroupMenu = this.postGroupMenu.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    UNSAFE_componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    componentDidMount() {
        this.props.getUserMenuList();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.data !== this.props.data) {
            let list_data = nextProps.data.data;

            if (list_data.statusCode === 200) {
                const TreeUserGroup = () => {
                    return (
                        <Tree
                            // checkable
                            defaultExpandAll
                            defaultSelectedKeys={["0-0-0", "0-0-1"]}
                            defaultCheckedKeys={["0-0-0", "0-0-1"]}
                            onSelect={this.onSelect}
                            // onCheck={onCheck}
                            treeData={list_data.data.user_group_list}
                        />
                    );
                };

                if (this.state.treeSpecial.length <= 0) {
                    this.setState({
                        userGroupList: list_data.data.user_group_list,
                        menuList: list_data.data.menu_list,
                        treeSpecial: TreeUserGroup(),
                        loadingTree: false,
                        loadingUserTree: false,
                    });
                } else {
                    this.setState({
                        userGroupList: list_data.data.user_group_list,
                        menuList: list_data.data.menu_list,
                        loadingTree: false,
                    });
                }
            }
        }

        if (nextProps.post_data !== this.props.post_data) {
            let list_data = nextProps.post_data.data;

            if (list_data.statusCode === 200) {
                message.success("This is a success message");
                window.location.reload();
            } else {
                message.error("This is a error message");
            }

            this.setState({ visible: false });
            this.enterLoading(1, false);
        }

        if (nextProps.menu_data !== this.props.menu_data) {
            let list_data = nextProps.menu_data.data;

            if (list_data.statusCode === 200) {
                this.setState({ defaultCheckedMenu: list_data.data })
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }
    }

    callback(key) {

    }

    postGroupMenu() {
        this.setState({
            confirmLoading: true,
        });

        const data = {};
        data.user_group_selected = this.state.userGroupSelected;
        data.menu_selected = JSON.stringify(this.state.menuListSelected);

        this.props.postGroupMenu(data);

        this.enterLoading(1, true);
    }

    handleModal() {
        this.setState({
            visible: true,
        });
    }

    closeModal() {
        this.setState({
            visible: false,
        });
    }

    onSelect(selectedKeys, info) {
        // console.log('selected', selectedKeys, info);
        this.state.userGroupSelected = selectedKeys[0];

        const data = {};
        data.userGroupSelected = selectedKeys[0];

        this.props.getUserMenuList(data);
        this.props.getMenuDetail(data);
        this.setState({ loadingTree: true });
    }

    onCheck(checkedKeys, info) {
        // console.log('onCheck', checkedKeys, info);
        this.state.menuListSelected = checkedKeys;
    }

    enterLoading(key, bool) {
        this.setState(({ loadings }) => {
            const newLoadings = [...loadings];
            newLoadings[key] = bool;

            return {
                loadings: newLoadings,
            };
        });
    }

    render() {
        const {
            loadings,
            confirmLoading,
            treeSpecial,
            loadingTree,
            loadingUserTree,
        } = this.state;

        // const routes = [
        //     {
        //         path: 'index',
        //         breadcrumbName: 'Home',
        //     },
        //     {
        //         path: 'first',
        //         breadcrumbName: 'User Group',
        //     },
        //     {
        //         path: 'second',
        //         breadcrumbName: 'Menu Permission',
        //     },
        // ];
        // const separator = ">"
        //
        // const layout = {
        //     labelCol: { span: 24 },
        //     wrapperCol: { span: 24 },
        // };
        //
        // const tailLayout = {
        //     wrapperCol: {
        //         offset: 6,
        //         span: 24,
        //     },
        // };
        //
        // const { TreeNode } = Tree;

        const { Panel } = Collapse;

        // const treeData = this.state.userGroupList;

        const menuTreeData = this.state.menuList;

        const defaultChecked = this.state.defaultCheckedMenu;

        // const TreeUserGroup = () => {
        //     return (
        //         <Tree
        //             // checkable
        //             defaultExpandAll
        //             defaultSelectedKeys={['0-0-0', '0-0-1']}
        //             defaultCheckedKeys={['0-0-0', '0-0-1']}
        //             onSelect={this.onSelect}
        //             // onCheck={onCheck}
        //             treeData={treeData}
        //         />
        //     );
        // };

        const TreeMenu = () => {
            return (
                <Tree
                    checkable
                    defaultExpandedKeys={["0-0-0", "0-0-1"]}
                    defaultSelectedKeys={[]}
                    defaultCheckedKeys={defaultChecked}
                    onCheck={this.onCheck}
                    treeData={menuTreeData}
                />
            );
        };

        return (
            <PageContent
                page_title={t("user.user_group_menu_permission")}
                add_button_url=""
                main_menu_id={["sub3"]}
                sub_menu_id={["10"]}
            >
                <Modal
                    title={t("user.modal")}
                    visible={this.state.visible}
                    onOk={this.postGroupMenu}
                    onCancel={this.closeModal}
                    confirmLoading={confirmLoading}
                    okText="确认"
                    cancelText="取消"
                >
                    <p>test</p>
                </Modal>

                <div className="bg-light p-4 m-5">
                    <Row style={{ minHeight: "100vh" }}>
                        <Col span={24}>
                            <Col span={24}>
                                <Collapse
                                    defaultActiveKey={["1", "2"]}
                                    onChange={this.callback}
                                >
                                    <Panel header={t("user.user_group")} key="1">
                                        {loadingUserTree && t("user.loading_tree")}
                                        {!loadingUserTree && treeSpecial}
                                    </Panel>
                                    <Panel header={t("user.menu_list")} key="2">
                                        {loadingTree && t("user.loading_tree")}
                                        {!loadingTree && <TreeMenu />}
                                    </Panel>
                                </Collapse>

                                <div className="mt-1">
                                    <Button
                                        type="primary"
                                        icon={<SaveOutlined />}
                                        loading={loadings[1]}
                                        onClick={this.handleModal}
                                    >
                                        {t("user.save")}
                                    </Button>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                </div>
            </PageContent>
        );
    }
}

const mapStateToProps = (state) => {
    const { menu, header_data } = state;

    return {
        data: menu.data,
        post_data: menu.post_data,
        menu_data: menu.menu_data,
        header_data: header_data.data,
    };
};

const mapDispatchToProps = {
    getUserMenuList,
    postGroupMenu,
    getMenuDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserGroupMenu);
