import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import connect from "react-redux/es/connect/connect";
import { Row, Col, Input, Slider, InputNumber, Switch } from 'antd';

class EditTableStep1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      pr: props.payRate,
      wr: props.winRate,
      ddr: props.doubleDiceRate,
      tdr: props.tripleDiceRate,
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
  

  onChangeDoubleDiceRate = (e) => {
    this.setState({
      ddr: e,
    })
  }
  

  onChangeTripleDiceRate = (e) => {
    this.setState({
      tdr: e,
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
      wr, ddr, tdr, tblstatus, pr,
    } = this.state;
    return(
    <div>
      <Row>
        <Col span={6}>
          {t('sicbo.table_code')}
        </Col>
        <Col span={6}>
          <Input type="text" disabled value={data.tbl_code}/>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('sicbo.table_desc')}
        </Col>
        <Col span={6}>
          {/* <Input type="text" defaultValue={tableDesc} onChange={(e)=>this.props.onInputChange("tableDesc", e)}/> */}
          <Input type="text" defaultValue={tableDesc} id="sicbo_table_desc"/>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('sicbo.min_bet')}
        </Col>
        <Col span={6}>
          {/* <InputNumber min={1} max={199} defaultValue={minBet} onChange={(e)=>this.props.onInputChange("minBet", e)}/> */}
          <InputNumber min={1} max={199} defaultValue={minBet} id="sicbo_table_min_bet" />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('sicbo.max_bet')}
        </Col>
        <Col span={6}>
          {/* <InputNumber min={180} max={100000} defaultValue={maxBet} onChange={(e)=>this.props.onInputChange("maxBet", e)}/> */}
          <InputNumber min={180} max={100000} defaultValue={maxBet} id="sicbo_table_max_bet" />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('sicbo.pay_rate')}
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
            id="sicbo_table_pay_rate"
            // onChange={(e)=>this.props.onInputChange("winRate", e)}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('sicbo.win_rate')}
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
            id="sicbo_table_win_rate"
            // onChange={(e)=>this.props.onInputChange("winRate", e)}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('sicbo.double_dice_rate')}
        </Col>
        <Col span={6}>
          <Slider
            marks={ 
              {1: '1%',100: '100%'}
            }
            min={1}
            max={100}
            onChange={(e)=>this.onChangeDoubleDiceRate(e)}
            // onChange={(e)=>this.props.onInputChange("doubleDiceRate", e)}
            value={ddr}
          />
        </Col>
        <Col span={1} />
        <Col span={4}>
          <InputNumber
            formatter={value => `${value}%`}
            min={1}
            max={100}
            style={{ margin: '0 16px' }}
            value={ddr}
            onChange={(e)=>this.onChangeDoubleDiceRate(e)}
            id="sicbo_table_double_dice_rate"
            // onChange={(e)=>this.props.onInputChange("doubleDiceRate", e)}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
          {t('sicbo.triple_dice_rate')}
        </Col>
        <Col span={6}>
          <Slider
            marks={ 
              {1: '1%',100: '100%'}
            }
            min={1}
            max={100}
            onChange={(e) => this.onChangeTripleDiceRate(e)}
            // onChange={(e)=>this.props.onInputChange("tripleDiceRate", e)}
            value={tdr}
          />
        </Col>
        <Col span={1} />
        <Col span={4}>
          <InputNumber
            formatter={value => `${value}%`}
            min={1}
            max={100}
            style={{ margin: '0 16px' }}
            value={tdr}
            onChange={(e) => this.onChangeTripleDiceRate(e)}
            id="sicbo_table_triple_dice_rate"
            // onChange={(e)=>this.props.onInputChange("tripleDiceRate", e)}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}>
        {t('sicbo.status')}
        </Col>
        <Col span={6}>
          <Switch
            checkedChildren={t("sicbo.active")}
            unCheckedChildren={t("sicbo.inactive")}
            checked={tblstatus === "A" ? true : false}
            onChange={(e) => this.onChangeTblStatus(e)}
            id="sicbo_table_status"
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

export default connect (mapStateToProps, mapDispatchToProps) (EditTableStep1);
