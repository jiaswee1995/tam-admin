import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import connect from "react-redux/es/connect/connect";
import { Row, Col, InputNumber } from 'antd';
import fourimg from '../../../../public/images/oddedit/img-fournum.png';


class EditTableStep11FourNum extends Component {
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
    const { fourNumData } = this.props;
    let fourNumRow = [];
    fourNumData.forEach((e,i) => {
      let s1 = "";
      let s2 = "";
      let s3 = "";
      let s4 = "";
      let s1class = "";
      let s2class = "";
      let s3class = "";
      let s4class = "";
      var numArray = e.extra.split("");
      s1 = numArray[0]
      s2 = numArray[1]
      s3 = numArray[2]
      s4 = numArray[3]
      if(numArray[0] === "1" || numArray[0] === "4"){
        s1class = "red_num"
      } else {
        s1class = ""
      }
      if(numArray[1] === "1" || numArray[1] === "4"){
        s2class = "red_num"
      } else {
        s2class = ""
      }
      if(numArray[2] === "1" || numArray[2] === "4"){
        s3class = "red_num"
      } else {
        s3class = ""
      }
      if(numArray[3] === "1" || numArray[3] === "4"){
        s4class = "red_num"
      } else {
        s4class = ""
      }
      
      fourNumRow.push(
        <Row key={`fournumkey${i}`} className="double_dice_row">
          <Col span={7}>
            <b>
            <span className={s1class}>{s1}</span>
            <span className={s2class}>{s2}</span>
            <span className={s3class}>{s3}</span>
            <span className={s4class}>{s4}</span>
            </b>
          </Col>
          <Col span={5}>
            <InputNumber min={1} max={1000} defaultValue={e.min_bet} id={`four_num_min_bet_${e.combination_detail_id}`}/>
          </Col>
          <Col span={5}>
            <InputNumber min={1} max={1000} defaultValue={e.max_bet} id={`four_num_max_bet_${e.combination_detail_id}`}/>
          </Col>
          <Col span={5}>
           <InputNumber min={1} max={300} defaultValue={e.odd} id={`four_num_odd_${e.combination_detail_id}`}/>
          </Col>
        </Row>
      )
    })
    return(
    <div>
      <Row>
        <Col span={24} className="center-item">
          <img src={fourimg} alt="dt" style={{ backgroundColor: '#51734d'}}/>
        </Col>
      </Row>
      <Row>
        <Col span={7}><b>{t('sicbo.four_num')}</b></Col>
        <Col span={5}><b>{t('sicbo.min_bet')}</b></Col>
        <Col span={5}><b>{t('sicbo.max_bet')}</b></Col>
        <Col span={5}><b>{t('sicbo.odd')}</b></Col>
      </Row>
      {/* <img className="dice_img" src={process.env.PUBLIC_URL + '/dice/dice-1.png'} alt="hi" /> */}
      {fourNumRow}
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

export default connect (mapStateToProps, mapDispatchToProps) (EditTableStep11FourNum);
