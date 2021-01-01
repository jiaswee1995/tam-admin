import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import PageContent from "../../../components/Content";
import connect from "react-redux/es/connect/connect";
import { Table, message, Row, Col, Select, Button, Input } from 'antd';
import moment from 'moment';
import FilterFieldContainer from "../../../components/FilterFieldContainer";
import { postGetAllBacTable, postGetBacBetTrans, postGetBacBetTransDetail } from '../../../store/ducks/baccarat/actions'
import { EyeFilled } from '@ant-design/icons';
import BacBetTransDetailModal from './BacBetTransDetailModal';

const { Option } = Select;

class BacBetTransTable extends Component{
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
            bacCode: "",
            user_id: "",
            tableList: [],

            detModal: false,
            transDet: {},
            cardResult: [],
            userBetCell: [],
        }
    }
    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    viewBetTransDetail = (id) => {
        const data = {};
        data.bet_trans_id = id;
        this.props.postGetBacBetTransDetail(data);
        console.log(id);
    }

    componentDidMount(){
        this.props.postGetAllBacTable({});
        this.getBacBetTransData();
    }

    onWheelChange = (e) => {
        this.setState({
          bacCode: e,
        })
    }
    onChangeUserID = (e) => {
        this.setState({
            user_id: e.target.value,
        })
    }

    clearFilter = () => {
        this.setState({
          bacCode: "",
            user_id: "",
        }, () => {
            this.getBacBetTransData();
        })
    }
    
    searchFilter = () => {
        this.getBacBetTransData()
    }

    getBacBetTransData = () => {
        this.setState({
            loadingTable: true,
        })
        const data = {};
        data.page = this.state.page;
        data.limit = this.state.limit;
        data.bac_code = this.state.bacCode;
        data.user_id = this.state.user_id;
        data.order_by = this.state.orderBy;
        data.order_type = this.state.orderType;
        this.props.postGetBacBetTrans(data);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.bac_bet_trans !== this.props.bac_bet_trans){
           if(nextProps.bac_bet_trans.statusCode === 200){
               this.setState({
                   loadingTable: false,
                   data: nextProps.bac_bet_trans.data,
                   total_records: nextProps.bac_bet_trans.total_records,
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

        if(nextProps.all_bac_table !== this.props.all_bac_table){
            if(nextProps.all_bac_table.statusCode === 200){
                this.setState({
                    tableList: nextProps.all_bac_table.data,
                })
                // console.log(nextProps.all_roul_wheel)
            }
        }

        if(nextProps.bac_bet_detail !== this.props.bac_bet_detail){
            if(nextProps.bac_bet_detail.statusCode === 200){
                console.log(nextProps.bac_bet_detail)
                this.setState({
                    detModal: true,
                    transDet: nextProps.bac_bet_detail.data.bet_detail,
                    cardResult: nextProps.bac_bet_detail.data.card_result,
                    userBetCell: nextProps.bac_bet_detail.data.user_bet_cell,
                })
            } else {
                message.error(nextProps.bac_bet_detail.msg);
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
            this.getBacBetTransData();
        })
    }

    render() {
        const {
            data, loadingTable, total_records, sortedData, page, tableList, 
            bacCode, user_id, 
            detModal,  
            transDet,
            cardResult,
            userBetCell,

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
            title: t('slot.bac_code'),
            dataIndex: 'bac_code',
            key: 'bac_code',
            sorter: (a, b) => a.bac_code - b.bac_code,
            sortOrder: sortedInfo.columnKey === 'bac_code' && sortedInfo.order,
            render: (text, record, index) => (
                <span key={`bac_code${record.bac_code}${index}`}>
                {record.bac_code}
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
            title: t('slot.bac_result'),
            dataIndex: 'bac_result',
            key: 'bac_result',
            sorter: (a, b) => a.bac_result - b.bac_result,
            sortOrder: sortedInfo.columnKey === 'bac_result' && sortedInfo.order,
            render: (text, record, index) => (
                <span key={`bac_result${record.bac_result}${index}`}>
                {record.bac_result}
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
                <Option key={`op${i}${e.id}`} value={e.bac_code}>{e.bac_code} - {e.bac_desc}</Option>
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
                                    value={bacCode}
                                    placeholder="Select a Table"
                                    optionFilterProp="children"
                                    onChange={this.onWheelChange}
                                    >
                                    <Option value={""}>Select a Table</Option>
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
            <BacBetTransDetailModal
                visible={detModal}
                closeModal={this.closeModal}
                transDet={transDet}
                cardResult={cardResult}
                userBetCell={userBetCell}
            />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { baccarat } = state;
    return {
        all_bac_table : baccarat.all_bac_table,
        bac_bet_trans : baccarat.bac_bet_trans,
        bac_bet_detail: baccarat.bac_bet_detail,
    }
};

const mapDispatchToProps = {
    postGetAllBacTable,
    postGetBacBetTrans,
    postGetBacBetTransDetail,
};

export default connect (mapStateToProps, mapDispatchToProps) (BacBetTransTable);