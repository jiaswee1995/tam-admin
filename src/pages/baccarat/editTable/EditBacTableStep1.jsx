import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import connect from "react-redux/es/connect/connect";
import { Row, Col, Input, Slider, InputNumber, Switch } from 'antd';

class EditBacTableStep1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      pr: props.payRate,
      wr: props.winRate,
      td: props.totalDeck,
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
  

  onChangeTotalDeck = (e) => {
    this.setState({
      td: e,
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
      tableDesc, minBet, maxBet, 
      // winRate, doubleDiceRate, tripleDiceRate,
      //  status,
    } = this.props;

    const {
      wr, td, tblstatus, pr,
    } = this.state;
    return(
    <div>
      <Row>
        <Col span={6}>
          {t('slot.bac_code')}
        </Col>
        <Col span={6}>
          <Input type="text" disabled value={data.bac_code}/>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('slot.bac_desc')}
        </Col>
        <Col span={6}>
          {/* <Input type="text" defaultValue={tableDesc} onChange={(e)=>this.props.onInputChange("tableDesc", e)}/> */}
          <Input type="text" defaultValue={tableDesc} id="bac_table_desc"/>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('slot.min_bet')}
        </Col>
        <Col span={6}>
          {/* <InputNumber min={1} max={199} defaultValue={minBet} onChange={(e)=>this.props.onInputChange("minBet", e)}/> */}
          <InputNumber min={1} max={199} defaultValue={minBet} id="bac_table_min_bet" />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('slot.max_bet')}
        </Col>
        <Col span={6}>
          {/* <InputNumber min={180} max={100000} defaultValue={maxBet} onChange={(e)=>this.props.onInputChange("maxBet", e)}/> */}
          <InputNumber min={180} max={100000} defaultValue={maxBet} id="bac_table_max_bet" />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('slot.pay_rate')}
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
            id="bac_table_pay_rate"
            // onChange={(e)=>this.props.onInputChange("winRate", e)}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('slot.win_rate')}
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
            id="bac_table_win_rate"
            // onChange={(e)=>this.props.onInputChange("winRate", e)}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('slot.total_deck')}
        </Col>
        <Col span={6}>
          <Slider
            marks={ 
              {1: '1',8: '8'}
            }
            min={1}
            max={8}
            onChange={(e)=>this.onChangeTotalDeck(e)}
            // onChange={(e)=>this.props.onInputChange("doubleDiceRate", e)}
            value={td}
          />
        </Col>
        <Col span={1} />
        <Col span={4}>
          <InputNumber
            formatter={value => `${value} Decks`}
            min={1}
            max={8}
            style={{ margin: '0 16px' }}
            value={td}
            onChange={(e)=>this.onChangeTotalDeck(e)}
            id="bac_table_total_deck"
            // onChange={(e)=>this.props.onInputChange("doubleDiceRate", e)}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
        {t('slot.status')}
        </Col>
        <Col span={6}>
          <Switch
            checkedChildren={t("slot.active")}
            unCheckedChildren={t("slot.inactive")}
            checked={tblstatus === "A" ? true : false}
            onChange={(e) => this.onChangeTblStatus(e)}
            id="bac_table_status"
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

export default connect (mapStateToProps, mapDispatchToProps) (EditBacTableStep1);
