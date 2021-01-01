import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import connect from "react-redux/es/connect/connect";
import { Row, Col, InputNumber, Tag, Affix } from 'antd';
import rOdds from '../../../public/images/roulette-odd.png';

class RoulWheelEditStep2 extends Component {
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
    const { data } = this.props;
    let cellCombination = [];
    data.forEach((e, i) => {
      cellCombination.push(
        <Row key={`cd${i}`} className="roul_wheel_cell_edit_row">
          <Col span={6}><Tag className={`bt_${e.combination_id}`}>&nbsp;</Tag><b>{e.bet_type}</b></Col>
          <Col span={6}>
            <InputNumber min={1} max={1000} defaultValue={e.min_bet} id={`wheel_setting_min_bet_${e.combination_id}`}/>
          </Col>
          <Col span={6}>
            <InputNumber min={1} max={1000} defaultValue={e.max_bet} id={`wheel_setting_max_bet_${e.combination_id}`}/>
          </Col>
          <Col span={6}>
            <InputNumber min={1} max={1000} defaultValue={e.odd} id={`wheel_setting_odd_${e.combination_id}`}/>
          </Col>
        </Row>
      )
    })
    return(
    <div className="roul_edit_odds">
      <Row>
        <Col span={10}>
          <Row>
          <Col span={6}><b>{t('roul.bet_type')}</b></Col>
          <Col span={6}><b>{t('roul.min_bet')}</b></Col>
          <Col span={6}><b>{t('roul.max_bet')}</b></Col>
          <Col span={6}><b>{t('roul.odd')}</b></Col>
        </Row>
        <hr />
        {cellCombination}
        </Col>
        <Col span={14} className="center-item">
          <Affix offsetTop={200}>
            
          <img src={rOdds} alt="ro" />
          </Affix>
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

export default connect (mapStateToProps, mapDispatchToProps) (RoulWheelEditStep2);
