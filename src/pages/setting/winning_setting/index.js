import React, { Component } from "react";
import { Form, message, Card, Row, Col, Button, Input, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { postGameSetting } from "../../../store/ducks/gameSetting/actions";
import PageContent from "../../../components/Content";

import "./index.scss";

class winningSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total_records: 0,
            page: 1,
            order_field: "mach_code",
            order_type: "asc",
            sortedData: {},
            loading: true,
        };
        const data = {};
        data.mach_code = "M0011";

        this.props.postGameSetting(data);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.game_setting_data !== this.props.game_setting_data) {
            if (nextProps.game_setting_data.data.statusCode === 200) {
                if (nextProps.game_setting_data.data.status === "success") {
                    this.setState({
                        data: nextProps.game_setting_data.data.data.symbol_pay_token,
                        total_records: nextProps.game_setting_data.data.total_records,
                        loading: false,
                    });
                }
            } else {
                message.error(nextProps.game_setting_data.msg);
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }
    }

    onFinish(values) {
        console.log("Received values of form:", values);
    }

    handleChange = (pagination, filters, sorter) => {
        const data = {};
        data.page = pagination.current;
        data.limit = 10;
        data.filter = "DAILY";
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
            page: pagination.current,
        });

        this.props.postDailyList(data);
    };

    render() {
        const { data, total_records, page, sortedData, loading } = this.state;
        const sortedInfo = sortedData || {};
        let game_list = [];

        game_list = data.map(function (item, i) {
            return (
                <Col flex="20%">
                    <Card
                        title="ID"
                        extra={<a href="#">{item.symbol_code}</a>}
                        style={{ width: "100%" }}
                    >
                        {item.combinations.map(function (item, i) {
                            return (
                                <p>
                                    {item.pay_token} : {item.combination_count}
                                </p>
                            );
                        })}
                        <Button className="Save" type="primary">
                            Save
                        </Button>
                    </Card>
                </Col>
            );
        });

        return (
            <PageContent
                page_title="Game Pay-out Setting List"
                add_button_url=""
                main_menu_id={[8]}
                sub_menu_id={[28]}
            >
                <div className="site-layout-content ant-pro-page-header-wrap-children-content">
                    <Row gutter={[16, 16]}>
                        <Col flex="20%">
                            <Form
                                name="dynamic_form_nest_item"
                                onFinish={this.onFinish}
                                autoComplete="off"
                            >
                                <Form.List name="users">
                                    {(fields, { add, remove }) => {
                                        return (
                                            <div>
                                                {fields.map((field) => (
                                                    <Space
                                                        key={field.key}
                                                        style={{ display: "flex", marginBottom: 8 }}
                                                        align="start"
                                                    >
                                                        <Form.Item
                                                            {...field}
                                                            name={[field.name, "first"]}
                                                            fieldKey={[field.fieldKey, "first"]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Missing first name",
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="First Name" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...field}
                                                            name={[field.name, "last"]}
                                                            fieldKey={[field.fieldKey, "last"]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Missing last name",
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="Last Name" />
                                                        </Form.Item>

                                                        <MinusCircleOutlined
                                                            onClick={() => {
                                                                remove(field.name);
                                                            }}
                                                        />
                                                    </Space>
                                                ))}

                                                <Form.Item>
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => {
                                                            add();
                                                        }}
                                                        block
                                                    >
                                                        <PlusOutlined /> Add field
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                        );
                                    }}
                                </Form.List>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </PageContent>
        );
    }
}
const mapStateToProps = (state) => {
    const { gameSetting, header_data } = state;
    return {
        game_setting_data: gameSetting.data,
        header_data: header_data.data,
    };
};
const mapDispatchToProps = {
    postGameSetting,
};
export default connect(mapStateToProps, mapDispatchToProps)(winningSetting);
