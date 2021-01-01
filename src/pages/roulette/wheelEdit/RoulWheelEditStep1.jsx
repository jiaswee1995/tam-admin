import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import connect from "react-redux/es/connect/connect";
import { Row, Col, Input, Slider, InputNumber, Switch } from 'antd';

class RoulWheelEditStep1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      pr: props.payRate,
      wr: props.winRate,
      zr: props.zeroRate,
      tblstatus: props.status,
    }
  }
  componentWillMount() {
    setLocale(sessionStorage.getItem("lang"));
  }

  onChangeWinRate = (e) => {
    this.setState({
      wr: e,
    })
  }

  onChangePayRate = (e) => {
    this.setState({
      pr: e,
    })
  }
  

  onChangeZeroRate = (e) => {
    this.setState({
      zr: e,
    })
  }
  

  onChangeTblStatus = (e) => {
    this.setState({
      tblstatus: e ? "A" : "I"
    })
  }
  
  // UNSAFE_componentWillReceiveProps(nextProps, nextContext){

  // }

  render(){
    const { 
      data,
      wheelDesc, minBet, maxBet, 
      // winRate, doubleDiceRate, tripleDiceRate,
      //  status,
    } = this.props;

    const {
      wr, zr, tblstatus, pr,
    } = this.state;
    return(
    <div>
      <Row>
        <Col span={6}>
          {t('roul.wheel_code')}
        </Col>
        <Col span={6}>
          <Input type="text" disabled value={data.wheel_code}/>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('roul.wheel_desc')}
        </Col>
        <Col span={6}>
          {/* <Input type="text" defaultValue={tableDesc} onChange={(e)=>this.props.onInputChange("tableDesc", e)}/> */}
          <Input type="text" defaultValue={wheelDesc} id="roul_wheel_desc"/>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('roul.min_bet')}
        </Col>
        <Col span={6}>
          {/* <InputNumber min={1} max={199} defaultValue={minBet} onChange={(e)=>this.props.onInputChange("minBet", e)}/> */}
          <InputNumber min={1} max={199} defaultValue={minBet} id="roul_wheel_min_bet" />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('roul.max_bet')}
        </Col>
        <Col span={6}>
          {/* <InputNumber min={180} max={100000} defaultValue={maxBet} onChange={(e)=>this.props.onInputChange("maxBet", e)}/> */}
          <InputNumber min={180} max={100000} defaultValue={maxBet} id="roul_wheel_max_bet" />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('roul.pay_rate')}
        </Col>
        <Col span={6}>
          <Slider
            marks={ 
              {1: '1%',100: '100%'}
            }
            min={1}
            max={100}
            onChange={(e)=>this.onChangePayRate(e)}
            // onChange={(e)=>this.props.onInputChange("winRate", e)}
            value={pr}
          />
        </Col>
        <Col span={1} />
        <Col span={4}>
          <InputNumber
            formatter={value => `${value}%`}
            min={1}
            max={100}
            style={{ margin: '0 16px' }}
            value={pr}
            onChange={(e)=>this.onChangePayRate(e)}
            id="roul_wheel_pay_rate"
            // onChange={(e)=>this.props.onInputChange("winRate", e)}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('roul.win_rate')}
        </Col>
        <Col span={6}>
          <Slider
            marks={ 
              {1: '1%',100: '100%'}
            }
            min={1}
            max={100}
            onChange={(e)=>this.onChangeWinRate(e)}
            // onChange={(e)=>this.props.onInputChange("winRate", e)}
            value={wr}
          />
        </Col>
        <Col span={1} />
        <Col span={4}>
          <InputNumber
            formatter={value => `${value}%`}
            min={1}
            max={100}
            style={{ margin: '0 16px' }}
            value={wr}
            onChange={(e)=>this.onChangeWinRate(e)}
            id="roul_wheel_win_rate"
            // onChange={(e)=>this.props.onInputChange("winRate", e)}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('roul.zero_rate')}
        </Col>
        <Col span={6}>
          <Slider
            marks={ 
              {1: '1%',100: '100%'}
            }
            min={1}
            max={100}
            onChange={(e)=>this.onChangeZeroRate(e)}
            // onChange={(e)=>this.props.onInputChange("doubleDiceRate", e)}
            value={zr}
          />
        </Col>
        <Col span={1} />
        <Col span={4}>
          <InputNumber
            formatter={value => `${value}%`}
            min={1}
            max={100}
            style={{ margin: '0 16px' }}
            value={zr}
            onChange={(e)=>this.onChangeZeroRate(e)}
            id="roul_wheel_zero_rate"
            // onChange={(e)=>this.props.onInputChange("doubleDiceRate", e)}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
        {t('roul.status')}
        </Col>
        <Col span={6}>
          <Switch
            checkedChildren={t("roul.active")}
            unCheckedChildren={t("roul.inactive")}
            checked={tblstatus === "A" ? true : false}
            onChange={(e) => this.onChangeTblStatus(e)}
            id="roul_wheel_status"
            // onChange={(e)=>this.props.onInputChange("status", e)}
          />
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

export default connect (mapStateToProps, mapDispatchToProps) (RoulWheelEditStep1);
