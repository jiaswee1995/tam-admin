import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import connect from "react-redux/es/connect/connect";
import { Modal, Row, Col } from 'antd';
import {
  CrownFilled,
} from '@ant-design/icons';

class EditStationStepSample extends Component {
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
    const {
      visible,
      rouletteResult,
      userBetCell,
      transDet,
    } = this.props;

    let userBetRow = [];

    userBetCell.forEach((e,i) => {
      let numbers1 = e.numbers.replace(/-/g, "");
      // let numbers2 = numbers1.replace("-", "");
      userBetRow.push(
        <Row key={`${i}wwws`}>
            <Col span={5}>{e.bet_type}</Col>
            <Col span={2}>{e.is_win === 1 ? <CrownFilled /> : '' }</Col>
            <Col span={3}>{e.bet}</Col>
            <Col span={14}>{numbers1}</Col>
        </Row>
      )
      // console.log(e);
    })
    return(
      <>
        <Modal 
          visible={visible}
          onCancel={this.props.closeModal}
          onOk={this.props.closeModal}
          style={{ top: 25 }}
          width={'60%'}
        >
          <h4>{t('roul.bet_trans_detail')}</h4>
          <h3>Member: {transDet.user_id}</h3>
          <Row>
            <Col span={6}>
              Bet total:
            </Col>
            <Col span={10}>
            {transDet.bet_tot}
            </Col>
          </Row>
          <Row>
            <Col span={6}>
            Pay Return:
            </Col>
            <Col span={10}>
            {transDet.pay_return}
            </Col>
          </Row>
          <Row>
            <Col span={6}>
            Pay Win:
            </Col>
            <Col span={10}>
            {transDet.pay_win}
            </Col>
          </Row>
          <Row>
            <Col span={6}>
            Total Win:
            </Col>
            <Col span={10}>
              <b>{transDet.pay_tot}</b>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col span={24} className="center-item roul_result_num_col">
              <span className={`roul_result_num result_${rouletteResult.color}`}>{rouletteResult.stop_at}</span>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>User Bet Cell</Col>
          </Row>
          <Row>
            <Col span={5}><b>Bet Type</b></Col>
            <Col span={2}></Col>
            <Col span={3}><b>Bet Total</b></Col>
            <Col span={14}><b>Numbers</b></Col>
          </Row>
          {userBetRow}
        </Modal>
      </>
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

export default connect (mapStateToProps, mapDispatchToProps) (EditStationStepSample);
