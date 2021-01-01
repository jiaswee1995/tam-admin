import React, { Component } from 'react';
import {Table, Button, Input, Typography, Select, Row, Col, message, Space} from 'antd';
import {connect} from "react-redux";
import { t, setLocale } from "react-i18nify";

import { postBalanceList} from "../../../store/ducks/balanceList/actions";
import { getWalletTypeList} from "../../../store/ducks/wallet/actions";
import FilterFieldContainer from "../../../components/FilterFieldContainer";
import PageContent from "../../../components/Content";

class listWalletBalance extends Component{
    constructor(props){
        super(props);
        this.state = {
            theme: 'dark',
            current: '1',
            data: [],
            total_records: 0,
            user_id: "",
            wallet: "",
            order_field: "user_id",
            order_type: "asc",
            page: 1,
            wallet_type: [],
            loading: false,
            table_loading: false,
            sortedData: {},
        };
        this.props.getWalletTypeList();
        this.onChange = this.onChange.bind(this);
        this.handleUserId = this.handleUserId.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.balance_list !== this.props.balance_list) {
            if (nextProps.balance_list.statusCode === 200)
            {
                if (nextProps.balance_list.status === 'success') {
                  this.setState({
                    data: nextProps.balance_list.data,
                    total_records: nextProps.balance_list.total_records,
                    loading: false,
                    table_loading: false
                  });
                }
            }
            else{
                message.error(nextProps.balance_list.msg);
                this.setState({
                    loading: false,
                    table_loading: false
                });
            }
        }

        if (nextProps.wallet_type !== this.props.wallet_type) {
          if (nextProps.wallet_type.statusCode === 200) {
              if (nextProps.wallet_type.status === 'success') {
                  this.setState({
                      wallet_type : nextProps.wallet_type.data
                    });
                }
            } else {
                message.error(nextProps.wallet_type.msg);
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
          }
    }

    onChange(page, pageSize){
        const data = {};

        data.user_id = this.state.user_id;
        data.wallet_type = this.state.wallet;
        data.page = page;
        data.limit = 10;

        this.setState({ page: page });

        this.props.postBalanceList(data);
    }

    handleChange = (pagination, filters, sorter) => {
        const data = {};

        data.user_id = this.state.user_id;
        data.wallet_type = this.state.wallet;
        data.page = pagination.current;
        data.limit = pagination.pageSize;
        data.order_field = sorter.column !== undefined ? sorter.field : this.state.order_field;
        data.order_type = sorter.order !== false ? (sorter.order === "ascend" ? "asc" : (sorter.order === "descend" ? "desc" : "asc")) : "asc";

        this.setState({
            loading: true,
            sortedData: sorter,
            page: pagination.current,
            table_loading: true,
        });

        this.props.postBalanceList(data);
    };


    handleUserId(e){
        if (e.target.value === "") {
            e.target.value = "";
        }

        this.setState({
            user_id : e.target.value,
        });
    }

    handleType(e){
        this.setState({
            wallet : e
        });
    }

    handleSearch = () => {
        const data = {};

        data.user_id = this.state.user_id;
        data.wallet_type = this.state.wallet;
        data.page = 1;
        data.limit = 10;
        data.order_field = this.state.order_field;
        data.order_type = this.state.order_type;


        this.setState({
            user_id: this.state.user_id,
            wallet: this.state.wallet,
            loading: true,
            table_loading: true
        });

        this.props.postBalanceList(data);
    }

    handleReset = () => {
        this.setState({
            user_id: "",
            wallet: ""
        });
    };

