import React, { Component } from 'react';
import "./index.scss";
import {connect} from "react-redux";
import { Form, Input, Button} from 'antd';
import { postAddMember } from "../../../store/ducks/memberAdd/actions";
import PageContent from "../../../components/Content";
import { t,
    //  setLocale 
    } from "react-i18nify";

class Member extends Component{
    constructor(props){
        super(props);
        this.state = {
            theme: 'dark',
            current: '1',
        };

        this.changeTheme = value => {
            this.setState({
              theme: value ? 'dark' : 'light',
            });
          };
        
          this.handleClick = e => {
            console.log('click ', e);
            this.setState({
              current: e.key,
            });
          };
    }

    UNSAFE_componentWillMount()
    {
      console.log(sessionStorage.getItem('accessToken'));
    }

    componentDidMount(){
        if(sessionStorage.getItem("tokenExpired") === "true"){
            sessionStorage.setItem("tokenExpired", "false");
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
      // if (nextProps.admin_data !== this.props.admin_data) {
      //     if (nextProps.admin_data.data !== undefined)
      //     {
      //         if (nextProps.admin_data.data.status === 'success') {
      //             sessionStorage.setItem("accessToken", nextProps.admin_data.data.data.access_token);
      //             sessionStorage.setItem("refreshToken", nextProps.admin_data.data.data.referesh_token);
      //             window.location.href = "/admin";
      //         }
      //     }

      //     else{
      //         alert("wrong username or password");
      //     }

      // }
      if (nextProps.header_data !== this.props.header_data) {
        this.setState({});
      }
  }
    render() {
          const layout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 16 },
          };

          // const tailLayout = {
          //   wrapperCol: {
          //     offset: 10,
          //     span: 16,
          //   },
          // };
          //
          // const routes = [
          //   {
          //     path: 'index',
          //     breadcrumbName: 'Add',
          //   },
          //   {
          //     path: 'first',
          //     breadcrumbName: 'List',
          //   },
          //   {
          //     path: 'second',
          //     breadcrumbName: 'Edit',
          //   },
          // ];
          const onFinish = values => {
            const data = {};
            data.user_id = values.user_id;
            data.password = values.Password;
            data.sponsor = values.SponsorEmail;
            data.contactNo = values.ContactNo;
            data.status = "A";
            
            this.props.postAddMember(data);
    
    
            
        };

        return (
          <PageContent page_title="Member Add" add_button_url="" main_menu_id={['sub1']} sub_menu_id={['1']}>
                            <div className="site-layout-content ant-pro-page-header-wrap-children-content">
                                <Form
                                    {...layout} 
                                    name="normal_login"
                                    id="admin-login"
                                    className="member-form"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    onSubmit={this.handleAdminLogin}
                                    action="/admin"
                                    >
                                    <Form.Item
                                        name="ContactNo"
                                        label="Phone :"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Phone No!',
                                        },
                                        ]}
                                    >
                                    <Input placeholder="Phone" onChange={this.onChange}/>
                                    </Form.Item>
                                    <Form.Item
                                        name="SponsorEmail"
                                        label="Sponsor :"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Phone No!',
                                        },
                                        ]}
                                    >
                                    <Input placeholder="Sponsor Email" onChange={this.onChange}/>
                                    </Form.Item>
                                    <Form.Item
                                        name="user_id"
                                        label="User ID"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your User ID!',
                                        },
                                        ]}
                                    >
                                    <Input placeholder="User ID" onChange={this.onChange}  style={{ width: 500 }}/>
                                    </Form.Item>
                                    <Form.Item
                                        name="Password"
                                        label="Password"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                            },
                                            ]}
                                    >
                                        <Input
                                        type="password"
                                        placeholder="Password"
                                        onChange={this.onChange}
                                        />
                                    </Form.Item>

                                    <Form.Item className="tail">
                                    <div className="button-group">
                                        <Button type="primary" htmlType="submit" className="add-form-button">
                                            {t("filter.submit")} 
                                        </Button>
                                        <Button htmlType="submit" className="back-form-button" style={{marginLeft: 5}}>
                                            {t("filter.back")}
                                        </Button>
                                    </div>
                                    </Form.Item>
                                    </Form>
                                </div>
                       </PageContent>
        )
    }
}

const mapStateToProps = (state) => {
  const {memberAdd, header_data} = state;

  return {
      member_data : memberAdd.data,
      header_data : header_data.data
  }
};

const mapDispatchToProps = {
    postAddMember
};
export default connect (mapStateToProps, mapDispatchToProps) (Member);