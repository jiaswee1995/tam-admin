import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import PageContent from "../../../components/Content";
import connect from "react-redux/es/connect/connect";
import { postGetRoulWheelListing } from '../../../store/ducks/roulette/actions'
import { FormOutlined } from '@ant-design/icons';
import { Row, Col, Table, Tag } from 'antd';

class RoulWheelList extends Component{
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
      this.props.postGetRoulWheelListing(data);
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

    editWheel = (id) => {
      this.props.history.push({
        pathname: '/roulette/wheel-edit',
        state: { wid: id }
      })
      console.log(id);
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
          title: t('roul.wheel_code'),
          dataIndex: 'wheel_code',
          key: 'wheel_code',
          render: (text, record, index) => (
            <span key={`wheel_code${record.wheel_code}${record.id}`}>
              {record.wheel_code}
            </span>
          )
        },
        {
          title: t('roul.wheel_desc'),
          dataIndex: 'wheel_desc',
          key: 'wheel_desc',
          render: (text, record, index) => (
            <span key={`wheel_desc${record.wheel_desc}${record.id}`}>
              {record.wheel_desc}
            </span>
          )
        },
        {
          title: t('roul.min_bet'),
          dataIndex: 'min_bet',
          key: 'min_bet',
          render: (text, record, index) => (
            <span key={`min_bet${record.min_bet}${record.id}`}>
              {record.min_bet}
            </span>
          )
        },
        {
          title: t('roul.max_bet'),
          dataIndex: 'max_bet',
          key: 'max_bet',
          render: (text, record, index) => (
            <span key={`max_bet${record.max_bet}${record.id}`}>
              {record.max_bet}
            </span>
          )
        },
        {
          title: t('roul.pay_rate'),
          dataIndex: 'pay_rate',
          key: 'pay_rate',
          render: (text, record, index) => (
            <span key={`pay_rate${record.pay_rate}${record.id}`}>
              {record.pay_rate}
            </span>
          )
        },
        {
          title: t('roul.win_rate'),
          dataIndex: 'win_rate',
          key: 'win_rate',
          render: (text, record, index) => (
            <span key={`win_rate${record.win_rate}${record.id}`}>
              {record.win_rate}
            </span>
          )
        },
        {
          title: t('roul.zero_rate'),
          dataIndex: 'zero_rate',
          key: 'zero_rate',
          render: (text, record, index) => (
            <span key={`zero_rate${record.zero_rate}${record.id}`}>
              {record.zero_rate}
            </span>
          )
        },
        {
          title: t('roul.status'),
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
              <span style={{ cursor: "pointer", color: 'blue' }} key={record.id} onClick={()=>this.editWheel(record.id)}><FormOutlined /></span>&nbsp;
            </div>
          ),
        }
    ];

        return (
            <PageContent page_title={t('roul.title.wheel_list')} add_button_url="">
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
    const { roulette } = state;
    return {
        table_list : roulette.table_list,
    }
};

const mapDispatchToProps = {
  postGetRoulWheelListing
};

export default connect (mapStateToProps, mapDispatchToProps) (RoulWheelList);