import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import PageContent from "../../../components/Content";
import connect from "react-redux/es/connect/connect";
import { Row, Col, Switch, Select, Table, message } from 'antd';
import { postGetTablePayRate } from '../../../store/ducks/sicbo/actions'

const { Option } = Select;

class SicboTablePayRate extends Component{
    constructor(){
        super();
        this.state = {
            cd: 60,
            cdVal: 60,
            autoReload: false,

            data: [],
            sortedData: {},
            orderBy: "table_id",
            orderType: "asc",
            page: 1,
            limit: 10,
            total_records: 0,
            loadingTable: true,
            tbl_id: 0,
        }
    }
    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    getTableData = () => {
        this.setState({
            loadingTable: true,
        })
        const data = {};
        
        data.page = this.state.page;
        data.limit = this.state.limit;
        data.tbl_id = this.state.tbl_id;
        data.order_by = this.state.orderBy;
        data.order_type = this.state.orderType;
        this.props.postGetTablePayRate(data);
    }

    componentDidMount(){
        this.startAutoReload();
        this.getTableData();
    }

    componentWillUnmount(){
        clearInterval(this.autoReloadInterval)
    }

    onCdValChange = (v) => {
        this.setState({
            cd: v,
            cdVal: v,
        })
    }


    onChangeAuto = (checked) => {
        clearInterval(this.autoReloadInterval);
        this.setState({
            autoReload: false,
            cd: this.state.cdVal,
        })

        if(checked){
            this.setState({
                autoReload: true,
            })
            this.startAutoReload();
        } else {
            clearInterval(this.autoReloadInterval);
            this.setState({
                autoReload: false,
                cd: this.state.cdVal,
            })
        }
        console.log(checked)
    }


    startAutoReload = () => {
        if(!this.state.autoReload){
            this.setState({
                autoReload: true,
            })
            this.autoReloadInterval = setInterval(()=>{
                if(this.state.cd === 0){
                    //reload
                    this.getTableData();
                    console.log("reload");
                    this.setState({
                        cd: this.state.cdVal,
                    })
                } else {
                    this.setState({
                        cd: this.state.cd - 1,
                    })
                }
            }, 1000)
        }
    }

    handleChange = (page, pageSize, sorter) => {
        let order_type = sorter.order !== false ? (sorter.order === "ascend" ? "asc" : (sorter.order === "descend" ? "desc" : "asc")) : "asc";
        let order_by  = sorter.column !== undefined ? sorter.field : "table_id";
        console.log(order_type, order_by)
        this.setState({
            loadingTable: true,
            sortedData: sorter,
            page: page.current,
            limit: page.pageSize,
            orderBy: order_by,
            orderType: order_type,
        }, () => {
            this.getTableData();
        })
    }
    

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.sic_pay_rate !== this.props.sic_pay_rate){
            if(nextProps.sic_pay_rate.statusCode === 200){
                this.setState({
                    loadingTable: false,
                    data: nextProps.sic_pay_rate.data,
                    total_records: nextProps.sic_pay_rate.total_records,
                })
            } else {
                this.setState({
                    data: [],
                    total_records: 0,
                    loadingTable: false,
                })
                message.error(nextProps.sic_pay_rate.msg)
            }
         }

    }

    render() {

        const {
            cd,
            data, loadingTable, total_records, sortedData, page,
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
                title: t('sicbo.table_code'),
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
                title: t('sicbo.bet_tot'),
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
                title: t('sicbo.pay_tot'),
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
                title: t('sicbo.pay_rate'),
                dataIndex: 'pay_rate',
                key: 'pay_rate',
                sorter: (a, b) => a.pay_rate - b.pay_rate,
                sortOrder: sortedInfo.columnKey === 'pay_rate' && sortedInfo.order,
                render: (text, record, index) => (
                    <span key={`pay_rate${record.pay_rate}${index}`}>
                    {record.pay_rate}
                    </span>
                )
            },
        ];

        return (
            <PageContent page_title={t('sicbo.title.tale_pay_rate')} add_button_url="">
                <div className="content__root">
                    <Row>
                        <Col span={5}>
                            {t('lot.auto_reload')} ({cd})
                        </Col>
                        <Col span={5}>
                        <Select defaultValue={`1 min`} style={{ width: 120 }} onChange={this.onCdValChange}>
                            <Option value="10">10 sec</Option>
                            <Option value="30">30 sec</Option>
                            <Option value="60">1 min</Option>
                            <Option value="300">5 min</Option>
                            <Option value="600">10 min</Option>
                            <Option value="1800">30 min</Option>
                            </Select>
                        </Col>
                        <Col span={3}>
                            <Switch defaultChecked onChange={this.onChangeAuto} />
                        </Col>
                    </Row>
                    <br />
                    <hr />
                    <br />
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
        )
    }
}

const mapStateToProps = (state) => {
    const { sicbo } = state;
    return {
        sic_pay_rate : sicbo.sic_pay_rate
    }
};

const mapDispatchToProps = {
    postGetTablePayRate,
};

export default connect (mapStateToProps, mapDispatchToProps) (SicboTablePayRate);