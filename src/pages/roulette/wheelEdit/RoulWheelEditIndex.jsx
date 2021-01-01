import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import PageContent from "../../../components/Content";
import connect from "react-redux/es/connect/connect";
import { message , Tabs, Spin, Button, Modal } from 'antd';
import RoulWheelEditStep1 from './RoulWheelEditStep1';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { postGetRoulWheelDetail, postEditRoulWheel } from '../../../store/ducks/roulette/actions'
import RoulWheelEditStep2 from './RoulWheelEditStep2';

const { TabPane } = Tabs;
const { confirm } = Modal;


class RoulWheelEditIndex extends Component{
  constructor(){
    super();
    this.state = {
      loading: true,
      wheelCode: "",
      wheelData: {},

      //step1
      wheelDesc: "",
      payRate: 0,
      minBet: 0,
      maxBet: 0,
      winRate: 0,
      zeroRate: 0,
      status: "",

      //step2
      wheelSettings: [],
    }
  }
    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    componentDidMount(){
        var wid = this.props.location.state === undefined ? "" : this.props.location.state.wid;
        if (wid === "") {
          message.error("invalid access")
          this.props.history.push('/roulette/wheel');
        } else {
          this.setState({
            wid: wid,
          }, () => {
            const data = {};
            data.wheel_id = wid;
            this.props.postGetRoulWheelDetail(data);
          })
        }
        console.log(wid);
      }

    callback = (key) => {
      console.log(key);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.wheel_detail !== this.props.wheel_detail){
          // console.log(nextProps.wheel_detail)
            if(nextProps.wheel_detail.statusCode === 200){
              this.setState({
                loading: false,
                wheelCode: nextProps.wheel_detail.data.wheel_config.wheel_code,
                wheelData: nextProps.wheel_detail.data.wheel_config,
                wheelDesc: nextProps.wheel_detail.data.wheel_config.wheel_desc,
                payRate: nextProps.wheel_detail.data.wheel_config.pay_rate,
                minBet: nextProps.wheel_detail.data.wheel_config.min_bet,
                maxBet: nextProps.wheel_detail.data.wheel_config.max_bet,
                winRate: nextProps.wheel_detail.data.wheel_config.win_rate,
                zeroRate: nextProps.wheel_detail.data.wheel_config.zero_rate,
                status: nextProps.wheel_detail.data.wheel_config.status,

                wheelSettings: nextProps.wheel_detail.data.wheel_settings,
              })
            } else {
                message.error(nextProps.wheel_detail.msg, 10);
            }
        }

        if(nextProps.edit_wheel !== this.props.edit_wheel){
          if(nextProps.edit_wheel.statusCode === 200){
            this.setState({
              loading: false,
            })
            message.success("Success");
          } else {
            message.error(nextProps.edit_wheel.msg);
            this.setState({
              loading: false,
            })
          }
        }

    }

    submitEdit = () => {
      confirm({
        title: 'Do you confirm with these setting?',
        icon: <ExclamationCircleOutlined />,
        content: 'Please double check...',
        onOk: () => {
          this.submitEditWheel();
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }

    submitEditWheel = () => {
      let wheelSettings = this.state.wheelSettings;
      let statusIsCheck = document.getElementById("roul_wheel_status").checked
      let wheelSettingInput = []

      wheelSettings.forEach((e,i)=>{
        let min = document.getElementById("wheel_setting_min_bet_" + e.combination_id);
        let max = document.getElementById("wheel_setting_max_bet_" + e.combination_id);
        let odd = document.getElementById("wheel_setting_odd_" + e.combination_id);

        let cellInput = {};
        cellInput.combination_id = e.combination_id;
        cellInput.min_bet = parseInt(min.value);
        cellInput.max_bet = parseInt(max.value);
        cellInput.odd = parseInt(odd.value);

        wheelSettingInput.push(cellInput);
      })
      const data = {};
      data.wheel_id = this.state.wid;
      data.wheel_desc = document.getElementById("roul_wheel_desc").value;
      data.min_bet = parseInt(document.getElementById("roul_wheel_min_bet").value);
      data.max_bet = parseInt(document.getElementById("roul_wheel_max_bet").value);
      data.pay_rate = parseInt(document.getElementById("roul_wheel_pay_rate").value);
      data.win_rate = parseInt(document.getElementById("roul_wheel_win_rate").value);
      data.zero_rate = parseInt(document.getElementById("roul_wheel_zero_rate").value);
      data.status = statusIsCheck ? "A" : "I";
      data.wheel_settings = wheelSettingInput;

      this.setState({
        loading: true,
      })
      // console.log(data);
      this.props.postEditRoulWheel(data);
    }

    render() {
      const {
        loading, 
        wheelCode, wheelData, wheelDesc, payRate, minBet, maxBet,
        winRate, zeroRate, status,
        wheelSettings,
      } = this.state;
        return (
            <PageContent page_title={`${t('roul.edit_wheel')} (${wheelCode})`} add_button_url="">
                <div className="content__root">
                  <Spin spinning={loading}>
                  <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane forceRender={true} tab={t("roul.general")} key="1">
                      {minBet > 0 ?
                          <RoulWheelEditStep1
                            data={wheelData}
                            wheelDesc={wheelDesc}
                            payRate={payRate}
                            minBet={minBet}
                            maxBet={maxBet}
                            winRate={winRate}
                            zeroRate={zeroRate}
                            status={status}
                          />
                      : 'Loading...'
                      }
                    </TabPane>
                    {/* {wheelSettings.length > 0 ? <RoulWheelEditStep2 data={wheelSettings} />: ''} */}
                    <TabPane forceRender={true} tab={t("roul.odd_setting")} key="2">
                     {wheelSettings.length > 0 ? <RoulWheelEditStep2 data={wheelSettings} />: ''}
                      {/* <RoulWheelEditStep2 data={wheelSettings} /> */}
                    </TabPane>
                  </Tabs>
                  <br />
                  <Button onClick={this.submitEdit}>{t('sicbo.update')}</Button>
                  </Spin>
                </div>
            </PageContent>
        )
    }
}

const mapStateToProps = (state) => {
    const { roulette } = state;
    return {
        wheel_detail : roulette.wheel_detail,
        edit_wheel: roulette.edit_wheel,
    }
};

const mapDispatchToProps = {
  postGetRoulWheelDetail,
  postEditRoulWheel,
};

export default connect (mapStateToProps, mapDispatchToProps) (RoulWheelEditIndex);