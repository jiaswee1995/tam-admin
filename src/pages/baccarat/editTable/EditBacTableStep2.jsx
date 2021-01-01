import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import { Row, Col, InputNumber } from 'antd';
import connect from "react-redux/es/connect/connect";

class EditBacTableStep2 extends Component {
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
          <Col span={6}><b>{e.bet_type}</b></Col>
          <Col span={6}>
            <InputNumber min={1} max={1000} defaultValue={e.min_bet} id={`bac_setting_min_bet_${e.bet_type}`} data-betid={e.id}/>
          </Col>
          <Col span={6}>
            <InputNumber min={1} max={1000} defaultValue={e.max_bet} id={`bac_setting_max_bet_${e.bet_type}`} data-betid={e.id}/>
          </Col>
            <InputNumber min={0} max={1000} step={0.01} defaultValue={e.odd} id={`bac_setting_odd_${e.bet_type}`} data-betid={e.id}/>
        </Row>
      )
    })
    console.log(data);
    return(
    <div>
      <Row>
        <Col span={6}><b>{t('slot.bet_type')}</b></Col>
        <Col span={6}><b>{t('slot.min_bet')}</b></Col>
        <Col span={6}><b>{t('slot.max_bet')}</b></Col>
        <Col span={6}><b>{t('slot.odd')}</b></Col>
      </Row>
      <hr />
      
      {cellCombination}
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

export default connect (mapStateToProps, mapDispatchToProps) (EditBacTableStep2);
