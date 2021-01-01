import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import PageContent from "../../../components/Content";
import connect from "react-redux/es/connect/connect";
import { Table, message, Row, Col, Select, Button, Input } from 'antd';
import moment from 'moment';
import FilterFieldContainer from "../../../components/FilterFieldContainer";
import { postGetAllRoulWheel, postGetRoulBetTrans, postGetRoulBetTransDetail } from '../../../store/ducks/roulette/actions'
import { EyeFilled } from '@ant-design/icons';
import RoulBetTransDetailModal from './RoulBetTransDetailModal';
// import SicboBetTransDetailModal from './SicboBetTransDetailModal';

const { Option } = Select;

class RouletteBetTransTable extends Component{
    constructor(){
        super();
        this.state = {
            data: [],
            sortedData: {},
            orderBy: "id",
            orderType: "desc",
            page: 1,
            limit: 10,
            total_records: 0,
            loadingTable: true,
            wheelCode: "",
            user_id: "",
            tableList: [],

            detModal: false,
            rouletteResult: {},
            userBetCell: [],
            transDet: {},
        }
    }
    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    viewBetTransDetail = (id) => {
        const data = {};
        data.bet_trans_id = id;
        this.props.postGetRoulBetTransDetail(data);
        console.log(id);
    }

    componentDidMount(){
        this.props.postGetAllRoulWheel({});
        this.getRouletteTransData();
    }

    onWheelChange = (e) => {
        this.setState({
          wheelCode: e,
        })
    }
    onChangeUserID = (e) => {
        this.setState({
            user_id: e.target.value,
        })
    }

    clearFilter = () => {
        this.setState({
          wheelCode: "",
            user_id: "",
        }, () => {
            this.getRouletteTransData();
        })
    }
    
    searchFilter = () => {
        this.getRouletteTransData()
    }

    getRouletteTransData = () => {
        this.setState({
            loadingTable: true,
        })
        const data = {};
        data.page = this.state.page;
        data.limit = this.state.limit;
        data.wheel_code = this.state.wheelCode;
        data.user_id = this.state.user_id;
        data.order_by = this.state.orderBy;
        data.order_type = this.state.orderType;
        this.props.postGetRoulBetTrans(data);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.roul_bet_trans !== this.props.roul_bet_trans){
           if(nextProps.roul_bet_trans.statusCode === 200){
               this.setState({
                   loadingTable: false,
                   data: nextProps.roul_bet_trans.data,
                   total_records: nextProps.roul_bet_trans.total_records,
               })
           } else {
               this.setState({
                   data: [],
                   total_records: 0,
                   loadingTable: false,
               })
               message.error(nextProps.roul_bet_trans.msg)
           }
        }

        if(nextProps.all_roul_wheel !== this.props.all_roul_wheel){
            if(nextProps.all_roul_wheel.statusCode === 200){
                this.setState({
                    tableList: nextProps.all_roul_wheel.data,
                })
                // console.log(nextProps.all_roul_wheel)
            }
        }

