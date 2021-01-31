import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import { Statistic, Card, Row, Col } from 'antd';

import AnimatedNumber from "animated-number-react";
import PageContent from "../../components/Content";
import {
    getDashboardSales, getSicboWeeklySales, getSlotWeeklySales,
    getRoulWeeklySales,
} from "../../store/ducks/dashboard/actions";
import connect from "react-redux/es/connect/connect";
import moment from 'moment';

class dashboard extends Component{
    constructor(props){
        super(props);
console.log(123);
        this.state = {
            sales_today: "0.00",
            sales_last_week: "0.00",
            sales_last_month: "0.00",
            sales_this_month: "0.00",
            members_today: "0.00",
            members_this_week: "0.00",
            members_this_month: "0.00",
            members_last_month: "0.00",
            sic_data: [],
            slot_data: [],
            roul_data: [],
        }
    }

    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));

        // this.props.getDashboardSales();
        // this.props.getSicboWeeklySales();
        // this.props.getSlotWeeklySales();
        // this.props.getRoulWeeklySales();
    }
    
    componentDidMount(){
        let a = this.getDateOfISOWeek(33, 2020);
        console.log(a);
    }

    processSicData = (data) => {
        let new_sic_data = [];
        data.forEach((e, i) => {
            var res = e.week_no.split("/");
            let dateRange = this.getDateOfISOWeek(res[1], res[0]);

            let newV = {};
            newV.bet_tot = e.bet_tot;
            newV.bet_tot_count = e.bet_tot_count;
            newV.pay_rate = e.pay_rate;
            newV.pay_tot = e.pay_tot;
            newV.from = dateRange[0];
            newV.to = dateRange[1];

            new_sic_data.push(newV);
            
        });

        this.setState({
            sic_data: new_sic_data,
        })
    }

    processSlotData = (data) => {
        let new_slot_data = [];
        data.forEach((e, i) => {
            var res = e.week_no.split("/");
            let dateRange = this.getDateOfISOWeek(res[1], res[0]);

            let newV = {};
            newV.bet_tot = e.bet_tot;
            newV.bet_tot_count = e.bet_tot_count;
            newV.pay_rate = e.pay_rate;
            newV.pay_tot = e.pay_tot;
            newV.from = dateRange[0];
            newV.to = dateRange[1];

            new_slot_data.push(newV);
            
        });

        this.setState({
            slot_data: new_slot_data,
        })
    }

    processRoulData = (data) => {
        let new_roul_data = [];
        data.forEach((e, i) => {
            var res = e.week_no.split("/");
            let dateRange = this.getDateOfISOWeek(res[1], res[0]);

            let newV = {};
            newV.bet_tot = e.bet_tot;
            newV.bet_tot_count = e.bet_tot_count;
            newV.pay_rate = e.pay_rate;
            newV.pay_tot = e.pay_tot;
            newV.from = dateRange[0];
            newV.to = dateRange[1];

            new_roul_data.push(newV);
            
        });

        this.setState({
            roul_data: new_roul_data,
        })
    }

    getDateOfISOWeek = (w, y) => {
        var simple = new Date(y, 0, 1 + (w - 1) * 7);
        var dow = simple.getDay();
        var ISOweekStart = simple;
        if (dow <= 4)
            ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        else
            ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());


        let from = moment(ISOweekStart).format("YYYY-MM-DD");
        let to = moment(ISOweekStart).add(6,'days').format("YYYY-MM-DD");

        let range = [from, to];
        
        return range;
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.total_sales !== this.props.total_sales) {
            this.setState({
                sales_today: nextProps.total_sales.data[0].today_sales,
                sales_last_week: nextProps.total_sales.data[0].this_week_sales,
                sales_last_month: nextProps.total_sales.data[0].last_month_sales,
                sales_this_month: nextProps.total_sales.data[0].this_month_sales,
                members_today: nextProps.total_sales.data[1].today_members,
                members_this_week:  nextProps.total_sales.data[1].this_week_members,
                members_this_month:  nextProps.total_sales.data[1].this_month_members,
                members_last_month:  nextProps.total_sales.data[1].last_month_members,
            });
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }
        if (nextProps.sic_data !== this.props.sic_data){
            if(nextProps.sic_data.statusCode === 200){
                this.processSicData(nextProps.sic_data.data);
                // this.setState({
                //     sic_data: nextProps.sic_data.data,
                // })
            }
            console.log(nextProps.sic_data)
        }
        if (nextProps.slot_data !== this.props.slot_data){
            if(nextProps.slot_data.statusCode === 200){
                this.processSlotData(nextProps.slot_data.data);
            }
            console.log(nextProps.slot_data)
        }
        if (nextProps.roul_data !== this.props.roul_data){
            if(nextProps.roul_data.statusCode === 200){
                this.processRoulData(nextProps.roul_data.data);
            }
            console.log(nextProps.roul_data)
        }
    }

    formatValue = (value) => value.toFixed(2);
    formatValue1 = (value) => value.toFixed(0);

    render() {
        const {
            sales_today, sales_last_week, sales_last_month, sales_this_month, members_today, members_this_week, members_this_month, members_last_month,
            sic_data, slot_data, roul_data
        } = this.state;

        let sicRow = [];
        sic_data.forEach((e,i)=>{
            console.log(sic_data)
            sicRow.push(
                <Row key={`sic${i}`}>
                    <Col span={1}>
                        {i + 1}.
                    </Col>
                    <Col span={4}>
                        {e.from}
                    </Col>
                    <Col span={4}>
                        {e.to}
                    </Col>
                    <Col span={4}>
                        {e.bet_tot}
                    </Col>
                    <Col span={4}>
                        {e.bet_tot_count}
                    </Col>
                    <Col span={4}>
                        {e.pay_tot}
                    </Col>
                    <Col span={3}>
                        {e.pay_rate}
                    </Col>
                </Row>
            )
        })

        let slotRow = [];
        slot_data.forEach((e,i)=>{
            slotRow.push(
                <Row key={`slot${i}`}>
                    <Col span={1}>
                        {i + 1}.
                    </Col>
                    <Col span={4}>
                        {e.from}
                    </Col>
                    <Col span={4}>
                        {e.to}
                    </Col>
                    <Col span={4}>
                        {e.bet_tot}
                    </Col>
                    <Col span={4}>
                        {e.bet_tot_count}
                    </Col>
                    <Col span={4}>
                        {e.pay_tot}
                    </Col>
                    <Col span={3}>
                        {e.pay_rate}
                    </Col>
                </Row>
            )
        })

        let roulRow = [];
        roul_data.forEach((e,i)=>{
            roulRow.push(
                <Row key={`roul${i}`}>
                    <Col span={1}>
                        {i + 1}.
                    </Col>
                    <Col span={4}>
                        {e.from}
                    </Col>
                    <Col span={4}>
                        {e.to}
                    </Col>
                    <Col span={4}>
                        {e.bet_tot}
                    </Col>
                    <Col span={4}>
                        {e.bet_tot_count}
                    </Col>
                    <Col span={4}>
                        {e.pay_tot}
                    </Col>
                    <Col span={3}>
                        {e.pay_rate}
                    </Col>
                </Row>
            )
        })
        return (
            <PageContent page_title={t('dashboard.dashboard')} add_button_url="">
                <div className="site-card-border-less-wrapper p-5">
                    <Row>
                        <Col md={{ span: "12" }} xs={{ span: "24" }}>
                            <Card>
                                <Statistic
                                    title={t('dashboard.total_sales_this_month')}
                                    value={sales_this_month}
                                    precision={2}
                                />

                                <Row>
                                    <Col span={12}>
                                        <div>{t('dashboard.sales_today')}:</div>
                                    </Col>
                                        <Col className="text-right" span={12}>
                                        <div className="d-inline">
                                            {<AnimatedNumber
                                            value={sales_today}
                                            formatValue={this.formatValue}
                                            />}
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={12}>
                                        <div>{t('dashboard.sales_this_week')}:</div>
                                    </Col>
                                    <Col className="text-right" span={12}>
                                        <div className="d-inline">
                                            {<AnimatedNumber
                                            value={sales_last_week}
                                            formatValue={this.formatValue}
                                            />}
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={12}>
                                        <div>{t('dashboard.sales_last_month')}:</div>
                                    </Col>
                                    <Col className="text-right" span={12}>
                                        <div className="d-inline">
                                        {<AnimatedNumber
                                        value={sales_last_month}
                                        formatValue={this.formatValue}
                                        />}
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        <Col md={{ span: "12" }} xs={{ span: "24" }}>
                            <Card>
                                <Statistic
                                    title={t('dashboard.new_member_this_month')}
                                    value={members_this_month}
                                />

                                <Row><Col span={12}><div>{t('dashboard.member_today')}:</div></Col><Col className="text-right" span={12}><div className="d-inline">{<AnimatedNumber
                                    value={parseInt(members_today)}
                                    formatValue={this.formatValue1}
                                />}</div></Col></Row>

                                <Row><Col span={12}><div>{t('dashboard.this_week')}:</div></Col><Col className="text-right" span={12}><div className="d-inline">{<AnimatedNumber
                                    value={parseInt(members_this_week)}
                                    formatValue={this.formatValue1}
                                />}</div></Col></Row>

                                <Row><Col span={12}><div>{t('dashboard.last_month')}:</div></Col><Col className="text-right" span={12}><div className="d-inline">{<AnimatedNumber
                                    value={parseInt(members_last_month)}
                                    formatValue={this.formatValue1}
                                />}</div></Col></Row>
                            </Card>
                        </Col>
                    </Row>
                    {/*<br />*/}
                    {/*<Row className="weekly_sales_root">*/}
                    {/*    <Col span={12}>*/}
                    {/*        <Card title={t('slot.sicbo_weekly_sales')}>*/}
                    {/*            <Row>*/}
                    {/*                <Col span={1}><b>{t("slot.no")}</b></Col>*/}
                    {/*                <Col span={4}><b>{t("slot.from")}</b></Col>*/}
                    {/*                <Col span={4}><b>{t("slot.to")}</b></Col>*/}
                    {/*                <Col span={4}><b>{t("slot.bet_total")}</b></Col>*/}
                    {/*                <Col span={4}><b>{t("slot.bet_count")}</b></Col>*/}
                    {/*                <Col span={4}><b>{t("slot.pay_total")}</b></Col>*/}
                    {/*                <Col span={3}><b>{t("slot.pay_rate")}</b></Col>*/}
                    {/*            </Row>*/}
                    {/*            <hr />*/}
                    {/*            {sicRow}*/}
                    {/*        </Card>*/}
                    {/*    </Col>*/}
                    {/*    <Col span={12}>*/}
                    {/*        <Card title={t('slot.slot_weekly_sales')}>*/}
                    {/*            <Row>*/}
                    {/*                <Col span={1}><b>{t("slot.no")}</b></Col>*/}
                    {/*                <Col span={4}><b>{t("slot.from")}</b></Col>*/}
                    {/*                <Col span={4}><b>{t("slot.to")}</b></Col>*/}
                    {/*                <Col span={4}><b>{t("slot.bet_total")}</b></Col>*/}
                    {/*                <Col span={4}><b>{t("slot.bet_count")}</b></Col>*/}
                    {/*                <Col span={4}><b>{t("slot.pay_total")}</b></Col>*/}
                    {/*                <Col span={3}><b>{t("slot.pay_rate")}</b></Col>*/}
                    {/*            </Row>*/}
                    {/*            <hr />*/}
                    {/*            {slotRow}*/}
                    {/*        </Card>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    {/*<br />*/}
                    {/*<Row className="weekly_sales_root">*/}
                    {/*    <Col span={12}>*/}
                    {/*        <Card title={t('slot.roulette_weekly_sales')}>*/}
                    {/*            <Row>*/}
                    {/*                <Col span={1}><b>{t("slot.no")}</b></Col>*/}
                    {/*                <Col span={4}><b>{t("slot.from")}</b></Col>*/}
                    {/*                <Col span={4}><b>{t("slot.to")}</b></Col>*/}
                    {/*                <Col span={4}><b>{t("slot.bet_total")}</b></Col>*/}
                    {/*                <Col span={4}><b>{t("slot.bet_count")}</b></Col>*/}
                    {/*                <Col span={4}><b>{t("slot.pay_total")}</b></Col>*/}
                    {/*                <Col span={3}><b>{t("slot.pay_rate")}</b></Col>*/}
                    {/*            </Row>*/}
                    {/*            <hr />*/}
                    {/*            {roulRow}*/}
                    {/*        </Card>*/}
                    {/*    </Col>*/}
                    {/*    <Col span={12}>*/}
                    {/*        /!* <Card title={t('dashboard.slot_weekly_sales')}>*/}
                    {/*            <Row>*/}
                    {/*                <Col span={1}><b>No</b></Col>*/}
                    {/*                <Col span={4}><b>From</b></Col>*/}
                    {/*                <Col span={4}><b>To</b></Col>*/}
                    {/*                <Col span={4}><b>Bet Total</b></Col>*/}
                    {/*                <Col span={4}><b>Bet Count</b></Col>*/}
                    {/*                <Col span={4}><b>Pay Total</b></Col>*/}
                    {/*                <Col span={3}><b>Pay Rate</b></Col>*/}
                    {/*            </Row>*/}
                    {/*            <hr />*/}
                    {/*            {slotRow}*/}
                    {/*        </Card> *!/*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                </div>
            </PageContent>
        )
    }
}

const mapStateToProps = (state) => {
    const { dashboard, header_data } = state;
    return {
        total_sales : dashboard.data,
        header_data : header_data.data,
        sic_data: dashboard.sic_data,
        slot_data: dashboard.slot_data,
        roul_data: dashboard.roul_data,
    }
};

const mapDispatchToProps = {
    getDashboardSales,
    getSicboWeeklySales,
    getSlotWeeklySales,
    getRoulWeeklySales,
};

export default connect (mapStateToProps, mapDispatchToProps) (dashboard);
