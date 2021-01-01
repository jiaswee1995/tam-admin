import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import connect from "react-redux/es/connect/connect";
import { Row, Col, InputNumber } from 'antd';
import dicetotimg from '../../../../public/images/oddedit/img-number.png';


class EditTableStep7DiceTotal extends Component {
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
    const { diceTotalData } = this.props;
    let diceTotalRow = [];
    diceTotalData.forEach((e,i) => {
      diceTotalRow.push(
        <Row key={`dicetotalkey${i}`} className="double_dice_row">
          <Col span={7}>
            <h3>{e.extra}</h3>
          </Col>
          <Col span={5}>
            <InputNumber min={1} max={1000} defaultValue={e.min_bet} id={`dice_total_min_bet_${e.combination_detail_id}`}/>
          </Col>
          <Col span={5}>
            <InputNumber min={1} max={1000} defaultValue={e.max_bet} id={`dice_total_max_bet_${e.combination_detail_id}`}/>
          </Col>
          <Col span={5}>
           <InputNumber min={1} max={300} defaultValue={e.odd} id={`dice_total_odd_${e.combination_detail_id}`}/>
          </Col>
        </Row>
      )
    })
    return(
    <div>
      <Row>
        <Col span={24} className="center-item">
          <img src={dicetotimg} alt="dt" style={{ backgroundColor: '#51734d'}}/>
        </Col>
      </Row>
      <Row>
        <Col span={7}><b>{t('sicbo.dice_total')}</b></Col>
        <Col span={5}><b>{t('sicbo.min_bet')}</b></Col>
        <Col span={5}><b>{t('sicbo.max_bet')}</b></Col>
        <Col span={5}><b>{t('sicbo.odd')}</b></Col>
      </Row>
      {/* <img className="dice_img" src={process.env.PUBLIC_URL + '/dice/dice-1.png'} alt="hi" /> */}
      {diceTotalRow}
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

export default connect (mapStateToProps, mapDispatchToProps) (EditTableStep7DiceTotal);
