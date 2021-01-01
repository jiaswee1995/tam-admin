import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import connect from "react-redux/es/connect/connect";
import { Modal, Row, Col } from 'antd';

class SicboBetTransDetailModal extends Component {
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
    const { visible,
      diceResult,
      resultCell,
      userWinCell,
      transDet,
    } = this.props;

    let diceResultRow = [];

    diceResult.forEach((e,i)=>{
      diceResultRow.push(
        <Col span={3} key={`d${i}${e}`}>
            <img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-${e}.png`} alt="dice" />
        </Col>
      )
    })

    let resultCellRow = [];

    resultCell.forEach((e,i)=>{
      if(e.combination_id === 1 || e.combination_id === 2){
        resultCellRow.push(
          <Row key={`rcr${i}${e.combination_detail_id}`}>
            <Col span={5}>{e.bet_type}</Col>
            <Col span={5}>{e.extra}</Col>
          </Row>
        )
      }
      if([3,4].includes(e.combination_id)) {
        resultCellRow.push(
          <Row key={`rcr${i}${e.combination_detail_id}`}>
            <Col span={5}>{e.bet_type}</Col>
            <Col span={5}><img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-${e.dice_first}.png`} alt="dice" /></Col>
            <Col span={5}><img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-${e.dice_second}.png`} alt="dice" /></Col>
          </Row>
        )
      }
      if([5,6].includes(e.combination_id)) {
        resultCellRow.push(
          <Row key={`rcr${i}${e.combination_detail_id}`}>
            <Col span={5}>{e.bet_type}</Col>
            <Col span={5}><img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-${e.dice_first}.png`} alt="dice" /></Col>
            <Col span={5}><img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-${e.dice_second}.png`} alt="dice" /></Col>
            <Col span={5}><img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-${e.dice_third}.png`} alt="dice" /></Col>
          </Row>
        )
      }
      if([7].includes(e.combination_id)) {
        resultCellRow.push(
          <Row key={`rcr${i}${e.combination_detail_id}`}>
            <Col span={5}>{e.bet_type}</Col>
            <Col span={5}><img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-${e.dice_first}.png`} alt="dice" /></Col>
            <Col span={5}><img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-${e.dice_second}.png`} alt="dice" /></Col>
            <Col span={5}><img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-${e.dice_third}.png`} alt="dice" /></Col>
          </Row>
        )
      }
      if([8].includes(e.combination_id)) {
        resultCellRow.push(
          <Row key={`rcr${i}${e.combination_detail_id}`}>
            <Col span={5}>{e.bet_type}</Col>
            <Col span={5}><b>{e.extra}</b></Col>
          </Row>
        )
      }
      if([9].includes(e.combination_id)) {
        resultCellRow.push(
          <Row key={`rcr${i}${e.combination_detail_id}`}>
            <Col span={5}>{e.bet_type}</Col>
            <Col span={5}><img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-${e.dice_first}.png`} alt="dice" /></Col>
            <Col span={5}><img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-${e.dice_second}.png`} alt="dice" /></Col>
          </Row>
        )
      }
      if([10].includes(e.combination_id)) {
        resultCellRow.push(
          <Row key={`rcr${i}${e.combination_detail_id}`}>
            <Col span={5}>{e.bet_type}</Col>
            <Col span={5}><img className="dice_img" src={`${process.env.PUBLIC_URL}/dice/dice-${e.dice_first}.png`} alt="dice" /></Col>
            <Col span={5}>Total: {e.extra}</Col>
          </Row>
        )
      }
      if([12].includes(e.combination_id)) {
        resultCellRow.push(
          <Row key={`rcr${i}${e.combination_detail_id}`}>
            <Col span={5}>{e.bet_type}</Col>
            <Col span={5}>{e.extra}</Col>
          </Row>
        )
      }
      if([13].includes(e.combination_id)) {
        resultCellRow.push(
          <Row key={`rcr${i}${e.combination_detail_id}`}>
            <Col span={5}>{e.bet_type}</Col>
            <Col span={5}>{e.dice_first}{e.dice_second}{e.dice_third}</Col>
          </Row>
        )
      }
    })

    let userWinRow = [];

    userWinCell.forEach((e,i)=>{
      userWinRow.push(
        <Row key={`usrwin${e.bet_type}${i}`}>
          <Col span={5}>{e.bet_type}</Col>
          <Col span={5}>{e.initial_bet}</Col>
          <Col span={5}>{e.bet_win}</Col>
        </Row>
      )
    })

    return(
      <>
        <Modal 
          visible={visible}
          onCancel={this.props.closeModal}
          onOk={this.props.closeModal}
          style={{ top: 25 }}
          
        >
          <h4>{t('sicbo.bet_trans_detail')}</h4>
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
          <br />
          <Row>
            {diceResultRow}
          </Row>
          <br />
          <div className="resultCell__row">
          <h3>Result: </h3>
          {resultCellRow}
          <hr />
          {userWinCell.length > 0 ? 
          <h3>User Win: </h3>
          : ''}
          {userWinCell.length > 0 ? 
         <Row>
           <Col span={5}><b>Bet Type</b></Col>
           <Col span={5}><b>Initial Bet</b></Col>
           <Col span={5}><b>Bet Win</b></Col>
         </Row>
          : ''}
          {userWinRow}
          </div>
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

export default connect (mapStateToProps, mapDispatchToProps) (SicboBetTransDetailModal);
