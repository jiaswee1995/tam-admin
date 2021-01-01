import React, { Component } from "react";
import {
    message,
    Select,
    Tabs,
    Row,
    Col,
    Input,
    Button,
} from "antd";
import { connect } from "react-redux";
import { t } from "react-i18nify";
import { postModuleList, postNotiSend } from "../../../store/ducks/notification/actions";
import { getLanguage } from "../../../store/ducks/language/actions";
import PageContent from "../../../components/Content";
import "./index.scss";

class notiAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            module: 1,
            lang_code: "",
            module_data: [],
            label: [],
            tabKey: "0"

        };

        const data = {};
        data.type = "APP";
        this.props.postModuleList(data);

        this.props.getLanguage();
        this.handleType = this.handleType.bind(this);
        this.handleSummit = this.handleSummit.bind(this);
        this.handleLangCode = this.handleLangCode.bind(this);
        this.callback = this.callback.bind(this);
        this.handleSubject = this.handleSubject.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
    }
    handleSubject(locale, e){
        let label = this.state.label;

        if(label[locale] === undefined){
            label[locale]={};
        }

        label[locale].subject = e.target.value;
        this.setState({
            label : label
        })
        
    }

    handleMessage(locale, e){
        let label = this.state.label;

        if(label[locale] === undefined){
            label[locale]={};
        }

        label[locale].message = e.target.value;
        this.setState({
            label : label
        })

    }

    UNSAFE_componentWillMount() {
        this.props.getLanguage();
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.language_data !== this.props.language_data || 
            nextProps.language_data === this.props.language_data) {
            let l_data = JSON.parse(nextProps.language);
            if (l_data.statusCode === 200) {
                if (l_data.status === "success") {
                    this.setState({
                        data: l_data.data,
                        loading: false,
                    });
                }
            } else {
                message.error(l_data.msg);
                this.setState({
                    loading: false,
                });
            }
        }

        if (nextProps.module_data !== this.props.module_data) {
            if (nextProps.module_data.statusCode === 200) {
                if (nextProps.module_data.status === "success") {
                    this.setState({
                        module_data: nextProps.module_data.data,
                        loading: false,
                    });
                }
            } 
        }

        if (nextProps.send_data !== this.props.send_data) {
            if (nextProps.send_data.statusCode === 200) {
                if (nextProps.send_data.status === "success") {
                    message.success(nextProps.send_data.status)
                    this.setState({
                        loading: false,
                    });
                }
            } else {
                message.error(nextProps.send_data.msg)
                this.setState({
                    loading: false,
                });
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }
    }

    handleSummit() {
        const data = {};
        data.labels = {};
        let label = this.state.label;
        for (var i = 0 ; i < Object.keys(label).length ; i++){
            let lang = (Object.keys(label))[i];
            if(label[lang].subject !== ""){
                data.labels[lang] =  label[lang];
            }
        };
        data.module_id = this.state.module;

        this.props.postNotiSend(data);
    }

    handleStatus(e) {
        if (e.target.value === "") {
            e.target.value = "";
        }

        this.setState({
            status: e.target.value,
        });
    }

    handleType(e) {
        this.setState({
            module: e,
        });
    }

    handleLangCode(e) {
        this.setState({
            lang_code: e.target.value,
        });
    }

    callback(key) {
        this.setState({
            tabKey: key
        })
    }

    render() {
        const { Option } = Select;
        const { TabPane } = Tabs;
        const { TextArea } = Input;

        const {
            data,
            loading,
            module_data,
            label,
            tabKey
        } = this.state;

        console.log(label);
        
        let handleSubject = (locale, e) => {
            this.handleSubject(locale, e);
        }

        let handleMessage = (locale, e) => {
            this.handleMessage(locale, e);
        }

        let tab_list = data.map(function (item,i) {
            return <TabPane tab={item.name} key={i}>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("notification.subject")}</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Input maxLength={50} name={item.locale} onChange={(e) => {
                                handleSubject(item.locale, e);
                            }}>
                            </Input>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("notification.message")}</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <TextArea maxLength={100} rows={3} onChange={(e) => {
                                handleMessage(item.locale, e);
                            }}>
                            </TextArea>
                        </Col>
                    </Row>
                </TabPane>
        })

        let module_list = module_data.map(function (item,i) {
            return  <Option value={item.id} key={i}>{item.name}</Option>
        })
        
        return (
            <PageContent
                page_title={t("notification.notification_add")}
                add_button_url=""
                main_menu_id={["sub1"]}
                sub_menu_id={["27"]}
            >
                <div className="bg-light p-4 m-5">
                    <Row gutter={[16, 16]}>
                            <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <label>{t("filter.module_type")}</label>
                            </Col>
                            <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <Select
                                    defaultValue={1}
                                    className="w-10"
                                    onChange={this.handleType}
                                    required={true}
                                    dropdownMatchSelectWidth={false}
                                >
                                    {module_list}
                                </Select>
                            </Col>
                    </Row>
                    <Tabs defaultActiveKey={tabKey} onChange={this.callback} type='card'>
                        {tab_list}
                    </Tabs>
                    <div className="text-center">
                        <Button type="primary" onClick={this.handleSummit} loading={loading}>
                            {t("filter.add")}
                        </Button>
                    </div>
                </div>

            </PageContent>
        );
    }
}
const mapStateToProps = (state) => {
    const { notification, header_data, language } = state;
    return {
        notification_data: notification.data,
        header_data: header_data.data,
        language: language.lang,
        module_data: notification.module_data,
        send_data: notification.send_data
    };
};
const mapDispatchToProps = {
    postModuleList,
    getLanguage,
    postNotiSend
};
export default connect(mapStateToProps, mapDispatchToProps)(notiAdd);
