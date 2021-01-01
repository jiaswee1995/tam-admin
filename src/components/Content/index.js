import React, { Component } from 'react';
import PropTypes from "prop-types";
import {  Layout } from 'antd';

import PageTitle from "../../components/PageTitle";
// import SideBar from "../../components/SideBar";
import Headers from "../../components/Header";

import "./Content.scss";

const { Footer, Content } = Layout;

class PageContent extends Component{
    render() {
        const { children, page_title, add_button_url, hide_title } = this.props;

        return (
            <Layout>
                <Layout>
                    <Headers/>

                    {(hide_title === false || hide_title === undefined) &&
                        <PageTitle
                            page_title={page_title}
                            add_button_url={add_button_url}
                        />
                    }

                    <Content>
                        {children}
                    </Content>

                    <Footer></Footer>
                </Layout>
            </Layout>
        )
    }
}

export default PageContent;

PageContent.propTypes = {
    page_title: PropTypes.string.isRequired,
    hide_title: PropTypes.bool,
    add_button_url: PropTypes.string.isRequired,
    main_menu_id: PropTypes.string.isRequired,
    sub_menu_id: PropTypes.string.isRequired,
};
