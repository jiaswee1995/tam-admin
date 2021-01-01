import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, Col, PageHeader, Row} from "antd";
import {Link} from "react-router-dom";
import { t } from "react-i18nify";

import "./PageTitle.scss";

class PageTitle extends Component{
    render() {
        const { page_title, add_button_url } = this.props;

        return (
            <div className="page-title">
                <Row>
                    <Col md={12} xs={20}>
                        <PageHeader
                            className="site-page-header"
                            title={page_title}
                        />
                    </Col>
                    <Col md={12} xs={4}>
                        {(add_button_url !== undefined && add_button_url !== "") &&
                        <div className="header-right-container">
                            <Button type="primary" className="login-form-button">
                                <Link to={add_button_url} className="login-form-button">{t('global.add')}</Link>
                            </Button>
                        </div>
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}

export default PageTitle;

PageTitle.propTypes = {
    page_title: PropTypes.string.isRequired,
    add_button_url: PropTypes.string.isRequired
};
