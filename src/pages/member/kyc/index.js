import React, { Component } from 'react';
import {Table, Button, Input, Form, Divider, Row, Col, Select, message, Space, Modal,Image} from 'antd';
import {connect} from "react-redux";
import { t, setLocale } from "react-i18nify";

import {getDepositApprovalList} from "../../../store/ducks/deposit/actions";
import {postWithdrawalApproval} from "../../../store/ducks/withdrawalApproval/actions";
import { getWalletTypeList} from "../../../store/ducks/wallet/actions";
import FilterFieldContainer from "../../../components/FilterFieldContainer";
import PageContent from "../../../components/Content";
import {FormOutlined, LockFilled, PictureOutlined} from "@ant-design/icons";

class Kyc extends Component{
    constructor(props){
        super(props);
        this.state = {
            theme: 'dark',
            current: '1',
            data: [],
            total_records: 0,
            user_id: "",
            phone: "",
            wallet_type: "",
            wallet_type_list : [],
            page: "1",
            pageSize: "10",
            collapsed: false,
            searchText: '',
            searchedColumn: '',
            order_field: "created_at",
            order_type: "desc",
            sortedData: {},
            loading: true,
            selectedRowKeys: [],
            tran_hash: [],
            selectedRow: [],
            data_key: [],
            temp_data: [],
            button_type: "",
            button_loading : false,
            modalImage : false,
            source: {}
        };

        const data = {};

        data['user_id'] = "";
        data['wallet_type'] = "";
        data['page'] = "1";
        data['limit'] = "10";
        data.order_field = this.state.order_field;
        data.order_type = this.state.order_type;

        this.props.getDepositApprovalList(data);
        // this.props.getWalletTypeList();

        this.handleChange = this.handleChange.bind(this);
        this.handleImageClick = this.handleImageClick.bind(this);
        this.handleImageClose = this.handleImageClose.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.keyChange = this.keyChange.bind(this);
        this.onApprove = this.onApprove.bind(this);
        this.onProcess = this.onProcess.bind(this);
        this.onReject = this.onReject.bind(this);
        this.handleUserId = this.handleUserId.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleSummit = this.handleSummit.bind(this);
    }

    UNSAFE_componentWillMount = () => {
        setLocale(sessionStorage.getItem("lang"));
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.deposit_list_data !== this.props.deposit_list_data) {
            if (nextProps.deposit_list_data.rst === '1'){
                let data = nextProps.deposit_list_data.data;
                this.setState({
                    data: data.currentPageItems,
                    total_records: data.total_records,
                    loading: false
                });
            }
            else{
                message.error(nextProps.deposit_list_data.msg);
            }
        }

        if (nextProps.withdrawal_approval_data !== this.props.withdrawal_approval_data) {
            if (nextProps.withdrawal_approval_data.statusCode === 200){
                if (nextProps.withdrawal_approval_data.status === 'success') {
                    message.success('withdraw request sent');
                    let page = this.state.page;
                    const data = {};

                    this.setState({
                        button_loading: false,
                        page: page,
                        loading: true
                    });

                    data.user_id = this.state.user_id;
                    data.wallet_type = this.state.wallet_type;
                    data.page = this.state.page;
                    data.limit = this.state.pageSize;
                    data.order_field = this.state.order_field;
                    data.order_type = this.state.order_type;

                    this.props.getDepositApprovalList(data);
                }
            }
            else{
                message.error(nextProps.withdrawal_approval_data.msg);
                this.setState({
                    button_loading: false
                });
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
          }
        
          if (nextProps.wallet_type !== this.props.wallet_type) {
            if (nextProps.wallet_type.statusCode === 200) {
                if (nextProps.wallet_type.status === 'success') {
                    this.setState({
                        wallet_type_list : nextProps.wallet_type.data
                      });
                  }
              } else {
                  message.error(nextProps.wallet_type.msg);
              }
          }
    }

    handleImageClick(data){
        this.setState({
            source: data,
            modalImage: true
        })
    }

    handleImageClose(){
        this.setState({
            modalImage: false
        })
    }