        if(nextProps.roul_bet_detail !== this.props.roul_bet_detail){
            if(nextProps.roul_bet_detail.statusCode === 200){
                // console.log(nextProps.roul_bet_detail)
                this.setState({
                    detModal: true,
                    rouletteResult: nextProps.roul_bet_detail.data.roulette_result,
                    userBetCell: nextProps.roul_bet_detail.data.user_bet_cell,
                    transDet: nextProps.roul_bet_detail.data.trans_detail,
                })
            } else {
                message.error(nextProps.roul_bet_detail.msg);
            }
        }

    }

    closeModal = () => {
        this.setState({
            detModal: false,
        })
    }

    handleChange = (page, pageSize, sorter) => {
        let order_type = sorter.order !== false ? (sorter.order === "ascend" ? "asc" : (sorter.order === "descend" ? "desc" : "desc")) : "asc";
        let order_by  = sorter.column !== undefined ? sorter.field : "id";
        console.log(order_type, order_by)
        this.setState({
            loadingTable: true,
            sortedData: sorter,
            page: page.current,
            limit: page.pageSize,
            orderBy: order_by,
            orderType: order_type,
        }, () => {
            this.getRouletteTransData();
        })
    }

    render() {
        const {
            data, loadingTable, total_records, sortedData, page, tableList, 
            wheelCode, user_id,   
            rouletteResult,
            userBetCell,
            transDet,
        } = this.state;

        const sortedInfo = sortedData || {};


        const columns = [
            {
                title: t('table_list.no'),
                dataIndex: 'index',
                key: 'index',
                width: '3%',
                render : (text,record,index) => (index + 1) + (page - 1) * 10  ,
            },
            {
            title: t('roul.wheel_code'),
            dataIndex: 'wheel_code',
            key: 'wheel_code',
            sorter: (a, b) => a.wheel_code - b.wheel_code,
            sortOrder: sortedInfo.columnKey === 'wheel_code' && sortedInfo.order,
            render: (text, record, index) => (
                <span key={`wheel_code${record.wheel_code}${index}`}>
                {record.wheel_code}
                </span>
            )
            },
            {
            title: t('roul.user_id'),
            dataIndex: 'user_id',
            key: 'user_id',
            sorter: (a, b) => a.user_id - b.user_id,
            sortOrder: sortedInfo.columnKey === 'user_id' && sortedInfo.order,
            render: (text, record, index) => (
                <span key={`user_id${record.user_id}${index}`}>
                {record.user_id}
                </span>
            )
            },
            {
            title: t('roul.roulette_stop_at'),
            dataIndex: 'roulette_stop_at',
            key: 'roulette_stop_at',
            sorter: (a, b) => a.roulette_stop_at - b.roulette_stop_at,
            sortOrder: sortedInfo.columnKey === 'roulette_stop_at' && sortedInfo.order,
            render: (text, record, index) => (
                <span key={`roulette_stop_at${record.roulette_stop_at}${index}`}>
                {record.roulette_stop_at}
                </span>
            )
            },
            {
                title: t('roul.bet_tot'),
                dataIndex: 'bet_tot',
                key: 'bet_tot',
                sorter: (a, b) => a.bet_tot - b.bet_tot,
                sortOrder: sortedInfo.columnKey === 'bet_tot' && sortedInfo.order,
                render: (text, record, index) => (
                    <span key={`bet_tot${record.bet_tot}${index}`}>
                    {record.bet_tot}
                    </span>
                )
            },
            {
                title: t('roul.pay_return'),
                dataIndex: 'pay_return',
                key: 'pay_return',
                sorter: (a, b) => a.pay_return - b.pay_return,
                sortOrder: sortedInfo.columnKey === 'pay_return' && sortedInfo.order,
                render: (text, record, index) => (
                    <span key={`pay_return${record.pay_return}${index}`}>
                    {record.pay_return}
                    </span>
                )
            },
            {
                title: t('roul.pay_win'),
                dataIndex: 'pay_win',
                key: 'pay_win',
                sorter: (a, b) => a.pay_win - b.pay_win,
                sortOrder: sortedInfo.columnKey === 'pay_win' && sortedInfo.order,
                render: (text, record, index) => (
                    <span key={`pay_win${record.pay_win}${index}`}>
                    {record.pay_win}
                    </span>
                )
            },
            {
            title: t('roul.pay_tot'),
            dataIndex: 'pay_tot',
            key: 'pay_tot',
            sorter: (a, b) => a.pay_tot - b.pay_tot,
            sortOrder: sortedInfo.columnKey === 'pay_tot' && sortedInfo.order,
            render: (text, record, index) => (
                <span key={`pay_tot${record.pay_tot}${index}`}>
                {record.pay_tot}
                </span>
            )
            },
            {
            title: t('roul.pay_win_rate'),
            dataIndex: 'pay_win_rate',
            key: 'pay_win_rate',
            sorter: (a, b) => a.pay_win_rate - b.pay_win_rate,
            sortOrder: sortedInfo.columnKey === 'pay_win_rate' && sortedInfo.order,
            render: (text, record, index) => (
                <span key={`pay_win_rate${record.pay_win_rate}${index}`}>
                {record.pay_win_rate}%
                </span>
            )
            },
            {
            title: t('roul.created_at'),
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: (a, b) => a.created_at - b.created_at,
            sortOrder: sortedInfo.columnKey === 'created_at' && sortedInfo.order,
            render: (text, record, index) => (
                <span key={`created_at${record.created_at}${index}`}>
                {moment(record.created_at).format("YYYY-MM-DD hh:mm:ss a")}
                </span>
            )
            },
            {
                title: t('lot.action'),
                key: 'action',
                render: (text, record) => (
                  <div>
                    <span style={{ cursor: "pointer" }} key={record.id} onClick={()=>this.viewBetTransDetail(record.id)}><EyeFilled /></span>&nbsp;
                  </div>
                ),
              }
        ]

        let tblOption = [];
        tableList.forEach((e,i)=>{
            tblOption.push(
                <Option key={`op${i}${e.id}`} value={e.wheel_code}>{e.wheel_code} - {e.wheel_desc}</Option>
            )
        })

        return (
            <>
            <PageContent page_title={t('roul.title.bet_transaction')} add_button_url="">
                <FilterFieldContainer children = {
                    <>
                        <Row>
                            <Col span={6}>
                                <h4>{t('roul.select_wheel')}</h4>
                            </Col>
                            <Col span={10}>
                                <Select
                                    style={{ width: '100%' }}
                                    value={wheelCode}
                                    placeholder="Select a Wheel"
                                    optionFilterProp="children"
                                    onChange={this.onWheelChange}
                                    >
                                    <Option value={""}>Select a Wheel</Option>
                                    {tblOption}
                                </Select>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={6}>
                                <h4>{t('roul.user_id')}</h4>
                            </Col>
                            <Col span={10}>
                                <Input type="text" value={user_id} onChange={this.onChangeUserID}/>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={24}>
                            <Button onClick={this.clearFilter}>Clear</Button>&nbsp;<Button type="primary" onClick={this.searchFilter}>Search</Button>
                            </Col>
                        </Row>
                    </>
                }
                />
                <div className="content__root">
                    <Table
                        key="tb1"
                        rowKey="uid"
                        columns={columns}
                        dataSource={data}
                        dataIndex={true}
                        // scroll={{ x: 2000 }}
                        onChange={this.handleChange}
                        loading={loadingTable}
                        pagination={{defaultCurrent: 1,
                            total:total_records ,
                            showTotal:total => `${t('table_list.total')} ${total} ${t('table_list.item')}`
                        }}
                        onRow={(record, rowIndex) => {
                            return {
                            // onClick: event => {this.handleRow(record)}, // click row
                            };
                        }}
                    />
                </div>
            </PageContent>
            <RoulBetTransDetailModal
                visible={this.state.detModal}
                closeModal={this.closeModal}
                rouletteResult={rouletteResult}
                userBetCell={userBetCell}
                transDet={transDet}
            />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { roulette } = state;
    return {
        all_roul_wheel : roulette.all_roul_wheel,
        roul_bet_trans : roulette.roul_bet_trans,
        roul_bet_detail: roulette.roul_bet_detail,
    }
};

const mapDispatchToProps = {
    postGetAllRoulWheel, 
    postGetRoulBetTrans,
    postGetRoulBetTransDetail,
};

export default connect (mapStateToProps, mapDispatchToProps) (RouletteBetTransTable);