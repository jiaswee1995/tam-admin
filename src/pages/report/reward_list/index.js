import React, { Component } from 'react';
import {Table, message, Row, Col, Input, DatePicker, Button} from 'antd';
import { connect } from "react-redux";
import {t, setLocale} from "react-i18nify";
import { postRewardList} from "../../../store/ducks/reward/actions";
import PageContent from "../../../components/Content";
import "./index.scss";
import FilterFieldContainer from "../../../components/FilterFieldContainer";

class dailyMach extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            total_records: 0,
            page: "1",
            order_field: "bns_id",
            order_type: "desc",
            sortedData: {},
            loading: true,
            user_id: "",
            date_range: "",
            sponsor_user_id: "",
            date_from: "",
            date_to: ""
        };
        const data = {};
        data.page = "1";
        data.limit = "10";
        data.order_field = this.state.order_field;
        data.order_type = this.state.order_type;

        this.props.postRewardList(data);

        this.handleUserId = this.handleUserId.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleSponsorUserId = this.handleSponsorUserId.bind(this);
        this.handleSummit = this.handleSummit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    UNSAFE_componentWillMount(){
        setLocale(sessionStorage.getItem("lang"));
      }

      UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.reward_data !== this.props.reward_data) {
            if (nextProps.reward_data.statusCode === 200){
                if (nextProps.reward_data.status === 'success') {
                  this.setState({
                    data: nextProps.reward_data.data,
                    total_records: nextProps.reward_data.total_records,
                    loading: false
                  });
                }
            } else{
              message.error(nextProps.reward_data.msg);
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
          }
    }

    handleSummit(e){
        const data = {};
        data.page = "1";
        data.limit = "10";
        data.user_id = this.state.user_id;
        data.date_range = this.state.date_range;
        data.sponsor_user_id = this.state.sponsor_user_id;
        data.order_field = this.state.order_field;
        data.order_type = this.state.order_type;
        data.date_from = this.state.date_from;
        data.date_to = this.state.date_to;

        this.props.postRewardList(data);
    }

    handleUserId(e){
        this.setState({user_id: e.target.value});
    }

    handleSponsorUserId(e){
        this.setState({sponsor_user_id: e.target.value});
    }

    onDateChange(date, dateString){
        this.setState({
            date_from: dateString[0],
            date_to: dateString[1]
        });
    }

     handleChange = (pagination, filters, sorter) => {
        const data = {}; 
        data.page = pagination.current;
        data.limit = "10";
        data.order_field = sorter.column !== undefined ? sorter.field : this.state.order_field;
        data.order_type = sorter.order !== false ? (sorter.order === "ascend" ? "asc" : (sorter.order === "descend" ? "desc" : "asc")) : "asc";
        

        this.setState({
          loading: true,
          sortedData: sorter,
          page: pagination.current
        });
      
        this.props.postRewardList(data);
    };
   
    render() {
        const {data, total_records, page, sortedData, loading, user_id, sponsor_user_id} = this.state;
        const sortedInfo = sortedData || {};
        const columns = [
            {
                title: t('table_list.no'),
                dataIndex: 'index',
                key: 'index',
                width: 50,
                render : (text,record,index) => (index + 1) + (page - 1) * 10,
            },
            {
                title: t('table_list.user_id'),
                dataIndex: 'user_id',
                key: 'user_id',
                sorter: (a, b) => a.user_id - b.user_id,
                sortOrder: sortedInfo.columnKey === 'user_id' && sortedInfo.order,
                ellipsis: true,
                align: 'right',
                width: 100
            },
            {
                title: t('reward.sponsor'),
                dataIndex: 'sponsor_user_id',
                key: 'sponsor_user_id',
                sorter: (a, b) => a.sponsor_user_id - b.sponsor_user_id,
                sortOrder: sortedInfo.columnKey === 'sponsor_user_id' && sortedInfo.order,
                ellipsis: true,
                align: 'right',
                width: 130
            },
            {
                title: t('reward.roi_bonus'),
                dataIndex: 'roi_bonus',
                key: 'roi_bonus',
                sorter: (a, b) => a.roi_bonus - b.roi_bonus,
                sortOrder: sortedInfo.columnKey === 'roi_bonus' && sortedInfo.order,
                ellipsis: true,
                align: 'right',
                width: 150
            },
            {
                title: t('reward.uni_level_bonus'),
                dataIndex: 'roi_bonus',
                key: 'roi_bonus',
                sorter: (a, b) => a.roi_bonus - b.roi_bonus,
                sortOrder: sortedInfo.columnKey === 'roi_bonus' && sortedInfo.order,
                ellipsis: true,
                align: 'right',
                width: 150
            },
            {
                title: t('reward.win_bonus'),
                dataIndex: 'win_bonus',
                key: 'win_bonus',
                sorter: (a, b) => a.win_bonus - b.win_bonus,
                sortOrder: sortedInfo.columnKey === 'win_bonus' && sortedInfo.order,
                ellipsis: true,
                align: 'right',
                width: 150
            },
            {
                title: t('reward.total_bonus'),
                dataIndex: 'total_bonus',
                key: 'total_bonus',
                sorter: (a, b) => a.total_bonus - b.total_bonus,
                sortOrder: sortedInfo.columnKey === 'total_bonus' && sortedInfo.order,
                ellipsis: true,
                align: 'right',
                width: 150
            },
            {
                title: t('reward.created_date'),
                dataIndex: 'bns_date',
                key: 'bns_date',
                sorter: (a, b) => a.bns_date - b.bns_date,
                sortOrder: sortedInfo.columnKey === 'bns_date' && sortedInfo.order,
                ellipsis: true,
                width: 130
            },
        ];

        return (
            <PageContent page_title={t('reward.reward_list')} add_button_url="" main_menu_id={[8]} sub_menu_id={[28]}>
                <FilterFieldContainer>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t('filter.user_id')}</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Input
                                value={user_id}
                                onChange={this.handleUserId}
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t('filter.sponsor_user_id')}</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Input
                                value={sponsor_user_id}
                                onChange={this.handleSponsorUserId}
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col md={3} xs={24} sm={{ span: 24 }}>
                            <label>{t('filter.date')}</label>
                        </Col>
                        <Col md={6} xs={24} sm={{ span: 24 }}>
                            <DatePicker.RangePicker onChange={this.onDateChange} className="w-10" />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 6 }} sm={{ span: 16 }} xs={{ span: 24 }}>
                            <Button type="primary" onClick={this.handleSummit} loading={loading}>{t('filter.search')}</Button>
                        </Col>
                    </Row>
                </FilterFieldContainer>
                <div className="bg-light p-2 m-5">
                    <Table
                        rowKey="uid"
                        columns={columns}
                        dataSource={data}
                        dataIndex={true}
                        scroll={{ x: 1300 }}
                        onChange={this.handleChange}
                        loading={loading}
                        pagination={{defaultCurrent: 1,
                            total:total_records ,
                            showTotal:total => `${t('table_list.total')} ${total} ${t('table_list.item')}`
                        }}
                    />
                </div>
            </PageContent>
        )
    }
}
const mapStateToProps = (state) => {
  const {reward, header_data} = state;
  return {
      reward_data: reward.data,
      header_data: header_data.data
  }
};
const mapDispatchToProps = {
    postRewardList,
};
export default connect (mapStateToProps, mapDispatchToProps) (dailyMach);
