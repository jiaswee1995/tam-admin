import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import PageContent from "../../../components/Content";
import connect from "react-redux/es/connect/connect";
import { Row, Col, Input, Button, message, Spin, Radio } from 'antd';
import { postGenerateOTP, postOTPTypeList } from '../../../store/ducks/otp/actions';
import moment from "moment";
import ShowOTPModal from './ShowOTPModal';

class OTPGenerate extends Component{
  constructor(){
    super();
    this.state = {
      loading: true,
      userID: "",
      otpType: "",
      showModal: false,
      otp: "",
      closeBtn: true,
      closeBtnBlock: 3,
      exipredAt: "",
      otpTypeList: [],
    }
  }

  componentDidMount(){
    this.props.postOTPTypeList({});
  }
    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.mem_otp !== this.props.mem_otp){
          if(nextProps.mem_otp.statusCode === 200){
            //
            this.setState({
              showModal: true,
              otp: nextProps.mem_otp.data.otp,
              exipredAt: moment(nextProps.mem_otp.data.otp.expires_at).format("YYYY-MM-DD hh:mm a"),
            })
            let blockTimer = this.state.closeBtnBlock * 1000
            setTimeout(()=>{
              this.setState({
                closeBtn: false,
              })
            }, blockTimer)
            
          } else {
            message.error(nextProps.mem_otp.msg)
          }
          this.setState({
            loading: false
          })
          console.log(nextProps.mem_otp)
        }

        if(nextProps.otp_type !== this.props.otp_type){
          if(nextProps.otp_type.statusCode === 200){
            // console.log(nextProps.otp_type)
            this.setState({
              loading: false,
              otpTypeList: nextProps.otp_type.data,
            })
          } else {
            message.error(nextProps.otp_type.msg)
          }
        }

    }

    onChangeUserID = (e) => {
      this.setState({
        userID: e.target.value
      })
    }

    otpType = (e) => {
      // console.log(e)
      this.setState({
        otpType: e.target.value,
      })
    }


    closeModal = () => {
      this.setState({
        showModal: false,
        closeBtn: true,
      })
    }

    generateOTP = () => {
      this.setState({
        loading: true,
      })
      console.log(this.state.userID, this.state.otpType)
      const data = {};
      data.user_id = this.state.userID;
      data.otp_type = this.state.otpType;
      this.props.postGenerateOTP(data);
    }

    render() {
      const {
        userID, otpType, loading,
        showModal, closeBtn, otp,
        exipredAt, otpTypeList
      } = this.state;

      let otpRadio = [];
      otpTypeList.forEach((e, i) => {
        otpRadio.push(
          <Radio key={`radio_${i}`} value={e.code}>{e.name}</Radio>
        )
      })

        return (
          <>
            <PageContent page_title={t('otp.otp_generator')} add_button_url="">
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
                      {/* <Select defaultValue={otpType} style={{ width: '100%' }} onChange={this.otpType}>
                        <Option value="REG">Register Activation</Option>
                        <Option value="RP">Reset Password</Option>
                      </Select>           */}
                      <Radio.Group onChange={this.otpType} value={otpType}>
                        {/* <Radio value={"REG"}>Register Activation</Radio>
                        <Radio value={"RP"}>Reset Password</Radio> */}
                        {otpRadio}
                      </Radio.Group>
                     </Col>
                   </Row>
                   <br />
                   <Button onClick={this.generateOTP}>Generate User OTP</Button>
                </div>
              </Spin>
            </PageContent>
            <ShowOTPModal visible={showModal} closeBtn={closeBtn} otpText={otp} closeModal={this.closeModal} exipredAt={exipredAt} />
          </>
        )
    }
}

const mapStateToProps = (state) => {
    const { otp } = state;
    return {
        mem_otp : otp.mem_otp,
        otp_type: otp.otp_type,
    }
};

const mapDispatchToProps = {
  postGenerateOTP,
  postOTPTypeList,
};

export default connect (mapStateToProps, mapDispatchToProps) (OTPGenerate);