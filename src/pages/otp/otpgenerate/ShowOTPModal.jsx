import React, { Component } from 'react';
import { setLocale } from "react-i18nify";
import connect from "react-redux/es/connect/connect";
import { Modal,Row, Col, Button, Typography } from 'antd';

const { Paragraph } = Typography;

class ShowOTPModal extends Component {
  constructor(){
    super();
    this.state = {

    }
  }
  componentWillMount() {
    setLocale(sessionStorage.getItem("lang"));
  }
  
  UNSAFE_componentWillReceiveProps(nextProps, nextContext){
    // if(nextProps.data !== this.props.data){
    //   var sState = nextProps.data.status === "A" ? true : false;
    //   this.setState({
    //     statusState: sState,
    //     stationName: nextProps.data.name,
    //   })
    // }
  }

  render(){
    const { visible, closeBtn, otpText, exipredAt } = this.props;
    return(
    <div>
      <Modal
          title="OTP Generated"
          visible={visible}
          maskClosable={false}
          closable={false}
          footer={[
            <Row key={`somKey`}>
              <Col span={24} className="right-item">
                <Button type="primary" disabled={closeBtn} onClick={()=>this.props.closeModal()}>OK</Button>
              </Col>
            </Row>
          ]}
        >
          <p>Member OTP - Exipred At ({exipredAt})</p>
          <Paragraph copyable={{ text: otpText }}><b style={{ color: "blue", fontSize: "18px"}}>{otpText}</b></Paragraph>
        </Modal>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  // const { station } = state;
  return {
      // station_det : station.data
  }
};

const mapDispatchToProps = {
  // postUpdateStation
};

export default connect (mapStateToProps, mapDispatchToProps) (ShowOTPModal);
