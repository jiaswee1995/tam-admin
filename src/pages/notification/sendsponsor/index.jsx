import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import PageContent from "../../../components/Content";
import { postLanguageList, postMoudleList, postNotificationSendSponsor } from '../../../store/ducks/notification/actions';
import connect from "react-redux/es/connect/connect";
import { Tabs, Row, Col, Select, Button, message, Modal, Spin, Input } from 'antd';
import NotificationInput from './components/NotificationInput'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select;
const { confirm } = Modal;

class NotificationSendSponsor extends Component{
    constructor(){
        super();
        this.state = {
            langList: [],
            moduleList: [],
            module_id : 0,
            loading: true,
            sponID: "",
        }
    }
    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    componentDidMount(){
      const data = {};
      this.props.postLanguageList(data);

      const data2 = {};
      data2.type = "APP"
      this.props.postMoudleList(data2);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.lang_list !== this.props.lang_list){
            if(nextProps.lang_list.statusCode === 200){
                this.setState({
                    loading: false,
                    langList: nextProps.lang_list.data,
                })
            }
        }
        if(nextProps.module_list !== this.props.module_list){
            if(nextProps.module_list.statusCode === 200){
                this.setState({
                    moduleList: nextProps.module_list.data,
                })
            }
        }
        if(nextProps.noti_send !== this.props.noti_send){
            console.log(nextProps.noti_send);
            if(nextProps.noti_send.statusCode === 200){
                message.success(t('admin.success'))
                this.props.history.push("/notification/list");
                //notification/list
                //success
            } else {
                message.error(nextProps.noti_send.msg)
                this.setState({
                    loading: false,
                })
                //error
            }
        }

    }
    
    onChangeSponID = (e) => {
        this.setState({
            sponID: e.target.value
        })
    }

    onChange = (e) => {
        console.log(e);
    }

    selectChange = (e) => {
        this.setState({
            module_id: e,
        })
    }

    sendNotification = () => {
        if(this.state.module_id === 0 || this.state.sponID === ""){
            message.warn("Please Select Notification Module or Key in Sponsor ID");
        } else {
            confirm({
                title: 'Do you Sure want to Send Notification Now?',
                icon: <ExclamationCircleOutlined />,
                content: '',
                onOk : () => {
                  this.proceedSend(this.state.module_id, this.state.sponID);
                },
                onCancel() {
                  console.log('Cancel');
                },
              });
        }
    }

    proceedSend = (moduleID, sponID) => {
        let failed = 0;
        let failedLang = [];
        let ps = {};
        ps.module_id = moduleID;
        ps.labels = {};
        ps.user_id = sponID;
        var subjects = document.getElementsByName("notification_subject[]");
        subjects.forEach((e) => {
            let locale = e.getAttribute("data-locale");
            let subject = e.value;

            let msgID = "notification_message_" + locale;
            let msg = document.getElementById(msgID).value;

            // if(msg === ""){
            //     failed = false;
            //     message.warn(`Message ${locale} is Empty!`);
            //     return
            // }
            if(subject !== ""){
                if(msg === ""){
                    failed += 1;
                    failedLang.push(locale);
                }
                let langObj = {"subject": subject, "message": msg};
                ps.labels[locale] = langObj;
            }
        })

        if(failed === 0){
            this.setState({
                loading: true,
            }, () => {
                const data = ps;
                this.props.postNotificationSendSponsor(data);
                console.log('proceed send', ps);
            })
        } else {
            console.log(failed)
            message.warn(`Please fill finish for ${failedLang.toString()}`)
        }
 
    }

    render() {
        
        const { langList, moduleList, module_id, loading, sponID } = this.state;

        console.log(moduleList);

        let tabpane = [];
        langList.forEach((e,i)=>{
            if(e.active === 1){
                tabpane.push(
                    <TabPane tab={`${e.name}(${e.locale})`} key={e.id} >
                        <NotificationInput name={e.name} locale={e.locale}  />
                    </TabPane>
                )
            }
        })

        let moduleOption = [];
        moduleList.forEach((e,i)=>{
            if(e.status === "A"){
                moduleOption.push(
                    <Option value={e.id} key={`${i}${e.id}`}>{e.name}</Option>
                )
            }
        })


        return (
            <PageContent page_title={t('notification.send_notification_by_sponsor_id')} add_button_url="">
                <div className="content__root">
                <Spin spinning={loading}>
                   <h1>Send Notification</h1>
                   <br />
                   <Tabs defaultActiveKey="1" onChange={this.onChange}>
                        {tabpane}
                    </Tabs>
                    <br />
                    <Row>
                        <Col span={6}>
                            <h4>Notification Module</h4>
                        </Col>
                        <Col span={12}>
                        <Select
                            style={{ width: '100%' }}
                            value={module_id}
                            placeholder="Select a Module"
                            onChange={this.selectChange}
                        >
                            <Option value={0}>Select a Module</Option>
                            {moduleOption}
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={6}>
                            <h4>Sponsor User ID</h4>
                        </Col>
                        <Col span={12}>
                            <Input type="text" value={sponID} onChange={this.onChangeSponID} />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col span={6}>
                            <Button onClick={this.sendNotification}>Send Notification</Button>
                        </Col>
                    </Row>
                </Spin>
                </div>
            </PageContent>
        )
    }
}

const mapStateToProps = (state) => {
    const { notification } = state;
    return {
        lang_list : notification.lang_list,
        module_list : notification.module_list,
        noti_send: notification.noti_send,
    }
};

const mapDispatchToProps = {
    postLanguageList,
    postMoudleList,
    postNotificationSendSponsor,
};

export default connect (mapStateToProps, mapDispatchToProps) (NotificationSendSponsor);