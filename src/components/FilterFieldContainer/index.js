import React, { Component } from 'react';

import "./FilterFieldContainer.scss"
import PropTypes from "prop-types";
import {Col, Collapse} from "antd";
import {t} from "react-i18nify";

class FilterFieldContainer extends Component{
    render() {
        const { children } = this.props;
        const { Panel } = Collapse;

        return (
        <div className="ant-row" style={{margin: "20px"}}>
            <Col md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                <Collapse defaultActiveKey={[]} onChange={this.callback} bordered={false}>
                    <Panel header={t('filter.advanced_search')} key="1">
                        {children}
                    </Panel>
                </Collapse>
            </Col>
        </div>
        )
    }
}

export default FilterFieldContainer;

FilterFieldContainer.propTypes = {
    children: PropTypes.any
};
