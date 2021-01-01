import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import PageContent from "../../../components/Content";
import connect from "react-redux/es/connect/connect";
import { Table, message, Row, Col, Select, Button, Input } from 'antd';
import moment from 'moment';
import FilterFieldContainer from "../../../components/FilterFieldContainer";
import { postGetMemberAddrList } from '../../../store/ducks/wallet/actions';

const { Option } = Select;

class CryptoList extends Component{
  constructor(){
    super();
    this.state = {
        data: [],
        sortedData: {},
        orderBy: "created_at",
        orderType: "desc",
        page: 1,
        limit: 10,
        total_records: 0,
        loadingTable: true,

        user_id: "",
        address: "",
        crypto_type: "",
    }
  }

  componentDidMount(){
    this.getMemberAddrData();
  }

  onChangeUserID = (e) => {
    this.setState({
      user_id: e.target.value,
    })
  }

  onChangeAddress = (e) => {
    this.setState({
      address: e.target.value,
    })
  }

  onChangeCryptoType = (e) => {
    this.setState({
      crypto_type: e
    })
  }

  clearSearch = () => {
    this.setState({
      user_id: "",
      address: "",
      crypto_type: "",
    }, () => {
      this.getMemberAddrData();
    })
  }

  submitSearch = () => {
    this.setState({
      page: 1,
    }, () => {
      this.getMemberAddrData();
    })
  }

  getMemberAddrData = () => {
    this.setState({
      loadingTable: true,
    })

    const data = {};
    data.page = this.state.page;
    data.limit = this.state.limit;
    data.order_by = this.state.orderBy;
    data.order_type = this.state.orderType;
    data.user_id = this.state.user_id;
    data.address = this.state.address;
    data.crypto_type = this.state.crypto_type;

    this.props.postGetMemberAddrList(data);
  }

  componentWillMount() {
      setLocale(sessionStorage.getItem("lang"));
  }

  handleChange = (page, pageSize, sorter) => {
    let order_type = sorter.order !== false ? (sorter.order === "ascend" ? "asc" : (sorter.order === "descend" ? "desc" : "desc")) : "desc";
    let order_by  = sorter.column !== undefined ? sorter.field : "created_at";
    console.log(order_type, order_by)
    this.setState({
        sortedData: sorter,
        page: page.current,
        limit: page.pageSize,
        orderBy: order_by,
        orderType: order_type,
    }, () => {
        this.getMemberAddrData();
    })
}

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
      if(nextProps.addr_list !== this.props.addr_list){
        if(nextProps.addr_list.statusCode === 200){
          this.setState({
            loadingTable: false,
            data: nextProps.addr_list.data,
            total_records: nextProps.addr_list.total_records,
          })
        } else {
          this.setState({
            loadingTable: false,
            data: [],
            total_records: 0,
          })
          message.error(nextProps.addr_list.msg)
        }
      }

    }

    render() {
      const {
        data, loadingTable, total_records, page, sortedData,
        user_id, address, crypto_type
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
          title: t('member_list.user_id'),
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
          title: t('member_list.crypto_addr'),
          dataIndex: 'crypto_addr',
          key: 'crypto_addr',
          sorter: (a, b) => a.crypto_addr - b.crypto_addr,
          sortOrder: sortedInfo.columnKey === 'crypto_addr' && sortedInfo.order,
          render: (text, record, index) => (
              <span key={`crypto_addr${record.crypto_addr}${index}`}>
                <a href={`https://etherscan.io/address/${record.crypto_addr}`} target="_blank" rel="noopener noreferrer">
                {record.crypto_addr}
                </a>
              </span>
          )
        },
        {
          title: t('member_list.balance'),
          dataIndex: 'balance',
          key: 'balance',
          sorter: (a, b) => a.balance - b.balance,
          sortOrder: sortedInfo.columnKey === 'balance' && sortedInfo.order,
          render: (text, record, index) => (
              <span key={`balance${record.balance}${index}`}>
                {record.balance}
              </span>
          )
        },
        {
          title: t('member_list.crypto_type'),
          dataIndex: 'ewt_type',
          key: 'ewt_type',
          sorter: (a, b) => a.ewt_type - b.ewt_type,
          sortOrder: sortedInfo.columnKey === 'ewt_type' && sortedInfo.order,
          render: (text, record, index) => (
              <span key={`ewt_type${record.ewt_type}${index}`}>
              {record.ewt_type}
              </span>
          )
        },
        {
          title: t('member_list.redeem_at'),
          dataIndex: 'created_at',
          key: 'created_at',
          sorter: (a, b) => a.created_at - b.created_at,
          sortOrder: sortedInfo.columnKey === 'created_at' && sortedInfo.order,
          render: (text, record, index) => (
              <span key={`created_at${record.created_at}${index}`}>
              {moment(record.created_at).format("YYYY-MM-DD hh:mm:ss a")}
              {/* {record.created_at} */}
              </span>
          )
        },
      ]

        return (
            <PageContent page_title={t('member_list.member_crypto_address_list')} add_button_url="">
              <FilterFieldContainer children = {
                    <>
                        <Row>
                            <Col span={6}>
                                <h4>{t('member_list.user_id')}</h4>
                            </Col>
                            <Col span={10}>
                                <Input type="text" value={user_id} onChange={this.onChangeUserID} />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={6}>
                                <h4>{t('member_list.address')}</h4>
                            </Col>
                            <Col span={10}>
                                <Input type="text" value={address} onChange={this.onChangeAddress} />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={6}>
                                <h4>{t('member_list.crypto_type')}</h4>
                            </Col>
                            <Col span={10}>
                              <Select value={crypto_type} style={{ width: '100%' }} onChange={this.onChangeCryptoType}>
                                <Option value="">Select Type</Option>
                                <Option value="USDT">USDT</Option>
                                <Option value="ETH">ETH</Option>
                              </Select>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col span={5}>
                            <Button onClick={this.clearSearch}>Clear</Button>&nbsp;&nbsp;
                            <Button type="primary" onClick={this.submitSearch}>Search</Button>
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
        )
    }
}

const mapStateToProps = (state) => {
    const { wallet } = state;
    return {
        addr_list : wallet.addr_list
    }
};

const mapDispatchToProps = {
    postGetMemberAddrList
};

export default connect (mapStateToProps, mapDispatchToProps) (CryptoList);