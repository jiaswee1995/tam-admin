import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import PageContent from "../../../components/Content";
import connect from "react-redux/es/connect/connect";
import { Table, message, Row, Col, Select, Button, Input } from 'antd';
import moment from 'moment';
import FilterFieldContainer from "../../../components/FilterFieldContainer";
import { postGetAllTableList, postGetSicboBetTrans, getBetTransDetail } from '../../../store/ducks/sicbo/actions'
import { EyeFilled } from '@ant-design/icons';
import SicboBetTransDetailModal from './SicboBetTransDetailModal';

const { Option } = Select;

class SicboBetTransTable extends Component{
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
            tbl_id: 0,
            user_id: "",
            tableList: [],

            detModal: false,
            diceResult: [],
            resultCell: [],
            userWinCell: [],
            transDet: {},
        }
    }
    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    viewBetTransDetail = (id) => {
        const data = {};
        data.bet_trans_id = id;
        this.props.getBetTransDetail(data);
        console.log(id);
    }

    componentDidMount(){
        this.props.postGetAllTableList({});
        this.getSicboTableData();
    }

    onTableChange = (e) => {
        this.setState({
            tbl_id: e,
        })
    }
    onChangeUserID = (e) => {
        this.setState({
            user_id: e.target.value,
        })
    }

    clearFilter = () => {
        this.setState({
            tbl_id: 0,
            user_id: "",
        }, () => {
            this.getSicboTableData();
        })
    }
    
    searchFilter = () => {
        this.getSicboTableData()
    }

    getSicboTableData = () => {
        this.setState({
            loadingTable: true,
        })
        const data = {};
        data.page = this.state.page;
        data.limit = this.state.limit;
        data.tbl_id = this.state.tbl_id;
        data.user_id = this.state.user_id;
        data.order_by = this.state.orderBy;
        data.order_type = this.state.orderType;
        this.props.postGetSicboBetTrans(data);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.sic_bet_trans !== this.props.sic_bet_trans){
           if(nextProps.sic_bet_trans.statusCode === 200){
               this.setState({
                   loadingTable: false,
                   data: nextProps.sic_bet_trans.data,
                   total_records: nextProps.sic_bet_trans.total_records,
               })
           } else {
               this.setState({
                   data: [],
                   total_records: 0,
                   loadingTable: false,
               })
               message.error(nextProps.sic_bet_trans.msg)
           }
        }

        if(nextProps.sic_table !== this.props.sic_table){
            if(nextProps.sic_table.statusCode === 200){
                this.setState({
                    tableList: nextProps.sic_table.data,
                })
                // console.log(nextProps.sic_table)
            }
        }

        if(nextProps.sic_trans_detail !== this.props.sic_trans_detail){
            if(nextProps.sic_trans_detail.statusCode === 200){
                // console.log(nextProps.sic_trans_detail)
                this.setState({
                    detModal: true,

                    diceResult: nextProps.sic_trans_detail.data.dice_result,
                    resultCell: nextProps.sic_trans_detail.data.result_cell,
                    userWinCell: nextProps.sic_trans_detail.data.user_win_cell,
                    transDet: nextProps.sic_trans_detail.data.trans_detail,
                })
            } else {
                message.error(nextProps.sic_trans_detail.msg);
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
            this.getSicboTableData();
        })
    }

    render() {
        const {
            data, loadingTable, total_records, sortedData, page, tableList, 
            tbl_id, user_id,   
            diceResult,
            resultCell,
            userWinCell,
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
            title: t('slot.table_code'),
            dataIndex: 'table_code',
            key: 'table_code',
            sorter: (a, b) => a.table_code - b.table_code,
            sortOrder: sortedInfo.columnKey === 'table_code' && sortedInfo.order,
            render: (text, record, index) => (
                <span key={`table_code${record.table_code}${index}`}>
                {record.table_code}
                </span>
            )
            },
            {
            title: t('slot.user_id'),
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
            title: t('slot.dice_result'),
            dataIndex: 'dice_result',
            key: 'dice_result',
            sorter: (a, b) => a.dice_result - b.dice_result,
            sortOrder: sortedInfo.columnKey === 'dice_result' && sortedInfo.order,
            render: (text, record, index) => (
                <span key={`dice_result${record.dice_result}${index}`}>
                {record.dice_result}
                </span>
            )
            },
            {
                title: t('slot.bet_tot'),
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
                title: t('slot.pay_return'),
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
                title: t('slot.pay_win'),
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
            title: t('slot.pay_tot'),
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
            title: t('slot.pay_win_rate'),
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
            title: t('slot.created_at'),
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
                title: t('slot.action'),
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
                <Option key={`op${i}${e.id}`} value={e.id}>{e.table_code}</Option>
            )
        })

        return (
            <>
            <PageContent page_title={t('slot.title.bet_transaction')} add_button_url="">
                <FilterFieldContainer children = {
                    <>
                        <Row>
                            <Col span={6}>
                                <h4>{t('slot.select_table')}</h4>
                            </Col>
                            <Col span={10}>
                                <Select
                                    style={{ width: '100%' }}
                                    value={tbl_id}
                                    placeholder="Select a Table"
                                    optionFilterProp="children"
                                    onChange={this.onTableChange}
                                    >
                                    <Option value={0}>Select a Table</Option>
                                    {tblOption}
                                </Select>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={6}>
                                <h4>{t('slot.user_id')}</h4>
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
            <SicboBetTransDetailModal
                visible={this.state.detModal}
                diceResult={diceResult}
                resultCell={resultCell}
                userWinCell={userWinCell}
                transDet={transDet}
                closeModal={this.closeModal}
            />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { sicbo } = state;
    return {
        sic_table : sicbo.sic_table,
        sic_bet_trans : sicbo.sic_bet_trans,
        sic_trans_detail: sicbo.sic_trans_detail,
    }
};

const mapDispatchToProps = {
    postGetAllTableList,
    postGetSicboBetTrans,
    getBetTransDetail,
};

export default connect (mapStateToProps, mapDispatchToProps) (SicboBetTransTable);