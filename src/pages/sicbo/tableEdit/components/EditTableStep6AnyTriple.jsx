import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import connect from "react-redux/es/connect/connect";
import { Row, Col, InputNumber } from 'antd';

class EditTableStep6AnyTriple extends Component {
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
    const { anyTripleData } = this.props;
    let anyTripleRow = [];
    let anyMinBet = 0;
    let anyMaxBet = 0;
    let anyOdd = 0;
    anyTripleData.forEach((e,i)=>{
      anyTripleRow.push(
        <Col span={4} className="any_triple_row" key={`anytriple${i}`}>
            <img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-${e.dice_first}.png`} alt="dice" />
            <img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-${e.dice_first}.png`} alt="dice" />
            <img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-${e.dice_first}.png`} alt="dice" />
        </Col>
      )
      if(i === 0){
        anyMinBet = e.min_bet;
        anyMaxBet = e.max_bet;
        anyOdd = e.odd;
      }
    })
    return(
    <div>
      <Row>
        {anyTripleRow}
      </Row>
      <br />
      <Row>
          <Col span={6}>{t('sicbo.min_bet')}</Col>
          <Col span={6}>
            <InputNumber min={1} max={1000} defaultValue={anyMinBet} id="sicbo_any_triple_min_bet"/>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={6}>{t('sicbo.max_bet')}</Col>
          <Col span={6}>
            <InputNumber min={1} max={1000} defaultValue={anyMaxBet} id="sicbo_any_triple_max_bet"/>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={6}>{t('sicbo.odd')}</Col>
          <Col span={6}>
            <InputNumber min={1} max={300} defaultValue={anyOdd} id="sicbo_any_triple_odd"/>
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

export default connect (mapStateToProps, mapDispatchToProps) (EditTableStep6AnyTriple);
