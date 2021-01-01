import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import connect from "react-redux/es/connect/connect";
import { Row, Col, InputNumber } from 'antd';

class EditTableStep12NumComb extends Component {
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
    const { numCombinationData } = this.props;
    let numCombinationRow = [];
    numCombinationData.forEach((e,i) => {
      let dicefName = '';
      let dicesName = '';
      let dicetName = '';
      if (e.dice_first === 1 || e.dice_first === 4){
        dicefName = 'red_num'
      } else {
        dicefName = ''
      }
      if (e.dice_second === 1 || e.dice_second === 4){
        dicesName = 'red_num'
      } else {
        dicesName = ''
      }
      if (e.dice_third === 1 || e.dice_third === 4){
        dicetName = 'red_num'
      } else {
        dicetName = ''
      }
      numCombinationRow.push(
        <Row key={`numcombkey${i}`} className="double_dice_row">
          <Col span={7}>
            <b>
            <span className={dicefName}>{e.dice_first}</span>
            <span className={dicesName}>{e.dice_second}</span>
            <span className={dicetName}>{e.dice_third}</span>
            </b>
          </Col>
          <Col span={5}>
            <InputNumber min={1} max={1000} defaultValue={e.min_bet} id={`num_comb_min_bet_${e.combination_detail_id}`}/>
          </Col>
          <Col span={5}>
            <InputNumber min={1} max={1000} defaultValue={e.max_bet} id={`num_comb_max_bet_${e.combination_detail_id}`}/>
          </Col>
          <Col span={5}>
           <InputNumber min={1} max={300} defaultValue={e.odd} id={`num_comb_odd_${e.combination_detail_id}`}/>
          </Col>
        </Row>
      )
    })
    return(
    <div>
      <Row>
        <Col span={7}><b>{t('sicbo.num_combination')}</b></Col>
        <Col span={5}><b>{t('sicbo.min_bet')}</b></Col>
        <Col span={5}><b>{t('sicbo.max_bet')}</b></Col>
        <Col span={5}><b>{t('sicbo.odd')}</b></Col>
      </Row>
      {/* <img className="dice_img" src={process.env.PUBLIC_URL + '/dice/dice-1.png'} alt="hi" /> */}
      {numCombinationRow}
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

export default connect (mapStateToProps, mapDispatchToProps) (EditTableStep12NumComb);