    handleChange = (pagination, filters, sorter) => {
        const data = {};

        data.user_id = this.state.user_id;
        data.wallet_type = this.state.wallet_type;
        data.page = pagination.current.toString();
        data.limit = pagination.pageSize.toString();
        data.order_field = sorter.column !== undefined ? sorter.field : this.state.order_field;
        data.order_type = sorter.order !== false ? (sorter.order === "ascend" ? "asc" : (sorter.order === "descend" ? "desc" : "asc")) : "asc";

        this.setState({
            loading : true,
            sortedData : sorter,
            page : pagination.current,
            order_field : data.order_field,
            order_type : data.order_type
        });

        this.props.getDepositApprovalList(data);
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
            wallet_type : e
        });
    }

    handleSummit(){
        const data = {};

        data.user_id = this.state.user_id;
        data.wallet_type = this.state.wallet_type;
        data.page = "1";
        data.limit = "10";
        data.order_field = this.state.order_field;
        data.order_type = this.state.order_type;

        this.setState({
            user_id: this.state.user_id,
            wallet_type: this.state.wallet_type,
            loading: true,
        });
        this.props.getDepositApprovalList(data);
    }

    keyChange(e){
        let data_key = e.target.getAttribute('data-key');

        this.setState({
            tran_hash : e.target.value,
            data_key: data_key
        });
    }

    onSelectChange = (selectedRowKeys,selectedRows) => {
        this.setState({ selectedRowKeys,
            selectedRow: selectedRows});
    };

    onApprove(){
        this.setState({ button_type: "APD"});
    }

    onReject(){
        this.setState({ button_type: "R"});
    }

    onProcess(){
        this.setState({ button_type: "PR"});
    }

    render() {
        const { TextArea } = Input;
        const { Option } = Select;

        const {source, data, total_records, page, sortedData, loading, selectedRowKeys, tran_hash, data_key, temp_data, selectedRow, button_loading, wallet_type_list} = this.state;
        const sortedInfo = sortedData || {};
        if(data !== null){
            for (var i = 0; i < data.length; i++) {
                data[i].key = data[i].doc_no;
                if(temp_data[data[i].doc_no] === undefined){
                    temp_data[data[i].doc_no] = data[i].tran_hash;
                }
            }
            temp_data[data_key] = tran_hash;
        }

        const columns = [
            {
                title: t('table_list.no'),
                dataIndex: 'id',
                key: 'id',
                width: '5%',
                render : (text,record,index) => (index + 1) + (page - 1) * 10
            },

            {
                title: t('table_list.user_id'),
                dataIndex: 'username',
                key: 'username',
                sorter: (a, b) => a.username - b.username,
                sortOrder: sortedInfo.columnKey === 'username' && sortedInfo.order,
                ellipsis: true,
            },

            {
                title: t('table_list.doc_no'),
                dataIndex: 'doc_no',
                key: 'doc_no',
                sorter: (a, b) => a.doc_no - b.doc_no,
                sortOrder: sortedInfo.columnKey === 'doc_no' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: t('table_list.trans_date'),
                dataIndex: 'trans_date',
                key: 'trans_date',
                sorter: (a, b) => a.trans_date - b.trans_date,
                sortOrder: sortedInfo.columnKey === 'trans_date' && sortedInfo.order,
                ellipsis: true,
            },

            {
                title: t('table_list.amount'),
                dataIndex: 'amount',
                key: 'amount',
                sorter: (a, b) => a.amount - b.amount,
                sortOrder: sortedInfo.columnKey === 'amount' && sortedInfo.order,
                ellipsis: true,
                align : 'right'
            },

            {
                title: t('table_list.currency_code'),
                dataIndex: 'currency_code',
                key: 'currency_code',
                sorter: (a, b) => a.currency_code - b.currency_code,
                sortOrder: sortedInfo.columnKey === 'currency_code' && sortedInfo.order,
                ellipsis: true,
                align : 'right'
            },
            {
                title: t('table_list.converted_amount'),
                dataIndex: 'converted_total_amount',
                key: 'converted_total_amount',
                sorter: (a, b) => a.converted_total_amount - b.converted_total_amount,
                sortOrder: sortedInfo.columnKey === 'converted_total_amount' && sortedInfo.order,
                ellipsis: true,
                align : 'right'
            },
            {
                title: t('table_list.converted_currency_code'),
                dataIndex: 'converted_currency_code',
                key: 'converted_currency_code',
                sorter: (a, b) => a.converted_currency_code - b.converted_currency_code,
                sortOrder: sortedInfo.columnKey === 'converted_currency_code' && sortedInfo.order,
                ellipsis: true,
                align : 'right'
            },
            {
                title: t("admin_list.action"),
                key: "action",
                render: (text, record) => (
                    <Row gutter={[8,8]}>
                        <Col>
                            <Space
                                size="middle"
                                onClick={(a) => {
                                    this.handleImageClick(record);
                                }}
                            >
                                <a>
                                    <PictureOutlined />
                                </a>
                            </Space>
                        </Col>
                    </Row>
                ),
                // width: "10%",
            }

        ];

        const endLayout = {
            wrapperCol: {
                offset: 0,
                span: 16,
            },
        };

        const onSubmit = values => {
            if(selectedRow.length > 0){
                const data = {};
                data.doc_no = [];
                for (var i = 0 ; i < selectedRow.length ; i++){
                    const multiDoc = {};
                    multiDoc.doc_no = selectedRow[i].doc_no;
                    multiDoc.tran_hash  = temp_data[selectedRow[i].doc_no];
                    data.doc_no.push(multiDoc);
                }
                data.status = this.state.button_type;
                data.remark = values.remark;
                data.updated_by = "wenxin@smartblock.pro"

                this.setState({ button_loading: true });
                this.props.postWithdrawalApproval(data);
            } else {
                message.error(t("withdraw_approval.required"))
            }
        };

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: record.status === 'Approve' || record.status === 'Reject', // Column configuration not to be checked
            })
        };

        let wallet_list;

        wallet_list = wallet_type_list.map(function (item, i){
            return <Option label={item.b_display_code} value={item.currency_code}>{item.b_display_code}</Option>;
        });

        return (
            <PageContent page_title="Approval List" add_button_url="" main_menu_id={['sub2']} sub_menu_id={['8']}>
                <FilterFieldContainer>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t('filter.user_id')}:</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Input
                                value={this.state.user_id}
                                onChange={this.handleUserId}
                            />
                        </Col>
                        <Col md={{ span: 3}} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t('filter.wallet_type')}:</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Select defaultValue={t("filter.please_select")} style={{width: "100%"}} className="wallet_type" onChange={this.handleType}>
                            <Option value="">{t("filter.please_select")}</Option>
                                {wallet_list}
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 6 }} sm={{ span: 16 }} xs={{ span: 24 }}>
                            <Button type="primary" onClick={this.handleSummit} >{t("filter.search")}</Button>
                        </Col>
                    </Row>
                </FilterFieldContainer>
                <div className="bg-light p-2 m-5">
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={data}
                        pagination={{defaultCurrent: 1,
                            total:total_records ,
                            showTotal:total => `${t('table_list.total')} ${total} ${t('table.list.items')}`,
                            style:{position: "relative", top:15}}}
                        dataIndex={true}
                        scroll={{ x: 1300 }}
                        onChange={this.handleChange}
                        loading={loading}
                    />

                    <Form onFinish={onSubmit}>
                        <h3 class="Remark">{t('global.remark')}</h3>
                        <Divider />
                        <Form.Item name="remark">
                            <TextArea rows={8}></TextArea>
                        </Form.Item>
                        <Form.Item  {...endLayout} className="buttonGroup" name="button">
                            <Space>
                                <Button type="primary" value="process" htmlType="submit" className="process-button" onClick={this.onProcess} loading={button_loading}>
                                    {t('withdraw_approval.process')}
                                </Button>
                                <Button type="primary" value="approve" htmlType="submit" className="approve-button" onClick={this.onApprove} loading={button_loading}>
                                    {t('withdraw_approval.approve')}
                                </Button>
                                <Button type="danger" value="reject" htmlType="submit" className="reject-button" onClick={this.onReject} loading={button_loading}>
                                    {t('withdraw_approval.reject')}
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>

                    <Modal
                        title={source.username + " (" + source.doc_no + ")"}
                        centered
                        visible={this.state.modalImage}
                        onCancel={() => this.handleImageClose(false)}
                        footer={<></>}
                    >
                        <Image
                            width={200}
                            src={source.additional_msg}
                        />
                    </Modal>
                </div>
            </PageContent>
        )
    }
}
const mapStateToProps = (state) => {
    const {deposit, withdrawalApproval, header_data, wallet} = state;

    return {
        deposit_list_data : deposit.deposit_data.data,
        withdrawal_approval_data : withdrawalApproval.data,
        header_data : header_data.data,
        wallet_type : wallet.data,
    }
};

const mapDispatchToProps = {
    getDepositApprovalList,
    postWithdrawalApproval,
    getWalletTypeList
};
export default connect (mapStateToProps, mapDispatchToProps) (Kyc);
