import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import connect from "react-redux/es/connect/connect";
import { Row, Col, InputNumber } from 'antd';

class EditTableStep3EvenOdd extends Component {
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
    const { oddData, evenData } = this.props;
    return(
    <div>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={24}><h4>Odd</h4></Col>
          </Row>
          <hr />
          <Row>
            <Col span={6}>{t('sicbo.min_bet')}</Col>
            <Col span={6}>
              <InputNumber min={1} max={1000} defaultValue={oddData.min_bet} id="sicbo_odd_min_bet" />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={6}>Max Bet</Col>
            <Col span={6}>
              <InputNumber min={1} max={1000} defaultValue={oddData.max_bet} id="sicbo_odd_max_bet"/>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={6}>Odd</Col>
            <Col span={6}>
              <InputNumber min={1} max={100} defaultValue={oddData.odd} id="sicbo_odd_odd"/>
            </Col>
          </Row>
          <br />
        </Col>
        <Col span={12}>
          <Row>
            <Col span={24}><h4>Even</h4></Col>
          </Row>
          <hr />
          <Row>
            <Col span={6}>Min Bet</Col>
            <Col span={6}>
              <InputNumber min={1} max={1000} defaultValue={evenData.min_bet} id="sicbo_even_min_bet"/>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={6}>Max Bet</Col>
            <Col span={6}>
              <InputNumber min={1} max={1000} defaultValue={evenData.max_bet} id="sicbo_even_max_bet"/>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={6}>Odd</Col>
            <Col span={6}>
              <InputNumber min={1} max={100} defaultValue={evenData.odd} id="sicbo_even_odd"/>
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
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

export default connect (mapStateToProps, mapDispatchToProps) (EditTableStep3EvenOdd);
