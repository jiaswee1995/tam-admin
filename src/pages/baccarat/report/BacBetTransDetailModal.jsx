import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import connect from "react-redux/es/connect/connect";
import { Modal, Row, Col } from 'antd';
import {
  CrownFilled,
} from '@ant-design/icons';

class BacBetTransDetailModal extends Component {
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
      userBetCell,
      cardResult,
      transDet,
    } = this.props;

    let userBetRow = [];

    userBetCell.forEach((e,i) => {
      // let numbers2 = numbers1.replace("-", "");
      userBetRow.push(
        <Row key={`${i}wwws`}>
            <Col span={5}>{e.bet_type}</Col>
            <Col span={3}>{e.bet}</Col>
        </Row>
      )
      // console.log(e);
    })

    let cardResultCol = [];
    
    cardResult.forEach((e, i) => {
      let sideCards = [];
      e.cards.forEach((ce, ci) => {
        let cardVal = 0
        if([1,14,27,40].includes(ce.card_no)){
          cardVal = 1
        }
        if([2,15,28,41].includes(ce.card_no)){
          cardVal = 2
        }
        if([3,16,29,42].includes(ce.card_no)){
          cardVal = 3
        }
        if([4,17,30,43].includes(ce.card_no)){
          cardVal = 4
        }
        if([5,18,31,44].includes(ce.card_no)){
          cardVal = 5
        }
        if([6,19,32,45].includes(ce.card_no)){
          cardVal = 6
        }
        if([7,20,33,46].includes(ce.card_no)){
          cardVal = 7
        }
        if([8,21,34,47].includes(ce.card_no)){
          cardVal = 8
        }
        if([9,22,35,48].includes(ce.card_no)){
          cardVal = 9
        }
        if([10,23,36,49].includes(ce.card_no)){
          cardVal = 10
        }
        if([11,24,37,50].includes(ce.card_no)){
          cardVal = 11
        }
        if([12,25,38,51].includes(ce.card_no)){
          cardVal = 12
        }
        if([13,26,39,52].includes(ce.card_no)){
          cardVal = 13
        }
        sideCards.push(
          <Col span={8} className="center-item" key={`fkek${ci}`}>
            <img className="card__img" src={`${process.env.PUBLIC_URL}/cards/card_${ce.card_suit}_${cardVal}.png`} alt="c" />
          </Col>
        )
      })

      cardResultCol.push(
        <Col span={12} key={`fff${i}`} className={`col__${e.side}`}>
          <Row>
            <Col span={24} className="center-item">
              <h4>{e.side} ({e.points}) {e.is_win === 1 ? <CrownFilled /> : ''}</h4>
            </Col>
          </Row>
          <Row>
            {sideCards}
          </Row>
        </Col>
      )
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
              <span className={`roul_result_num result_${transDet.bac_result}`}>{transDet.bac_result}</span>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>User Bet Cell</Col>
          </Row>
          <Row>
            <Col span={5}><b>Bet Type</b></Col>
            <Col span={3}><b>Bet Total</b></Col>
          </Row>
          {userBetRow}
          <br />
          <Row>
            {cardResultCol}
          </Row>
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

export default connect (mapStateToProps, mapDispatchToProps) (BacBetTransDetailModal);
