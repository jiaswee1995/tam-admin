import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import PageContent from "../../../components/Content";
import connect from "react-redux/es/connect/connect";
import { Row, Col, Input, Select, Button, message, Modal, Spin, Typography } from 'antd';
import { postGetMemberOTP } from '../../../store/ducks/otp/actions';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from "moment";

const { Option } = Select;
const { info } = Modal;
const { Paragraph } = Typography;



class GetMemberOTP extends Component{
  constructor(){
    super();
    this.state = {
      loading: false,
      userID: "",
      otpType: "REG",
    }
  }
    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.mem_otp !== this.props.mem_otp){
          if(nextProps.mem_otp.statusCode === 200){
            //
            if(nextProps.mem_otp.data.otp !== null){
              //got otp
              if(nextProps.mem_otp.data.is_expired === 1){
                //exipred liao
                info({
                  title: 'OTP Exipred!',
                  icon: <ExclamationCircleOutlined />,
                  content: <span style={{ color: 'red'}}>Please ask Member to Request OTP.</span>,
                  onOk: () => {
                    console.log('OK');
                  },
                });
              } else {
                //tak da expired
                // moment(this.state.datestr).format("YYYY-MM-DD (ddd)")
                info({
                  title: `OTP Expired After ${moment(nextProps.mem_otp.data.otp.expires_at).format("YYYY-MM-DD hh:mm a")}`,
                  icon: <ExclamationCircleOutlined />,
                  // content: <h3 style={{ color: 'blue'}}>{nextProps.mem_otp.data.otp.otp}</h3>,
                  content: <>
                    <Paragraph copyable={{ text: nextProps.mem_otp.data.otp.otp }}><b style={{ color: "blue", fontSize: "18px"}}>{nextProps.mem_otp.data.otp.otp}</b></Paragraph>
                  </>,
                  onOk: () => {
                    console.log('OK');
                  },
                });
              }
            } else {
              info({
                title: 'No OTP for This Member.',
                icon: <ExclamationCircleOutlined />,
                content: <span style={{ color: 'red'}}>Please ask Member to Request OTP.</span>,
                onOk: () => {
                  console.log('OK');
                },
              });
            }
          } else {
            message.error(nextProps.mem_otp.msg)
          }
          this.setState({
            loading: false,
          })
          console.log(nextProps.mem_otp)
        }

    }

    onChangeUserID = (e) => {
      this.setState({
        userID: e.target.value
      })
    }

    otpType = (e) => {
      this.setState({
        otpType: e,
      })
    }

    getOTP = () => {
      this.setState({
        loading: true,
      })
      console.log(this.state.userID, this.state.otpType)
      const data = {};
      data.user_id = this.state.userID;
      data.otp_type = this.state.otpType;
      this.props.postGetMemberOTP(data);
    }

    render() {
      const { userID, otpType, loading } = this.state;

        return (
            <PageContent page_title={t('otp.get_member_otp')} add_button_url="">
              <Spin spinning={loading}>
                <div className="content__root">
                   <Row>
                     <Col span={5}>User ID</Col>
                     <Col span={10}>
                       <Input type="text" onChange={this.onChangeUserID} value={userID} />
                     </Col>
                   </Row>
                   <br />
                   <Row>
                     <Col span={5}>OTP Type</Col>
                     <Col span={10}>
                      <Select defaultValue={otpType} style={{ width: '100%' }} onChange={this.otpType}>
                        <Option value="REG">Register Activation</Option>
                        <Option value="RP">Reset Password</Option>
                      </Select>          
                     </Col>
                   </Row>
                   <br />
                   <Button onClick={this.getOTP}>Get User OTP</Button>
                </div>
              </Spin>
            </PageContent>
        )
    }
}

const mapStateToProps = (state) => {
    const { otp } = state;
    return {
        mem_otp : otp.mem_otp
    }
};

const mapDispatchToProps = {
  postGetMemberOTP
};

export default connect (mapStateToProps, mapDispatchToProps) (GetMemberOTP);