import React, { Component } from 'react';
import { Table, message, Select, Row, Col, Button} from 'antd';
import { connect } from "react-redux";
import {t, setLocale} from "react-i18nify";
import { postDailyList} from "../../../store/ducks/dailyMach/actions";
import { postMechList } from "../../../store/ducks/betTrans/actions";
import PageContent from "../../../components/Content";
import FilterFieldContainer from "../../../components/FilterFieldContainer";
import "./index.scss";

class dailyMach extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            total_records: 0,
            page: 1,
            order_field: "created_at",
            order_type: "desc",
            sortedData: {},
            loading: true,
            mach_code: "",
            mech_data: []
        };
        const data = {};
        data.page = 1;
        data.limit = 10;
        data.filter = "DAILY";
        data.order_field = this.state.order_field;
        data.order_type = this.state.order_type;

        const mData = {};
        mData.page = 1;
        mData.limit = 20;

        this.props.postMechList(mData);
        this.props.postDailyList(data);

        this.handleCode = this.handleCode.bind(this);
        this.handleSummit = this.handleSummit.bind(this);
    }

    UNSAFE_componentWillMount(){
      setLocale(sessionStorage.getItem("lang"));
    }

      UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.daily_list_data !== this.props.daily_list_data) {
            if (nextProps.daily_list_data.statusCode === 200){
                if (nextProps.daily_list_data.status === 'success') {
                  this.setState({
                    data: nextProps.daily_list_data.data,
                    total_records: nextProps.daily_list_data.total_records,
                    loading: false
                  });
                }
            } else{
              message.error(nextProps.daily_list_data.msg);
            }
        }

        if (nextProps.mech_list_data !== this.props.mech_list_data) {
          if (nextProps.mech_list_data.statusCode === 200){
              if (nextProps.mech_list_data.status === 'success') {
                this.setState({
                  mech_data: nextProps.mech_list_data.data,
                });
              }
          } else{
            message.error(nextProps.mech_list_data.msg);
          }
        }

        if (nextProps.header_data !== this.props.header_data) {
          this.setState({});
        }
    }

     handleChange = (pagination, filters, sorter) => {
        const data = {}; 
        data.page = pagination.current;
        data.limit = 10;
        data.filter = "DAILY";
        data.mach_code = this.state.mach_code;
        data.order_field = sorter.column !== undefined ? sorter.field : this.state.order_field;
        data.order_type = sorter.order !== false ? (sorter.order === "ascend" ? "asc" : (sorter.order === "descend" ? "desc" : "asc")) : "asc";
        

        this.setState({
          loading: true,
          sortedData: sorter,
          page: pagination.current
        });
      
        this.props.postDailyList(data);
    };

    handleSummit(){
      const data = {}; 

      data.page = 1;
      data.limit = 10;
      data.order_field = this.state.order_field;
      data.order_type = this.state.order_type;
      data.mach_code = this.state.mach_code;
      data.filter = "DAILY";

      this.setState({
        loading: true,
      });

      this.props.postDailyList(data);  
   }

    handleCode(e){
      this.setState({
        mach_code : e
      });
     }

    render() {
        const {data, total_records, page, sortedData, loading, mech_data} = this.state;
        const sortedInfo = sortedData || {};
        const {Option} = Select;
        const columns = [
            {
              title: t('table_list.no'),
              dataIndex: 'index',
              key: 'index',
              width: 100,
              render : (text,record,index) => (index + 1) + (page - 1) * 10  ,
            },
            {
              title: t('daily_mach.mach_code'),
              dataIndex: 'mach_code',
              key: 'mach_code',
              sorter: (a, b) => a.mach_code - b.mach_code,
              sortOrder: sortedInfo.columnKey === 'mach_code' && sortedInfo.order,
              ellipsis: true,
              width: 130
            },
            {
              title: t('daily_mach.bet_tot'),
              dataIndex: 'bet_tot',
              key: 'bet_tot',
              sorter: (a, b) => a.bet_tot - b.bet_tot,
              sortOrder: sortedInfo.columnKey === 'bet_tot' && sortedInfo.order,
              ellipsis: true,
              align: 'right',
              width: 130
            },
            {
              title: t('daily_mach.pay_total'),
              dataIndex: 'pay_tot',
              key: 'pay_tot',
              sorter: (a, b) => a.pay_tot - b.pay_tot,
              sortOrder: sortedInfo.columnKey === 'pay_tot' && sortedInfo.order,
              ellipsis: true,
              align: 'right',
              width: 130
            },
            {
              title: t('table_list.created_at'),
              dataIndex: 'created_at',
              key: 'created_at',
              sorter: (a, b) => a.created_at - b.created_at,
              sortOrder: sortedInfo.columnKey === 'created_at' && sortedInfo.order,
              ellipsis: true,
              align: 'right',
              width: 250
            },
          ];

          let mech_list = [];

          mech_list = 
            mech_data.map(function (item, i){
                return <Option value={item.mach_code}>{item.mach_code}</Option>;
            });

        return (
            <PageContent page_title={t('daily_mach.daily_machine_list')} add_button_url="" main_menu_id={[8]} sub_menu_id={[28]}>
              <FilterFieldContainer>
                    <Row gutter={[16, 16]}>

                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t('filter.machine_code')}</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Select defaultValue={t('filter.please_select')} className="w-10" onChange={this.handleCode} required={true} >
                                {mech_list}
                            </Select>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 6 }} sm={{ span: 16 }} xs={{ span: 24 }}>
                            <Button type="primary" onClick={this.handleSummit} loading={loading}>{t('filter.search')}</Button>
                        </Col>
                    </Row>
                </FilterFieldContainer>
                
                    <Table
                        className="bg-light p-2 m-5"
                        rowKey="uid"
                        columns={columns}
                        dataSource={data}
                        dataIndex={true}
                        onChange={this.handleChange}
                        loading={loading}
                        scroll={{ x: 700 }}
                        pagination={{defaultCurrent: 1,
                            total:total_records ,
                            showTotal:total => `${t('table_list.total')} ${total} ${t('table_list.page')}`
                        }}
                    />
                
            </PageContent>
        )
    }
}
const mapStateToProps = (state) => {
  const {dailyList, header_data, betTransList} = state;
  return {
      daily_list_data: dailyList.data,
      header_data: header_data.data,
      mech_list_data : betTransList.mech_data,
  }
};
const mapDispatchToProps = {
    postDailyList,
    postMechList
};
export default connect (mapStateToProps, mapDispatchToProps) (dailyMach);
