import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import connect from "react-redux/es/connect/connect";
import { Row, Col, InputNumber } from 'antd';

class EditTableStep10RedCount extends Component {
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
    const { redCountData } = this.props;

    let singleOneMinBet = 0;
    let singleOneMaxBet = 0;
    let singleOneOdd = 0;
    
    let singleTwoMinBet = 0;
    let singleTwoMaxBet = 0;
    let singleTwoOdd = 0;

    let singleThreeMinBet = 0;
    let singleThreeMaxBet = 0;
    let singleThreeOdd = 0;

    redCountData.forEach((e,i)=>{
      if(i === 0){
        singleOneMinBet = e.min_bet;
        singleOneMaxBet = e.max_bet;
        singleOneOdd = e.odd;
      }
      if(i === 1){
        singleTwoMinBet = e.min_bet;
        singleTwoMaxBet = e.max_bet;
        singleTwoOdd = e.odd;
      }
      if(i === 2){
        singleThreeMinBet = e.min_bet;
        singleThreeMaxBet = e.max_bet;
        singleThreeOdd = e.odd;
      }
    })
    return(
    <div>
      <Row>
        <Col span={12} className="any_triple_row">
            <img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-1.png`} alt="dice" />
        </Col>
        <Col span={12} className="any_triple_row">
            <img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-4.png`} alt="dice" />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={7}><b>{t('sicbo.red_count')}</b></Col>
        <Col span={5}><b>{t('sicbo.min_bet')}</b></Col>
        <Col span={5}><b>{t('sicbo.max_bet')}</b></Col>
        <Col span={5}><b>{t('sicbo.odd')}</b></Col>
      </Row>
      <Row className="double_dice_row">
        <Col span={7}>
          <b>1</b>
        </Col>
        <Col span={5}>
          <InputNumber min={1} max={1000} defaultValue={singleOneMinBet} id={`red_count_one_min_bet`}/>
        </Col>
        <Col span={5}>
          <InputNumber min={1} max={1000} defaultValue={singleOneMaxBet} id={`red_count_one_max_bet`}/>
        </Col>
        <Col span={5}>
          <InputNumber min={1} max={300} defaultValue={singleOneOdd} id={`red_count_one_odd`}/>
        </Col>
      </Row>
      <Row className="double_dice_row">
        <Col span={7}>
          <b>2</b>
        </Col>
        <Col span={5}>
          <InputNumber min={1} max={1000} defaultValue={singleTwoMinBet} id={`red_count_two_min_bet`}/>
        </Col>
        <Col span={5}>
          <InputNumber min={1} max={1000} defaultValue={singleTwoMaxBet} id={`red_count_two_max_bet`}/>
        </Col>
        <Col span={5}>
          <InputNumber min={1} max={300} defaultValue={singleTwoOdd} id={`red_count_two_odd`}/>
        </Col>
      </Row>
      <Row className="double_dice_row">
        <Col span={7}>
          <b>3</b>
        </Col>
        <Col span={5}>
          <InputNumber min={1} max={1000} defaultValue={singleThreeMinBet} id={`red_count_three_min_bet`}/>
        </Col>
        <Col span={5}>
          <InputNumber min={1} max={1000} defaultValue={singleThreeMaxBet} id={`red_count_three_max_bet`}/>
        </Col>
        <Col span={5}>
          <InputNumber min={1} max={300} defaultValue={singleThreeOdd} id={`red_count_three_odd`}/>
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

export default connect (mapStateToProps, mapDispatchToProps) (EditTableStep10RedCount);
