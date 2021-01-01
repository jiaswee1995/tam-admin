import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import PageContent from "../../../components/Content";
import connect from "react-redux/es/connect/connect";
import { postGetBacTable, postEditBacTable } from '../../../store/ducks/baccarat/actions';
import { message, Spin, Tabs, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import EditBacTableStep1 from './EditBacTableStep1';
import EditBacTableStep2 from './EditBacTableStep2';

const { TabPane } = Tabs;
const { confirm } = Modal;

class EditBacTable extends Component{
  constructor(){
    super();
    this.state = {
      loading: true,
      bid: 0,
      bacCode: "",

      tableData: {},
      tableDesc: "",
      payRate: 0,
      minBet: 0,
      maxBet: 0,
      winRate: 0,
      totalDeck: 0,
      status: "",

      bacSettings: [],

    }
  }
    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    componentDidMount(){
      var bid = this.props.location.state === undefined ? "" : this.props.location.state.bid;
      if(bid === ""){
        this.props.history.push("/baccarat/table");
        message.warn("Invalid Access");
      } else {
        this.setState({
          bid: bid,
        }, () => {
          this.props.postGetBacTable({"bac_id": bid})
        })
      }
      console.log(bid);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.bac_table !== this.props.bac_table){
            if(nextProps.bac_table.statusCode === 200){
              this.setState({
                loading: false,
                bacCode: nextProps.bac_table.data.bac_config.bac_code,
                tableData: nextProps.bac_table.data.bac_config,
                tableDesc: nextProps.bac_table.data.bac_config.bac_desc,
                payRate: nextProps.bac_table.data.bac_config.pay_rate,
                minBet: nextProps.bac_table.data.bac_config.min_bet,
                maxBet: nextProps.bac_table.data.bac_config.max_bet,
                winRate: nextProps.bac_table.data.bac_config.win_rate,
                totalDeck: nextProps.bac_table.data.bac_config.total_deck,
                status: nextProps.bac_table.data.bac_config.status,
                bacSettings: nextProps.bac_table.data.bac_settings,
              })
              console.log(nextProps.bac_table)
            } else {
              message.error(nextProps.bac_table.msg);
            }
        }

        if(nextProps.edit_bac_table !== this.props.edit_bac_table){
          if(nextProps.edit_bac_table.statusCode === 200){
            this.setState({
              loading: false,
            })
            message.success("Success");
          } else {
            message.error(nextProps.edit_bac_table.msg)
          }
        }

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
      let bacSettings = this.state.bacSettings;
      let statusIsCheck = document.getElementById("bac_table_status").checked
      let bacSettingInputs = []
      bacSettings.forEach((e,i)=>{

        let min = document.getElementById("bac_setting_min_bet_" + e.bet_type);
        let max = document.getElementById("bac_setting_max_bet_" + e.bet_type);
        let odd = document.getElementById("bac_setting_odd_" + e.bet_type);

        let cellInput = {};
        cellInput.bet_id = e.id;
        cellInput.min_bet = parseInt(min.value);
        cellInput.max_bet = parseInt(max.value);
        cellInput.odd = parseFloat(odd.value);

        bacSettingInputs.push(cellInput);
      })

      const data = {};
      data.bac_id = this.state.bid;
      data.bac_desc = document.getElementById("bac_table_desc").value;
      data.min_bet = parseInt(document.getElementById("bac_table_min_bet").value);
      data.max_bet = parseInt(document.getElementById("bac_table_max_bet").value);
      data.pay_rate = parseInt(document.getElementById("bac_table_pay_rate").value);
      data.win_rate = parseInt(document.getElementById("bac_table_win_rate").value);
      data.total_deck = parseInt(document.getElementById("bac_table_total_deck").value);
      data.status = statusIsCheck ? "A" : "I";
      data.bac_settings = bacSettingInputs;

      this.setState({
        loading: true,
      })
      console.log(data);
      this.props.postEditBacTable(data);
    }

    render() {
      const {
        bacCode, loading,
        tableData, tableDesc, 
        payRate, minBet, maxBet, winRate, totalDeck, status,
        bacSettings,
      } = this.state;
        return (
            <PageContent page_title={`${t('slot.edit_table')} (${bacCode})`} add_button_url="">
            <Spin spinning={loading}>
                <div className="content__root">
                  <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane forceRender={true} tab={`${t('slot.general')}`} key="1">
                      {minBet > 0 ?
                          <EditBacTableStep1
                            data={tableData}
                            tableDesc={tableDesc}
                            payRate={payRate}
                            minBet={minBet}
                            maxBet={maxBet}
                            winRate={winRate}
                            totalDeck={totalDeck}
                            status={status}
                          />
                      : 'Loading...'
                      }
                    </TabPane>
                    <TabPane forceRender={true} tab={`${t('slot.odd')}`} key="2">
                      {bacSettings.length > 0 ? <EditBacTableStep2 data={bacSettings} />: ''}
                    </TabPane>
                  </Tabs>
                  <br />
                  <Button onClick={this.submitEdit}>{t('slot.update')}</Button>
                </div>
            </Spin>
            </PageContent>
        )
    }
}

const mapStateToProps = (state) => {
    const { baccarat } = state;
    return {
      bac_table : baccarat.bac_table,
      edit_bac_table: baccarat.edit_bac_table
    }
};

const mapDispatchToProps = {
    postGetBacTable,
    postEditBacTable,
};

export default connect (mapStateToProps, mapDispatchToProps) (EditBacTable);