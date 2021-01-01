import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import PageContent from "../../../components/Content";
import connect from "react-redux/es/connect/connect";
import { message, Tabs, Spin, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { postGetSicboTableDetail, postEditSicboTableDetail } from '../../../store/ducks/sicbo/actions';
import EditTableStep1 from './components/EditTableStep1';
import EditTableStep2SmallBig from './components/EditTableStep2SmallBig';
import EditTableStep3EvenOdd from './components/EditTableStep3EvenOdd';
import EditTableStep4DoubleDice from './components/EditTableStep4DoubleDice';
import EditTableStep5TripleDice from './components/EditTableStep5TripleDice';
import EditTableStep6AnyTriple from './components/EditTableStep6AnyTriple';
import EditTableStep7DiceTotal from './components/EditTableStep7DiceTotal';
import EditTableStep8TwoDiceComb from './components/EditTableStep8TwoDiceComb';
import EditTableStep9SingleDice from './components/EditTableStep9SingleDice';
import EditTableStep10RedCount from './components/EditTableStep10RedCount';
import EditTableStep11FourNum from './components/EditTableStep11FourNum';
import EditTableStep12NumComb from './components/EditTableStep12NumComb';

const { confirm } = Modal;
const { TabPane } = Tabs;


class EditTableIndex extends Component{
  constructor(){
    super();
    this.state = {
      loading: true,
      tid: 0,
      tblName: "",
      generalSetting: {},
      isEdit: false,

      //Step1
      tableDesc: "",
      payRate: 0,
      minBet: 0,
      maxBet: 0,
      winRate: 0,
      doubleDiceRate: 0,
      tripleDiceRate: 0,
      status: "",

      //tableCellSetting
      tableCellSetting: [],
    }
  }
  componentDidMount(){
    var tid = this.props.location.state === undefined ? "" : this.props.location.state.tid;
    if (tid === "") {
      message.error("invalid access")
      this.props.history.push('/sicbo/table');
    } else {
      this.setState({
        tid: tid,
      }, () => {
        const data = {};
        data.table_id = tid;
        this.props.postGetSicboTableDetail(data);
      })
    }
    console.log(tid);
  }

  componentWillMount() {
      setLocale(sessionStorage.getItem("lang"));
  }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.table_det !== this.props.table_det){
          if(nextProps.table_det.statusCode === 200){
            this.setState({
              loading: false,
              tblName: " - " + nextProps.table_det.data.table_detail.table_desc + " (" + nextProps.table_det.data.table_detail.tbl_code + ")",
              generalSetting: nextProps.table_det.data.table_detail,
              //set step1 state
              tableDesc: nextProps.table_det.data.table_detail.table_desc,
              minBet: nextProps.table_det.data.table_detail.min_bet,
              maxBet: nextProps.table_det.data.table_detail.max_bet,
              payRate: nextProps.table_det.data.table_detail.pay_rate,
              winRate: nextProps.table_det.data.table_detail.win_rate,
              doubleDiceRate: nextProps.table_det.data.table_detail.double_dice_rate,
              tripleDiceRate: nextProps.table_det.data.table_detail.triple_dice_rate,
              status: nextProps.table_det.data.table_detail.status,

              tableCellSetting: nextProps.table_det.data.table_cell_setting,
            })

            if(this.state.isEdit){
               message.success("Success");
               this.setState({
                 isEdit: false,
               })
            }
          } else {
            message.error(nextProps.table_det.msg);
          }
          console.log(nextProps.table_det)
        }

    }

    callback = (s) => {
      console.log(s)
    }


    onInputChange = (key, e) => {
      let val;
      if(key === "tableDesc") {
        val = e.target.value
      } else if(key === "status"){
        if(e){
          val = "A"
        } else {
          val = "I"
        }
      } else {
        val = e
      }
      this.setState({
        [key] : val
      })
    }

    submitEdit = () => {
      confirm({
        title: 'Do you confirm with these setting?',
        icon: <ExclamationCircleOutlined />,
        content: 'Please double check...',
        onOk: () => {
          this.submitEditTable();
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }

    submitEditTable = () => {
      let tcs = this.state.tableCellSetting;
      let table_cell_setting_arr = [];
      tcs.forEach((e, i) => {
        // let newInput = {}
        // newInput.cell_id = e.cell_id;
        // newInput.combination_detail_id = e.combination_detail_id;
        // newInput.min_bet = e.min_bet;
        // newInput.max_bet = e.max_bet;
        // newInput.odd = e.odd;
        // table_cell_setting_arr.push(newInput);
        //big small
        if(e.combination_detail_id === 1){
          let smallMin = document.getElementById("sicbo_small_min_bet");
          let smallMax = document.getElementById("sicbo_small_max_bet");
          let smallOdd = document.getElementById("sicbo_small_odd");
          console.log(smallMin.value, smallMax.value, smallOdd.value)
          let newInput = {}
          newInput.cell_id = e.cell_id;
          newInput.combination_detail_id = e.combination_detail_id;
          newInput.min_bet = parseInt(smallMin.value);
          newInput.max_bet = parseInt(smallMax.value);
          newInput.odd = parseInt(smallOdd.value);
          table_cell_setting_arr.push(newInput);
        }
        if(e.combination_detail_id === 2){
          let bigMin = document.getElementById("sicbo_big_min_bet");
          let bigMax = document.getElementById("sicbo_big_max_bet");
          let bigOdd = document.getElementById("sicbo_big_odd");
          let newInput = {}
          newInput.cell_id = e.cell_id;
          newInput.combination_detail_id = e.combination_detail_id;
          newInput.min_bet = parseInt(bigMin.value);
          newInput.max_bet = parseInt(bigMax.value);
          newInput.odd = parseInt(bigOdd.value);
          table_cell_setting_arr.push(newInput);
        }

        if(e.combination_detail_id === 3){
          let min = document.getElementById("sicbo_odd_min_bet");
          let max = document.getElementById("sicbo_odd_max_bet");
          let odd = document.getElementById("sicbo_odd_odd");
          let newInput = {}
          newInput.cell_id = e.cell_id;
          newInput.combination_detail_id = e.combination_detail_id;
          newInput.min_bet = parseInt(min.value);
          newInput.max_bet = parseInt(max.value);
          newInput.odd = parseInt(odd.value);
          table_cell_setting_arr.push(newInput);
        }

        if(e.combination_detail_id === 4){
          let min = document.getElementById("sicbo_even_min_bet");
          let max = document.getElementById("sicbo_even_max_bet");
          let odd = document.getElementById("sicbo_even_odd");
          let newInput = {}
          newInput.cell_id = e.cell_id;
          newInput.combination_detail_id = e.combination_detail_id;
          newInput.min_bet = parseInt(min.value);
          newInput.max_bet = parseInt(max.value);
          newInput.odd = parseInt(odd.value);
          table_cell_setting_arr.push(newInput);
        }

        if([3,4].includes(e.combination_id)) {
          let min = document.getElementById("double_dice_min_bet_" + e.combination_detail_id);
          let max = document.getElementById("double_dice_max_bet_" + e.combination_detail_id);
          let odd = document.getElementById("double_dice_odd_" + e.combination_detail_id);
          let newInput = {}
          newInput.cell_id = e.cell_id;
          newInput.combination_detail_id = e.combination_detail_id;
          newInput.min_bet = parseInt(min.value);
          newInput.max_bet = parseInt(max.value);
          newInput.odd = parseInt(odd.value);
          table_cell_setting_arr.push(newInput);
        }

        if([5,6].includes(e.combination_id)) {
          let min = document.getElementById("triple_dice_min_bet_" + e.combination_detail_id);
          let max = document.getElementById("triple_dice_max_bet_" + e.combination_detail_id);
          let odd = document.getElementById("triple_dice_odd_" + e.combination_detail_id);
          let newInput = {}
          newInput.cell_id = e.cell_id;
          newInput.combination_detail_id = e.combination_detail_id;
          newInput.min_bet = parseInt(min.value);
          newInput.max_bet = parseInt(max.value);
          newInput.odd = parseInt(odd.value);
          table_cell_setting_arr.push(newInput);
        }

        if(e.combination_id === 7) {
          let min = document.getElementById("sicbo_any_triple_min_bet");
          let max = document.getElementById("sicbo_any_triple_max_bet");
          let odd = document.getElementById("sicbo_any_triple_odd");
          let newInput = {}
          newInput.cell_id = e.cell_id;
          newInput.combination_detail_id = e.combination_detail_id;
          newInput.min_bet = parseInt(min.value);
          newInput.max_bet = parseInt(max.value);
          newInput.odd = parseInt(odd.value);
          table_cell_setting_arr.push(newInput);
        }

        if(e.combination_id === 8){
          let min = document.getElementById("dice_total_min_bet_" + e.combination_detail_id);
          let max = document.getElementById("dice_total_max_bet_" + e.combination_detail_id);
          let odd = document.getElementById("dice_total_odd_" + e.combination_detail_id);
          let newInput = {}
          newInput.cell_id = e.cell_id;
          newInput.combination_detail_id = e.combination_detail_id;
          newInput.min_bet = parseInt(min.value);
          newInput.max_bet = parseInt(max.value);
          newInput.odd = parseInt(odd.value);
          table_cell_setting_arr.push(newInput);
        }

        if(e.combination_id === 9){
          let min = document.getElementById("two_dice_combination_min_bet_" + e.combination_detail_id);
          let max = document.getElementById("two_dice_combination_max_bet_" + e.combination_detail_id);
          let odd = document.getElementById("two_dice_combination_odd_" + e.combination_detail_id);
          let newInput = {}
          newInput.cell_id = e.cell_id;
          newInput.combination_detail_id = e.combination_detail_id;
          newInput.min_bet = parseInt(min.value);
          newInput.max_bet = parseInt(max.value);
          newInput.odd = parseInt(odd.value);
          table_cell_setting_arr.push(newInput);
        }

        if(e.combination_id === 10){
          if(e.extra === "1"){
            let min = document.getElementById("single_dice_one_min_bet");
            let max = document.getElementById("single_dice_one_max_bet");
            let odd = document.getElementById("single_dice_one_odd");
            let newInput = {}
            newInput.cell_id = e.cell_id;
            newInput.combination_detail_id = e.combination_detail_id;
            newInput.min_bet = parseInt(min.value);
            newInput.max_bet = parseInt(max.value);
            newInput.odd = parseInt(odd.value);
            table_cell_setting_arr.push(newInput);
          }
          if(e.extra === "2"){
            let min = document.getElementById("single_dice_two_min_bet");
            let max = document.getElementById("single_dice_two_max_bet");
            let odd = document.getElementById("single_dice_two_odd");
            let newInput = {}
            newInput.cell_id = e.cell_id;
            newInput.combination_detail_id = e.combination_detail_id;
            newInput.min_bet = parseInt(min.value);
            newInput.max_bet = parseInt(max.value);
            newInput.odd = parseInt(odd.value);
            table_cell_setting_arr.push(newInput);
          }
          if(e.extra === "3"){
            let min = document.getElementById("single_dice_three_min_bet");
            let max = document.getElementById("single_dice_three_max_bet");
            let odd = document.getElementById("single_dice_three_odd");
            let newInput = {}
            newInput.cell_id = e.cell_id;
            newInput.combination_detail_id = e.combination_detail_id;
            newInput.min_bet = parseInt(min.value);
            newInput.max_bet = parseInt(max.value);
            newInput.odd = parseInt(odd.value);
            table_cell_setting_arr.push(newInput);
          }
        }


        if(e.combination_id === 11){
          if(e.extra === "1"){
            let min = document.getElementById("red_count_one_min_bet");
            let max = document.getElementById("red_count_one_max_bet");
            let odd = document.getElementById("red_count_one_odd");
            let newInput = {}
            newInput.cell_id = e.cell_id;
            newInput.combination_detail_id = e.combination_detail_id;
            newInput.min_bet = parseInt(min.value);
            newInput.max_bet = parseInt(max.value);
            newInput.odd = parseInt(odd.value);
            table_cell_setting_arr.push(newInput);
          }
          if(e.extra === "2"){
            let min = document.getElementById("red_count_two_min_bet");
            let max = document.getElementById("red_count_two_max_bet");
            let odd = document.getElementById("red_count_two_odd");
            let newInput = {}
            newInput.cell_id = e.cell_id;
            newInput.combination_detail_id = e.combination_detail_id;
            newInput.min_bet = parseInt(min.value);
            newInput.max_bet = parseInt(max.value);
            newInput.odd = parseInt(odd.value);
            table_cell_setting_arr.push(newInput);
          }
          if(e.extra === "3"){
            let min = document.getElementById("red_count_three_min_bet");
            let max = document.getElementById("red_count_three_max_bet");
            let odd = document.getElementById("red_count_three_odd");
            let newInput = {}
            newInput.cell_id = e.cell_id;
            newInput.combination_detail_id = e.combination_detail_id;
            newInput.min_bet = parseInt(min.value);
            newInput.max_bet = parseInt(max.value);
            newInput.odd = parseInt(odd.value);
            table_cell_setting_arr.push(newInput);
          }
        }

        if(e.combination_id === 12){
          let min = document.getElementById("four_num_min_bet_" + e.combination_detail_id);
          let max = document.getElementById("four_num_max_bet_" + e.combination_detail_id);
          let odd = document.getElementById("four_num_odd_" + e.combination_detail_id);
          let newInput = {}
          newInput.cell_id = e.cell_id;
          newInput.combination_detail_id = e.combination_detail_id;
          newInput.min_bet = parseInt(min.value);
          newInput.max_bet = parseInt(max.value);
          newInput.odd = parseInt(odd.value);
          table_cell_setting_arr.push(newInput);
        }

        if(e.combination_id === 13){
          let min = document.getElementById("num_comb_min_bet_" + e.combination_detail_id);
          let max = document.getElementById("num_comb_max_bet_" + e.combination_detail_id);
          let odd = document.getElementById("num_comb_odd_" + e.combination_detail_id);
          let newInput = {}
          newInput.cell_id = e.cell_id;
          newInput.combination_detail_id = e.combination_detail_id;
          newInput.min_bet = parseInt(min.value);
          newInput.max_bet = parseInt(max.value);
          newInput.odd = parseInt(odd.value);
          table_cell_setting_arr.push(newInput);
        }
      })

      let statusIsCheck = document.getElementById("sicbo_table_status").checked

      const data = {};
      data.table_id = this.state.tid;
      data.table_desc = document.getElementById("sicbo_table_desc").value;
      data.min_bet = parseInt(document.getElementById("sicbo_table_min_bet").value);
      data.max_bet = parseInt(document.getElementById("sicbo_table_max_bet").value);
      data.pay_rate = parseInt(document.getElementById("sicbo_table_pay_rate").value);
      data.win_rate = parseInt(document.getElementById("sicbo_table_win_rate").value);
      data.double_dice_rate = parseInt(document.getElementById("sicbo_table_double_dice_rate").value);
      data.triple_dice_rate = parseInt(document.getElementById("sicbo_table_triple_dice_rate").value);
      data.status = statusIsCheck ? "A" : "I";
      data.table_cell_setting = table_cell_setting_arr;

      this.setState({
        loading: true,
        isEdit: true,
      })

      this.props.postEditSicboTableDetail(data);
    }

    render() {
      const { 
        loading,
        generalSetting, tableDesc ,minBet, maxBet, winRate, doubleDiceRate, tripleDiceRate, status, payRate,
        tableCellSetting,
        tblName, 
      } = this.state;

      let smallMinBet = 0;
      let smallMaxBet = 0;
      let smallOdd = 0;
      let bigMinBet = 0;
      let bigMaxBet = 0;
      let bigOdd = 0;

      let oddMinBet = 0;
      let oddMaxBet = 0;
      let oddOdd = 0;

      let evenMinBet = 0;
      let evenMaxBet = 0;
      let evenOdd = 0;

      let doubleDiceData = [];
      
      let tripleDiceData = [];

      let anyTripleData = [];

      let diceTotalData = [];

      let twoDiceCombinationData = [];

      let singleDiceData = [];

      let redCountData = [];

      let fourNumData = [];

      let numCombinationData = [];

      tableCellSetting.forEach((e, i)=>{
        if(e.combination_detail_id === 1){
          smallMinBet = e.min_bet
          smallMaxBet = e.max_bet
          smallOdd = e.odd
        }
        if(e.combination_detail_id === 2){
          bigMinBet = e.min_bet
          bigMaxBet = e.max_bet
          bigOdd = e.odd
        }
        if(e.combination_detail_id === 3){
          oddMinBet = e.min_bet
          oddMaxBet = e.max_bet
          oddOdd = e.odd
        }
        if(e.combination_detail_id === 4){
          evenMinBet = e.min_bet
          evenMaxBet = e.max_bet
          evenOdd = e.odd
        }
        if([5,6,7,8,9,10].includes(e.combination_detail_id)) {
          doubleDiceData.push(e);
        }
        if([11,12,13,14,15,16].includes(e.combination_detail_id)) {
          tripleDiceData.push(e);
        }
        if([17,18,19,20,21,22].includes(e.combination_detail_id)) {
          anyTripleData.push(e);
        }
        if(e.combination_id === 8) {
          diceTotalData.push(e);
        }
        if(e.combination_id === 9) {
          twoDiceCombinationData.push(e);
        }
        if(e.combination_id === 10) {
          singleDiceData.push(e);
        }
        if(e.combination_id === 11) {
          redCountData.push(e);
        }
        if(e.combination_id === 12){
          fourNumData.push(e);
        }
        if(e.combination_id === 13){
          numCombinationData.push(e);
        }
      })

      let smallData = {
        "min_bet": smallMinBet,
        "max_bet": smallMaxBet,
        "odd": smallOdd,
      }
      let bigData = {
        "min_bet": bigMinBet,
        "max_bet": bigMaxBet,
        "odd": bigOdd,
      }
      let oddData = {
        "min_bet": oddMinBet,
        "max_bet": oddMaxBet,
        "odd": oddOdd,
      }
      let evenData = {
        "min_bet": evenMinBet,
        "max_bet": evenMaxBet,
        "odd": evenOdd,
      }

        return (
            <PageContent page_title={`${t('sicbo.title.edit_table')} ${tblName}`} add_button_url="">
              <Spin spinning={loading}>
                <div className="content__root edit_table_root">
                  <Tabs defaultActiveKey="1" onChange={this.callback} tabPosition="left">
                    <TabPane forceRender={true} tab={`${t('sicbo.general')}`} key="1">
                      {minBet > 0 ?
                        <EditTableStep1
                        data={generalSetting}
                        tableDesc={tableDesc}
                        payRate={payRate}
                        minBet={minBet}
                        maxBet={maxBet}
                        winRate={winRate}
                        doubleDiceRate={doubleDiceRate}
                        tripleDiceRate={tripleDiceRate}
                        status={status}
                        onInputChange={this.onInputChange}
                      /> 
                      : 'Loading...'}
                    </TabPane>
                    <TabPane forceRender={true} tab={`${t('sicbo.small_big')}`} key="2">
                      {
                        smallData.min_bet > 0 ? 
                        <EditTableStep2SmallBig smallData={smallData} bigData={bigData} />
                        : ''
                      }
                    </TabPane>
                    <TabPane forceRender={true} tab={`${t('sicbo.odd_even')}`} key="3">
                      {
                        oddData.min_bet > 0 ?
                          <EditTableStep3EvenOdd oddData={oddData} evenData={evenData} />
                        : ''
                      }
                    </TabPane>
                    <TabPane forceRender={true} tab={`${t('sicbo.double_dice')}`} key="4">
                      <EditTableStep4DoubleDice doubleDiceData={doubleDiceData} />
                    </TabPane>
                    <TabPane forceRender={true} tab={`${t('sicbo.triple_dice')}`} key="5">
                      <EditTableStep5TripleDice tripleDiceData={tripleDiceData} />
                    </TabPane>
                    <TabPane forceRender={true} tab={`${t('sicbo.any_triple')}`} key="6">
                      {
                        anyTripleData.length > 1 ?
                        <EditTableStep6AnyTriple anyTripleData={anyTripleData} />
                        :''
                      }
                    </TabPane>
                    <TabPane forceRender={true} tab={`${t('sicbo.dice_total')}`} key="7">
                      <EditTableStep7DiceTotal diceTotalData={diceTotalData} />
                    </TabPane>
                    <TabPane forceRender={true} tab={`${t('sicbo.two_dice_combination')}`} key="8">
                      <EditTableStep8TwoDiceComb twoDiceCombinationData={twoDiceCombinationData} />
                    </TabPane>
                    <TabPane forceRender={true} tab={`${t('sicbo.single_dice')}`} key="9">
                      {singleDiceData.length > 1 ?
                      <EditTableStep9SingleDice singleDiceData={singleDiceData} />                      
                      : ''
                      }
                    </TabPane>
                    <TabPane disabled={true} forceRender={true} tab={`${t('sicbo.red_count')}`} key="10">
                      {redCountData.length > 1 ?
                      <EditTableStep10RedCount redCountData={redCountData} />
                      : ''
                      }
                    </TabPane>
                    <TabPane forceRender={true} tab={`${t('sicbo.four_num')}`} key="11">
                      <EditTableStep11FourNum fourNumData={fourNumData} />
                    </TabPane>
                    <TabPane forceRender={true} tab={`${t('sicbo.num_combination')}`} key="12">
                      <EditTableStep12NumComb numCombinationData={numCombinationData} />
                    </TabPane>
                  </Tabs>
                  <br />
                  <Button onClick={this.submitEdit}>{t('sicbo.update')}</Button>
                </div>
              </Spin>
            </PageContent>
        )
    }
}

const mapStateToProps = (state) => {
    const { sicbo } = state;
    return {
        table_det : sicbo.table_det
    }
};

const mapDispatchToProps = {
    postGetSicboTableDetail,
    postEditSicboTableDetail,
};

export default connect (mapStateToProps, mapDispatchToProps) (EditTableIndex);