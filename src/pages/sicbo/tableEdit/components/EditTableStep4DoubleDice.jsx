import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import connect from "react-redux/es/connect/connect";
import { Row, Col, InputNumber } from 'antd';

class EditTableStep4DoubleDice extends Component {
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
    const { doubleDiceData } = this.props;
    let doubleDiceRow = [];
    doubleDiceData.forEach((e,i) => {
      doubleDiceRow.push(
        <Row key={`doubledicekey${i}`} className="double_dice_row">
          <Col span={7}>
            <img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-${e.dice_first}.png`} alt="dice" />
            <img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-${e.dice_first}.png`} alt="dice" />
          </Col>
          <Col span={5}>
            <InputNumber min={1} max={1000} defaultValue={e.min_bet} id={`double_dice_min_bet_${e.combination_detail_id}`}/>
          </Col>
          <Col span={5}>
            <InputNumber min={1} max={1000} defaultValue={e.max_bet} id={`double_dice_max_bet_${e.combination_detail_id}`}/>
          </Col>
          <Col span={5}>
           <InputNumber min={1} max={300} defaultValue={e.odd} id={`double_dice_odd_${e.combination_detail_id}`}/>
          </Col>
        </Row>
      )
    })
    return(
    <div>
      <Row>
        <Col span={7}><b>{t('sicbo.dice')}</b></Col>
        <Col span={5}><b>{t('sicbo.min_bet')}</b></Col>
        <Col span={5}><b>{t('sicbo.max_bet')}</b></Col>
        <Col span={5}><b>{t('sicbo.odd')}</b></Col>
      </Row>
      {/* <img className="dice_img" src={process.env.PUBLIC_URL + '/dice/dice-1.png'} alt="hi" /> */}
      {doubleDiceRow}
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

export default connect (mapStateToProps, mapDispatchToProps) (EditTableStep4DoubleDice);
