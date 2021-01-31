import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import {connect} from "react-redux";
// import { Settings } from '@ant-design/pro-layout'
import "./SideBar.scss";
// import Headers from "../Header";
import { Typography, Layout } from 'antd';
import { Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, UserOutlined, WalletOutlined} from '@ant-design/icons';
import { postSidebarMenu } from "../../store/ducks/menu/actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { createFromIconfontCN } from '@ant-design/icons';
import {setLocale, t} from "react-i18nify";

const { SubMenu } = Menu;

const { Sider} = Layout;


class SideBar extends Component{

    constructor(props){
        super(props);
        this.state = {
            theme: 'dark',
            current: '1',
            openKeys: this.props.openSub !== undefined ? this.props.openSub : [''],
            selectedKey: this.props.selectKey !== undefined ? this.props.selectKey : [''],
            sidebar_list: [],
            screenWidth: null,
            collapsed: true,
            rootSubmenuKeys: [],
            broken: false
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.changeTheme = this.changeTheme.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onOpenChange = this.onOpenChange.bind(this);

        // this.rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6'];
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    changeTheme(value) {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    }

    handleClick(e) {
        this.setState({
            collapsed: this.state.broken === false ? false : true,
            selectedKey: e.key,
        });
    }

    onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys: [latestOpenKey] });
        }
        else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.sidebar_data !== this.props.sidebar_data){
            let list_data = nextProps.sidebar_data.data;
            let parent_list_arr = [];

            if (list_data.statusCode === 200){
                list_data.data.parent_list.map(function (index, value) {
                    parent_list_arr.push(value.id);
                    return null;
                })
                this.setState({
                    sidebar_list: list_data.data.menu_list,
                    rootSubmenuKeys: parent_list_arr
                })
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            // this.props.postSidebarMenu();
            this.setState({});
        }
    }

    updateWindowDimensions() {
        this.setState({ screenWidth: window.innerWidth });
    }

    componentDidMount() {
        // this.props.postSidebarMenu();
        window.addEventListener("resize", this.updateWindowDimensions());
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions)
    }

    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    render() {

        const { Title } = Typography;

        const { sidebar_list } = this.state;

        const IconFont = createFromIconfontCN({
            scriptUrl: [
                '//at.alicdn.com/t/font_1893490_aywqabbeev6.js'
            ],
        });

        let sidebar_menu;

        // const {
        //     openSub
        // } = this.props;
        sidebar_menu = this.state.sidebar_list.map(function (parent, i) {
            if (parent.parent_id === 0 && parent.url === ""){
                return (
                    <SubMenu key={parent.id} icon={<IconFont type={parent.icon} />} title={parent.name}>
                        {sidebar_list.map(function (child, j) {
                            if (child.parent_id === parent.id && child.b_show === 1){
                                return (
                                    <Menu.Item key={child.id}>
                                        <Link to={child.url}>
                                            {child.name}
                                        </Link>
                                    </Menu.Item>
                                );
                            }
                            return null;
                        })}
                    </SubMenu>
                );
            }else if (parent.parent_id === 0 && parent.url !== ""){
                return (<Menu.Item icon={<IconFont type={parent.icon} />} key={parent.id}>
                    <Link to={parent.url}>
                        {parent.name}
                    </Link>
                </Menu.Item>);
            }
            return null;
        });

        return (

            <Sider 
                breakpoint={"xs"}
                collapsedWidth={0}
                collapsed={this.state.collapsed}
                onCollapse={collapsed => {
                    this.setState({
                        collapsed: collapsed
                    });
                }}
                onBreakpoint={broken => {
                    this.setState({
                        broken: broken
                    });
                }}
                zeroWidthTriggerStyle={{top:10, background:'white', color:'black',fontSize:28}}
            >
                 {/* <span className= 'lang' style={{position: "absolute", lineHeight: 3.5, left: "100%"}}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: this.toggle,
                    })}
                </span> */}
                <Title className="text-center text-light" style={{color:'white'}} level={3}>{t('global.app_name')}</Title>
               
                    <Menu
                        theme={this.state.theme}
                        onClick={this.handleClick}
                        mode="inline"
                        onOpenChange={this.onOpenChange}
                        className="sad"
                        openKeys={this.state.openKeys}
                        defaultSelectedKeys={this.state.selectedKey}
                        >

                        {/*{sidebar_menu}*/}

                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            <Link to="/dashboard">
                                Dashboard
                            </Link>
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Member">
                            <Menu.Item key="2">
                                <Link to="/member">
                                    Member List
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/kyc/approval">
                                    KYC Approval
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<WalletOutlined />} title="Ewallet">
                            <Menu.Item key="4">
                                <Link to="/ewallet/depositApproval">
                                    Deposit Approval
                                </Link>
                            </Menu.Item>
                        </SubMenu>

                        {/*<SubMenu key="sub6" icon={<ApartmentOutlined />} title="Network Tree">*/}
                        {/*    <Menu.Item key="14">*/}
                        {/*        <Link to="/member/geneology">*/}
                        {/*            Referral Tree*/}
                        {/*        </Link>*/}
                        {/*    </Menu.Item>*/}
                        {/*</SubMenu>*/}

                        {/*<SubMenu key="sub2" icon={<WalletOutlined />} title="Ewallet">*/}
                        {/*    <Menu.Item key="5">*/}
                        {/*        <Link to="/ewallet/adjustment">*/}
                        {/*            Adjustment*/}
                        {/*        </Link>*/}
                        {/*    </Menu.Item>*/}
                        {/*    <Menu.Item key="6">*/}
                        {/*        <Link to="/ewallet/transfer">*/}
                        {/*            Transfer*/}
                        {/*        </Link>*/}
                        {/*    </Menu.Item>*/}
                        {/*    <Menu.Item key="7">*/}
                        {/*        <Link to="/ewallet/statement">*/}
                        {/*            Statement*/}
                        {/*        </Link>*/}
                        {/*    </Menu.Item>*/}
                        {/*    <Menu.Item key="8">*/}
                        {/*        <Link to="/ewallet/withdrawApproval">*/}
                        {/*            Withdrawal Approval*/}
                        {/*        </Link>*/}
                        {/*    </Menu.Item>*/}
                        {/*    <Menu.Item key="9">*/}
                        {/*        <Link to="/ewallet/balance">*/}
                        {/*            Balance*/}
                        {/*        </Link>*/}
                        {/*    </Menu.Item>*/}
                        {/*    /!* <SubMenu key="sub3" title="Submenu">*/}

                        {/*    </SubMenu> *!/*/}
                        {/*</SubMenu>*/}

                        {/*<Menu.Item key="11" icon={<AppstoreOutlined />}>*/}
                        {/*    <Link to="/admin/list">*/}
                        {/*        Admin List*/}
                        {/*    </Link>*/}
                        {/*</Menu.Item>*/}

                        {/*<SubMenu key="sub3" icon={<GroupOutlined />} title="User Group">*/}
                        {/*    <Menu.Item key="10">*/}
                        {/*        <Link to="/user/group-menu">*/}
                        {/*            Menu Permission*/}
                        {/*        </Link>*/}
                        {/*    </Menu.Item>*/}
                        {/*</SubMenu>*/}

                        {/*<SubMenu key="sub5" icon={<SettingOutlined />} title="Sales">*/}
                        {/*    <Menu.Item key="12">*/}
                        {/*        <Link to="/sales/list">*/}
                        {/*           List*/}
                        {/*        </Link>*/}
                        {/*    </Menu.Item>*/}
                        {/*    <Menu.Item key="13">*/}
                        {/*        <Link to="/sales/topup">*/}
                        {/*           Topup*/}
                        {/*        </Link>*/}
                        {/*    </Menu.Item>*/}
                        {/*</SubMenu>*/}

                        {/*<SubMenu key="sub7" icon={<SettingOutlined />} title="Report">*/}
                        {/*    <Menu.Item key="12">*/}
                        {/*        <Link to="/report/sales">*/}
                        {/*            Referral Sales Report*/}
                        {/*        </Link>*/}
                        {/*    </Menu.Item>*/}
                        {/*</SubMenu>*/}
                    </Menu>
            </Sider>

        )
    }
}

const mapStateToProps = state => {
    const { menu, header_data } = state;

    return {
        sidebar_data: menu.sidebar_data,
        header_data : header_data.data
    }
};

const mapDispatchToProps = {
    postSidebarMenu
};

export default connect(mapStateToProps, mapDispatchToProps) (SideBar);

SideBar.propTypes = {
    openSub: PropTypes.string,
    selectKey: PropTypes.string
};