    render() {
        let wallet_list;

        const {data, total_records, page, wallet_type, user_id, table_loading, sortedData, wallet} = this.state;
        const { Text } = Typography;
        const {Option} = Select;
        const sortedInfo = sortedData || {};

        const wallet_columns = [
            {
                title: t('table_list.wallet_type'),
                dataIndex: 'wallet_type',
                key: 'wallet_type',
            },
            {
                title: t('balance.balance'),
                dataIndex: 'balance',
                key: 'balance',
                align : 'right'
            }
        ];

        const columns = [
            {
                title: t('table_list.no'),
                dataIndex: 'id',
                key: 'id',
                width: '20%',
                render : (text,record,index) => (index + 1) + (page - 1) * 10  ,
            },
            {
                title: t('table_list.user_id'),
                dataIndex: 'user_id',
                key: 'user_id',
                sorter: (a, b) => a.user_id - b.user_id,
                sortOrder: sortedInfo.columnKey === 'user_id' && sortedInfo.order,
                ellipsis: true,
                width: '25%',
            },
            {
                title: t('table_list.wallet_type'),
                dataIndex: 'wallet_type',
                key: 'wallet_type',
                sorter: (a, b) => a.wallet_type - b.wallet_type,
                sortOrder: sortedInfo.columnKey === 'wallet_type' && sortedInfo.order,
                ellipsis: true,
                width: '30%',
            },
            {
                title: t('balance.balance'),
                dataIndex: 'balance',
                key: 'balance',
                sorter: (a, b) => a.balance - b.balance,
                sortOrder: sortedInfo.columnKey === 'balance' && sortedInfo.order,
                ellipsis: true,
                align : 'right',
                width: '25%',
            }
        ];

        wallet_list = wallet_type.map(function (item, i){
            return <Option label={item.b_display_code} value={item.currency_code}>{item.b_display_code}</Option>;
        });

        return (
            <PageContent page_title="Wallet Balance List" add_button_url="" main_menu_id={['sub2']} sub_menu_id={['9']}>
                <FilterFieldContainer>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t('filter.user_id')}:</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Input
                                value={user_id}
                                onChange={this.handleUserId}
                            />
                        </Col>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t('filter.wallet_type')}:</label>
                        </Col>
                        <Col md={{ span: 6}} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Select defaultValue={t("filter.please_select")} style={{width: "100%"}} onChange={this.handleType} required={true} value={wallet}>
                                <Option value="">{t("filter.please_select")}</Option>
                                {wallet_list}
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 6 }} sm={{ span: 16 }} xs={{ span: 24 }}>
                            <Space>
                                <Button type="primary" onClick={this.handleSearch}>{t('filter.search')}</Button>
                                <Button type="default" onClick={this.handleReset}>{t('filter.clear')}</Button>
                            </Space>
                        </Col>
                    </Row>
                </FilterFieldContainer>
                <div className="bg-light p-2 m-5">
                    <Row>
                        <Col span={12}>
                            <Table
                                rowKey="uid"
                                columns={wallet_columns}
                                dataSource={data}
                                pagination={false}
                                dataIndex={true}
                                loading={table_loading}
                            />
                        </Col>
                    </Row>
                    <Table
                        rowKey="uid"
                        columns={columns}
                        dataSource={data}
                        pagination={{defaultCurrent: 1,
                            total:total_records ,
                            showTotal:total => `${t('table_list.total')} ${total} ${t('table.list.items')}`,
                            style:{position: "relative", top:15}}}
                        loading={table_loading}
                        onChange={this.handleChange}
                        scroll={{x : 500}}
                        summary={pageData => {
                            let totalBorrow = 0;
                            return (
                                <>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell colSpan={2}>{t("table_list.total")}</Table.Summary.Cell>
                                        <Table.Summary.Cell colSpan={2}>
                                            <Text type="danger">{totalBorrow}</Text>
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </>
                            );
                        }}
                    />
                </div>

            </PageContent>
        )
    }
}
const mapStateToProps = (state) => {
    const {balanceList, wallet, header_data} = state;

    return {
        balance_list : balanceList.data,
        wallet_type : wallet.data,
        header_data : header_data.data
    }
};

const mapDispatchToProps = {
    postBalanceList,
    getWalletTypeList
};
export default connect (mapStateToProps, mapDispatchToProps) (listWalletBalance);
