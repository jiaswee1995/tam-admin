import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import connect from "react-redux/es/connect/connect";
import { Row, Col, InputNumber } from 'antd';

class EditTableStep2SmallBig extends Component {
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
    const { smallData, bigData } = this.props;
    return(
    <div>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={24}><h4>小 Small</h4></Col>
          </Row>
          <hr />
          <Row>
            <Col span={6}>{t('sicbo.min_bet')}</Col>
            <Col span={6}>
              <InputNumber min={1} max={1000} defaultValue={smallData.min_bet} id="sicbo_small_min_bet" />
              {/* {smallMin} */}
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={6}>Max Bet</Col>
            <Col span={6}>
              <InputNumber min={1} max={1000} defaultValue={smallData.max_bet} id="sicbo_small_max_bet"/>
              {/* {smallMin} */}
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={6}>Odd</Col>
            <Col span={6}>
              <InputNumber min={1} max={100} defaultValue={smallData.odd} id="sicbo_small_odd"/>
              {/* {smallMin} */}
            </Col>
          </Row>
          <br />
        </Col>
        <Col span={12}>
          <Row>
            <Col span={24}><h4>大 Big</h4></Col>
          </Row>
          <hr />
          <Row>
            <Col span={6}>Min Bet</Col>
            <Col span={6}>
              <InputNumber min={1} max={1000} defaultValue={bigData.min_bet} id="sicbo_big_min_bet"/>
              {/* {bigData.min_bet} */}
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={6}>Max Bet</Col>
            <Col span={6}>
              <InputNumber min={1} max={1000} defaultValue={bigData.max_bet} id="sicbo_big_max_bet"/>
              {/* {bigData.max_bet} */}
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={6}>Odd</Col>
            <Col span={6}>
              <InputNumber min={1} max={100} defaultValue={bigData.odd} id="sicbo_big_odd"/>
              {/* {bigData.odd} */}
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

export default connect (mapStateToProps, mapDispatchToProps) (EditTableStep2SmallBig);
