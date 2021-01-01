import React, { Component } from 'react';
import { setLocale } from "react-i18nify";
import connect from "react-redux/es/connect/connect";
import { Row, Col, Input } from 'antd';
const { TextArea } = Input;

class NotificationInput extends Component {
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
    const { name, locale } = this.props;
    return(
    <div>
      {/* <h3>Notification Input for - {name}</h3> */}
      <br />
      <Row>
        <Col span={6}>
          <h4>Notification Subject ({locale})</h4>
        </Col>
        <Col span={12}>
          <Input type="text" placeholder={`Subject (${name})`} name={`notification_subject[]`} data-locale={locale} />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          <h4>Notification Message ({locale})</h4>
        </Col>
        <Col span={12}>
          <TextArea rows={4} placeholder={`Message (${name})`} id={`notification_message_${locale}`} data-locale={locale} />
        </Col>
      </Row>
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

export default connect (mapStateToProps, mapDispatchToProps) (NotificationInput);
