import React, { Component } from 'react';
import "./index.scss";
import { Button, Input, Form, Divider, Row, Col, Select, message} from 'antd';
import {connect} from "react-redux";
import { postMemberList} from "../../../store/ducks/memberList/actions";
import PageContent from "../../../components/Content";

const { Option } = Select;

class topUpSales extends Component{
    constructor(props){
        super(props);
        this.state = {
            theme: 'dark',
            current: '1',
            data: [],
            total_records: 0,
            email: "",
            phone: "",
            page: 1
        };
        this.onChange = this.onChange.bind(this);
    }
    state = {
        collapsed: false,
        searchText: '',
        searchedColumn: '',
      };
      UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.member_list_data !== this.props.member_list_data) {
            if (nextProps.member_list_data.statusCode === 200){
                if (nextProps.member_list_data.status === 'success') {
                  this.setState({
                    data: nextProps.member_list_data.data,
                    total_records: nextProps.member_list_data.total_records
                  });
                }
            }else{
                message.error(nextProps.member_list_data.msg);
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
          }
      }

      onChange(page,pageSize){
        const data = []; 

          data['email'] = this.state.email;
          data['contactNo'] = this.state.phone;
          data['pages'] = page.toString();

          this.setState({
            page: page
          });

        this.props.postMemberList(data);  
     }
    render() {
        // const {page} = this.state;

        const rangeConfig = {
            rules: [{ type: 'array' }],
          };

        const layout = {
            labelCol: { span: 6 },
            wrapperCol: {
                span: 16,
              },
            
          };

        const tailLayout = {
          wrapperCol: {
            offset: 11,
            span: 16,
          },
        };

        const onFinish = values => {
          const data = []; 

          data['email'] = values.Email;
          data['contactNo'] = values.ContactNo;
          data['pages'] = "1"

          this.setState({
            email: values.Email,
            phone: values.ContactNo
          });

          this.props.postMemberList(data);  
  
      };

        return (
          <PageContent page_title="Top Up" add_button_url="" main_menu_id={['sub5']} sub_menu_id={['13']}>
              <div className="site-layout-content ant-pro-page-header-wrap-children-content">
                                        <Row>
                                            <Col span={24} style={{padding:36, border : "solid", borderWidth : 0.5, borderColor : "lightgrey"}}>
                                                <h3 className="ml-5">TOPUP</h3>
                                                <Divider />
                                                <h2 className="ml-5">Member Info</h2>
                                                <Divider />
                                                <Form
                                                        {...layout} 
                                                        name="normal_login"
                                                        id="admin-login"
                                                        className="sales-list-form"
                                                        initialValues={{
                                                            remember: true,
                                                        }}
                                                        onFinish={onFinish}
                                                        onSubmit={this.handleAdminLogin}
                                                        >
                                                        <Row>
                                                        <Col span={12} style={{padding:12}}>
                                                        <Form.Item
                                                            name="Email"
                                                            label="Member Code"
                                                        >
                                                        <Input
                                                            placeholder=""
                                                            onSearch={value => console.log(value)}
                                                            style={{ width: "100%" }}
                                                        />
                                                        </Form.Item>

                                                        <Form.Item
                                                            name="date"
                                                            label="Current Title"
                                                            {...rangeConfig}
                                                        >
                                                            <Input
                                                                placeholder=""
                                                                onSearch={value => console.log(value)}
                                                                style={{ width: "100%" }}
                                                                disabled
                                                            />

                                                        </Form.Item>
                                                        </Col>
                                                        <Col span={12} style={{padding:12}}>
                                                        <Form.Item
                                                            name="referral"
                                                            label="Name"
                                                            
                                                            
                                                        >
                                                        <Input
                                                            placeholder=""
                                                            onSearch={value => console.log(value)}
                                                            style={{ width: "100%" }}
                                                            disabled
                                                        />
                                                        </Form.Item>
                                                        </Col>
                                                        </Row>
                                                
                                                
                                                <h2 className="ml-5">Package Info</h2>
                                                <Divider />
                                                <Row>
                                                    <Col span={24} style={{padding:12}}>
                                                    <Form.Item
                                                        labelCol= {{ span: 24 }}
                                                        wrapperCol= {{span: 24}}
                                                        name="wallet_type"
                                                        label="Package Type"
                                                    >
                                                        <Select defaultValue="Please Select" style={{width: "100%"}}>
                                                        <   Option value="CASH">CASH</Option>
                                                        </Select>
                                                    </Form.Item>
                                                    </Col> 
                                                </Row>

                                                <h2 className="ml-5">Topup Info</h2>
                                                <Divider />
                                                <Row>
                                                    <Col span={24} style={{padding:12}}>
                                                    <Form.Item
                                                        labelCol= {{ span: 24 }}
                                                        wrapperCol= {{span: 24}}
                                                        name="wallet_type"
                                                        label="Amount"
                                                    >
                                                        <Input
                                                            placeholder=""
                                                            onSearch={value => console.log(value)}
                                                            style={{ width: "100%" }}
                                                        />
                                                    </Form.Item>
                                                    </Col> 
                                                </Row>
                                                <h2 className="ml-5">Payment Info</h2>
                                                <Divider />
                                                <Row>
                                                    <Col span={24} style={{padding:12}}>
                                                    <Form.Item
                                                        labelCol= {{ span: 24 }}
                                                        wrapperCol= {{span: 24}}
                                                        name="wallet_type"
                                                        label="Total Amount"
                                                    >
                                                        <Input
                                                            placeholder=""
                                                            onSearch={value => console.log(value)}
                                                            style={{ width: "100%" }}
                                                            disabled
                                                        />
                                                    </Form.Item>

                                                    <Form.Item
                                                        labelCol= {{ span: 24 }}
                                                        wrapperCol= {{span: 24}}
                                                        name="wallet_type"
                                                        label="Ewallet Type"
                                                    >
                                                        <Select defaultValue="Please Select" style={{width: "100%"}}>
                                                        <   Option value="CASH">CASH</Option>
                                                        </Select>
                                                    </Form.Item>

                                                    </Col> 
                                                </Row>
                                                <Divider />
                                                <Form.Item  {...tailLayout}>
                                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                                        Top Up
                                                    </Button>
                                                </Form.Item>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </div>
                           </PageContent>
        )
    }
}
const mapStateToProps = (state) => {
  const {memberList, header_data} = state;

  return {
      member_list_data : memberList.data,
      header_data : header_data.data
  }
};

const mapDispatchToProps = {
    postMemberList
};
export default connect (mapStateToProps, mapDispatchToProps) (topUpSales);
