/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from 'react';
import {connect} from "react-redux";
import SortableTree from 'react-sortable-tree';
import { Col, Input, Row, message, Collapse, Modal, Badge} from "antd";
// import { DownOutlined } from '@ant-design/icons';
// import { Tree } from 'antd';
import { t, setLocale } from "react-i18nify";

import PageContent from "../../components/Content";
import FilterFieldContainer from "../../components/FilterFieldContainer";

import {getUserMenuList, postGroupMenu, getMenuDetail} from "../../store/ducks/menu/actions";
import {getMemberGeneology} from "../../store/ducks/geneology/actions";

import "./geneology.scss";
import 'react-sortable-tree/style.css';

const initialState = {
    username: ""
};

class Geneology extends Component{

    constructor(props){
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
            username: "",
            screenHeight: window.innerHeight - (136)
        }

        this.callback = this.callback.bind(this);
        this.enterLoading = this.enterLoading.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.postGroupMenu = this.postGroupMenu.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateHeight = this.updateHeight.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
    }

    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    componentDidMount() {
        this.updateHeight();
    }

    updateHeight() {
        this.setState({screenHeight: window.innerHeight - (136)});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.geneology_data !== this.props.geneology_data){
            let list_data = nextProps.geneology_data;

            if(list_data.statusCode === 200){
                this.setState({
                    userGroupList: list_data.data,
                    menuList: list_data.data,
                    loading: false
                })
            }else{
                this.setState({
                    userGroupList: [],
                    menuList: [],
                    loading: false
                })
            }
        }

        if(nextProps.post_data !== this.props.post_data){
            let list_data = nextProps.post_data.data;

            if(list_data.statusCode === 200){
                message.success('This is a success message');
            }else{
                message.error('This is a error message');
            }

            this.setState({visible: false});
            this.enterLoading(1, false);
        }

        if(nextProps.menu_data !== this.props.menu_data){
            let list_data = nextProps.menu_data.data;

            if(list_data.statusCode === 200){
                this.state.defaultCheckedMenu = list_data.data
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
          }
    }

    handleSearch(e){
        const data = {};
        data.user_id = this.state.username;
        this.props.getMemberGeneology(data);

        this.setState({loading: true})
    }

    handleUserName(e){
        this.setState({username: e.target.value});
    }

    callback(key) {

    }

    postGroupMenu() {
        this.setState({
            confirmLoading: true
        });

        const data = {};
        data.user_group_selected = this.state.userGroupSelected;
        data.menu_selected = JSON.stringify(this.state.menuListSelected);

        this.props.postGroupMenu(data);

        this.enterLoading(1, true);
    }

    handleClear(){
        this.setState({...initialState})
    }

    handleModal(){
        this.setState({
            visible: true
        })
    }

    closeModal(){
        this.setState({
            visible: false
        })
    }

    onSelect(selectedKeys) {
        this.state.userGroupSelected = selectedKeys[0];

        const data = {};
        data.userGroupSelected = selectedKeys[0];

        this.props.getMenuDetail(data);
    };

    onCheck(checkedKeys) {
        this.state.menuListSelected = checkedKeys;
    };

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
            // loadings,
             confirmLoading} = this.state;

        // const { TreeNode } = Tree;

        // const { Panel } = Collapse;

        // const treeData = this.state.userGroupList;

        // const menuTreeData = this.state.menuList;

        // const defaultChecked = this.state.defaultCheckedMenu;

        // const TreeUserGroup = () => {
        //     return (
        //         <Tree
        //             // checkable
        //             defaultExpandAll
        //             defaultSelectedKeys={['0-0-0', '0-0-1']}
        //             defaultCheckedKeys={['0-0-0', '0-0-1']}
        //             onSelect={this.onSelect}
        //             // onCheck={onCheck}
        //             showLine={false}
        //             switcherIcon={<DownOutlined />}
        //             treeData={treeData}
        //         />
        //     );
        // };

        // const TreeMenu = () => {
        //     return (
        //         <Tree
        //             checkable
        //             defaultExpandedKeys={['0-0-0', '0-0-1']}
        //             defaultSelectedKeys={[]}
        //             defaultCheckedKeys={defaultChecked}
        //             onCheck={this.onCheck}
        //             showLine={true}
        //             treeData={menuTreeData}
        //         />
        //     );
        // };

        // const { Search } = Input;

        return (
            <PageContent
                page_title={t('geneology.title_geneology')}
                add_button_url=""
                main_menu_id={['sub3']}
                sub_menu_id={['10']}
            >
                <Modal
                    title="Modal"
                    visible={this.state.visible}
                    onOk={this.postGroupMenu}
                    onCancel={this.closeModal}
                    confirmLoading={confirmLoading}
                    okText="确认"
                    cancelText="取消"
                >
                    <p>test</p>
                </Modal>

                <FilterFieldContainer
                    children={
                        <>
                            <Row gutter={[16, 16]}>
                                <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                    <label>{t('filter.user_id')}:</label>
                                </Col>
                                <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                    <Input
                                        value={this.state.username}
                                        onChange={this.handleUserName}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]}>
                                <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                    <button type="submit" className="ant-btn ant-btn-primary" onClick={this.handleSearch}><span>{t('filter.search')}</span></button>
                                    <button type="button" className="ant-btn" style={{margin: "0px 8px"}} onClick={this.handleClear}><span>{t('filter.clear')}</span>
                                    </button>
                                </Col>
                            </Row>
                        </>
                    }
                />
                {/*    <Col md={6} xs={24}>*/}
                {/*        <Search placeholder="Enter User Id" onSearch={this.handleSearch} loading={this.state.loading} enterButton style={{paddingBottom: "10px"}}/>*/}
                {/*    </Col>*/}
                {/*</FilterFieldContainer>*/}

                <div className="bg-light m-5 p-4">
                    <Row style={{minHeight : "100%"}}>
                        <Col span={24}>
                            <Col span={24}>
                                <Collapse defaultActiveKey={['1','2']} onChange={this.callback}>
                                    <div style={{ height: this.state.screenHeight }}>
                                        <SortableTree
                                            treeData={this.state.userGroupList}
                                            canDrag = {false}
                                            onChange={treeData => this.setState({userGroupList: treeData})}
                                            generateNodeProps = {({node}) => ({
                                                buttons: [
                                                    <div>
                                                        {/* {console.log(node)} */}
                                                        <button
                                                            className="border-0 bg_transparent"
                                                            disabled
                                                        >
                                                            <small>Status</small>:&nbsp;
                                                            {node.status === 'A' &&
                                                            <Badge status="success" />
                                                            }
                                                            {node.status !== 'A' &&
                                                            <Badge status="error" />
                                                            }
                                                        </button>
                                                    </div>
                                                ]
                                            })}
                                        />
                                    </div>

                                </Collapse>
                            </Col>
                        </Col>
                    </Row>
                </div>
            </PageContent>
        )
    }
}

const mapStateToProps = state => {
    const { menu, geneology, header_data } = state;

    return {
        data : menu.data,
        post_data : menu.post_data,
        menu_data : menu.menu_data,
        geneology_data : geneology.data,
        header_data : header_data.data
    }
};

const mapDispatchToProps = {
    getUserMenuList,
    postGroupMenu,
    getMenuDetail,
    getMemberGeneology
};

export default connect(mapStateToProps, mapDispatchToProps) (Geneology);