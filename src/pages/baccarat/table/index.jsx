import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import PageContent from "../../../components/Content";
import connect from "react-redux/es/connect/connect";
import { postGetBacTableList } from '../../../store/ducks/baccarat/actions'
import { FormOutlined } from '@ant-design/icons';
import { Row, Col, Table, Tag } from 'antd';

class BaccaratTableList extends Component{
  constructor(){
    super();
    this.state = {
      loadingTable: true,
      page: 1,
      limit: 10,
      total_records: 0,
      data: [],
    }
  }
    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    componentDidMount(){
      const data = {};
      data.page = this.state.page;
      data.limit = this.state.limit;
      this.props.postGetBacTableList(data);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.table_list !== this.props.table_list){
          if(nextProps.table_list.statusCode === 200){
            this.setState({
              loadingTable: false,
              data: nextProps.table_list.data,
              total_records: nextProps.table_list.total_records,
            })
          }
          console.log(nextProps.table_list)
        }

    }

    editTable = (id) => {
      this.props.history.push({
        pathname: '/baccarat/table-edit',
        state: { bid: id }
      })
      console.log(id,"1");
    }

    render() {

      const { data, total_records, loadingTable, page } = this.state;


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
          render: (text, record, index) => (
            <span key={`bac_code${record.bac_code}${record.id}`}>
              {record.bac_code}
            </span>
          )
        },
        {
          title: t('slot.bac_desc'),
          dataIndex: 'bac_desc',
          key: 'bac_desc',
          render: (text, record, index) => (
            <span key={`bac_desc${record.bac_desc}${record.id}`}>
              {record.bac_desc}
            </span>
          )
        },
        {
          title: t('slot.min_bet'),
          dataIndex: 'min_bet',
          key: 'min_bet',
          render: (text, record, index) => (
            <span key={`min_bet${record.min_bet}${record.id}`}>
              {record.min_bet}
            </span>
          )
        },
        {
          title: t('slot.max_bet'),
          dataIndex: 'max_bet',
          key: 'max_bet',
          render: (text, record, index) => (
            <span key={`max_bet${record.max_bet}${record.id}`}>
              {record.max_bet}
            </span>
          )
        },
        {
          title: t('slot.pay_rate'),
          dataIndex: 'pay_rate',
          key: 'pay_rate',
          render: (text, record, index) => (
            <span key={`pay_rate${record.pay_rate}${record.id}`}>
              {record.pay_rate}
            </span>
          )
        },
        {
          title: t('slot.win_rate'),
          dataIndex: 'win_rate',
          key: 'win_rate',
          render: (text, record, index) => (
            <span key={`win_rate${record.win_rate}${record.id}`}>
              {record.win_rate}
            </span>
          )
        },
        {
          title: t('slot.total_deck'),
          dataIndex: 'total_deck',
          key: 'total_deck',
          render: (text, record, index) => (
            <span key={`total_deck${record.total_deck}${record.id}`}>
              {record.total_deck}
            </span>
          )
        },
        {
          title: t('slot.status'),
          dataIndex: 'status',
          key: 'status',
          render: (text, record, index) => (
              <Tag color={record.status === "A" ? 'green' : 'red'} key={`status${record.status}${record.id}`}>
                    <span>{record.status === "A" ? 'Active' : 'Inactive'}</span>
              </Tag>
          )
        },
        {
          title: t('lot.action'),
          key: 'action',
          render: (text, record, index) => (
            <div key={`action${index}${record.id}`}>
              <span style={{ cursor: "pointer", color: 'blue' }} key={record.id} onClick={()=>this.editTable(record.id)}><FormOutlined /></span>&nbsp;
            </div>
          ),
        }
    ];

        return (
            <PageContent page_title={t('slot.title.table_list')} add_button_url="">
                <div className="content__root">
                <Row>
                  <Col span={24}>
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
                    </Col>
                </Row>
                </div>
            </PageContent>
        )
    }
}

const mapStateToProps = (state) => {
    const { baccarat } = state;
    return {
        table_list : baccarat.table_list,
    }
};

const mapDispatchToProps = {
  postGetBacTableList
};

export default connect (mapStateToProps, mapDispatchToProps) (BaccaratTableList);