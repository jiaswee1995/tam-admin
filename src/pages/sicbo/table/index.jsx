import React, { Component } from 'react';
import { t, setLocale } from "react-i18nify";
import PageContent from "../../../components/Content";
import connect from "react-redux/es/connect/connect";
import { postGetSicboTableList } from '../../../store/ducks/sicbo/actions'
import { FormOutlined } from '@ant-design/icons';
import { Row, Col, Table, Tag } from 'antd';

class SicboTableList extends Component{
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
      this.props.postGetSicboTableList(data);
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
        pathname: '/sicbo/table-edit',
        state: { tid: id }
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
          title: t('sicbo.table_code'),
          dataIndex: 'tbl_code',
          key: 'tbl_code',
          width: '3%',
          render: (text, record, index) => (
            <span key={`tbl_code${record.tbl_code}${record.id}`}>
              {record.tbl_code}
            </span>
          )
        },
        {
          title: t('sicbo.table_desc'),
          dataIndex: 'table_desc',
          key: 'table_desc',
          width: '5%',
          render: (text, record, index) => (
            <span key={`table_desc${record.table_desc}${record.id}`}>
              {record.table_desc}
            </span>
          )
        },
        {
          title: t('sicbo.min_bet'),
          dataIndex: 'min_bet',
          key: 'min_bet',
          width: '3%',
          render: (text, record, index) => (
            <span key={`min_bet${record.min_bet}${record.id}`}>
              {record.min_bet}
            </span>
          )
        },
        {
          title: t('sicbo.max_bet'),
          dataIndex: 'max_bet',
          key: 'max_bet',
          width: '3%',
          render: (text, record, index) => (
            <span key={`max_bet${record.max_bet}${record.id}`}>
              {record.max_bet}
            </span>
          )
        },
        {
          title: t('sicbo.pay_rate'),
          dataIndex: 'pay_rate',
          key: 'pay_rate',
          width: '3%',
          render: (text, record, index) => (
            <span key={`pay_rate${record.pay_rate}${record.id}`}>
              {record.pay_rate}
            </span>
          )
        },
        {
          title: t('sicbo.win_rate'),
          dataIndex: 'win_rate',
          key: 'win_rate',
          width: '3%',
          render: (text, record, index) => (
            <span key={`win_rate${record.win_rate}${record.id}`}>
              {record.win_rate}
            </span>
          )
        },
        {
          title: t('sicbo.double_dice_rate'),
          dataIndex: 'double_dice_rate',
          key: 'double_dice_rate',
          width: '3%',
          render: (text, record, index) => (
            <span key={`double_dice_rate${record.double_dice_rate}${record.id}`}>
              {record.double_dice_rate}
            </span>
          )
        },
        {
          title: t('sicbo.triple_dice_rate'),
          dataIndex: 'triple_dice_rate',
          key: 'triple_dice_rate',
          width: '3%',
          render: (text, record, index) => (
            <span key={`triple_dice_rate${record.triple_dice_rate}${record.id}`}>
              {record.triple_dice_rate}
            </span>
          )
        },
        {
          title: t('sicbo.status'),
          dataIndex: 'status',
          key: 'status',
          width: '3%',
          render: (text, record, index) => (
              <Tag color={record.status === "A" ? 'green' : 'red'} key={`status${record.status}${record.id}`}>
                    <span>{record.status === "A" ? 'Active' : 'Inactive'}</span>
              </Tag>
          )
        },
        {
          title: t('lot.action'),
          key: 'action',
          width: '3%',
          render: (text, record, index) => (
            <div key={`action${index}${record.id}`}>
              <span style={{ cursor: "pointer", color: 'blue' }} key={record.id} onClick={()=>this.editTable(record.id)}><FormOutlined /></span>&nbsp;
            </div>
          ),
        }
    ];

        return (
            <PageContent page_title={t('sicbo.title.table_list')} add_button_url="">
                <div className="content__root">
                <Row>
                  <Col span={24}>
                      <Table
                          key="tb1"
                          rowKey="uid"
                          columns={columns}
                          dataSource={data}
                          dataIndex={true}
                          // scroll={{ x: 1300 }}
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
    const { sicbo } = state;
    return {
        table_list : sicbo.table_list,
    }
};

const mapDispatchToProps = {
  postGetSicboTableList
};

export default connect (mapStateToProps, mapDispatchToProps) (SicboTableList);