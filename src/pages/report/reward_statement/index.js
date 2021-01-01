import React, { Component } from "react";
import {
    Table,
    message,
    Row,
    Col,
    Input,
    DatePicker,
    Button,
    Select,
    Divider,
    Space
} from "antd";
import { connect } from "react-redux";
import { t, setLocale } from "react-i18nify";
import { postRewardStatement } from "../../../store/ducks/reward/actions";
import PageContent from "../../../components/Content";
import "./index.scss";
import FilterFieldContainer from "../../../components/FilterFieldContainer";
const { Option } = Select;

const initialState = {
    wallet_from: "Please Select",
    wallet_to: "Please Select",
    user_id: "",
    sponsor_user_id: "",
    date_from: "",
    date_to: "",
};

class rewardStatement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roi_data: [],
            uni_data: [],
            win_data: [],
            summary_data: {roi_bonus : 0, unilevel_bonus : 0, total_bonus : 0, win_bonus : 0},
            total_records: 0,
            page: "1",
            order_field: "created_at",
            order_type: "desc",
            wallet_from: "CASH",
            wallet_to: "",
            sortedData: {},
            loading: false,
            user_id: "",
            date_range: "",
            sponsor_user_id: "",
            date_from: "",
            date_to: "",
            wallet_type: [],
            wallet_to_list: [],
        };
        this.handleUserId = this.handleUserId.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleSponsorUserId = this.handleSponsorUserId.bind(this);
        this.handleSummit = this.handleSummit.bind(this);
        this.handleTypeFrom = this.handleTypeFrom.bind(this);
        this.handleTypeTo = this.handleTypeTo.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }
    UNSAFE_componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.reward_data !== this.props.reward_data) {
            if (nextProps.reward_data.statusCode === 200) {
                if (nextProps.reward_data.status === "success") {
                    console.log(nextProps.reward_data.data);
                    this.setState({
                        roi_data: nextProps.reward_data.data.roi,
                        uni_data: nextProps.reward_data.data.unilevel,
                        win_data: nextProps.reward_data.data.win,
                        summary_data: nextProps.reward_data.data.summary,
                        total_records: nextProps.reward_data.total_records,
                        loading: false,
                    });
                }
            } else {
                message.error(nextProps.reward_data.msg);

                this.setState({
                    loading: false
                });
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }
    }

    handleClear() {
        this.setState({ ...initialState });
    }

    handleSummit(e) {
        const data = {};
        data.page = "1";
        data.limit = "10";
        data.user_id = this.state.user_id;
        data.sponsor= this.state.sponsor_user_id;
        data.date_from = this.state.date_from;
        data.date_to = this.state.date_to;
        data.order_field = this.state.order_field;
        data.order_type = this.state.order_type;

        this.props.postRewardStatement(data);

        this.setState({
            loading: true
        });
    }

    handleTypeFrom(e) {
        this.setState({
            wallet_from: e,
        });
        //
        // const data = {};
        // data.wallet_type = e;
        //
        // this.props.getWalletSetting(data);
    }

    handleTypeTo(e) {
        this.setState({
            wallet_to: e,
        });
    }

    handleUserId(e) {
        this.setState({ user_id: e.target.value });
    }

    handleSponsorUserId(e) {
        this.setState({ sponsor_user_id: e.target.value });
    }

    onDateChange(date, dateString) {
        this.setState({
            date_from: dateString[0],
            date_to: dateString[1],
        });
    }

    handleChange = (pagination, filters, sorter) => {
        const data = {};
        data.page = pagination.current;
        data.limit = "10";
        data.order_field =
            sorter.column !== undefined ? sorter.field : this.state.order_field;
        data.order_type =
            sorter.order !== false
                ? sorter.order === "ascend"
                ? "asc"
                : sorter.order === "descend"
                    ? "desc"
                    : "asc"
                : "asc";

        this.setState({
            loading: true,
            sortedData: sorter,
            page: pagination.current,
        });

        this.props.postRewardStatement(data);
    };

    render() {
        const {
            roi_data,
            summary_data,
            uni_data,
            win_data,
            // total_records,
            page,
            sortedData,
            loading,
            user_id,
            sponsor_user_id,
            wallet_type,
            // wallet_from,
        } = this.state;
        const sortedInfo = sortedData || {};
        const columns = [
            {
                title: t("table_list.no"),
                dataIndex: "index",
                key: "index",
                width: "20%",
                render: (text, record, index) => index + 1 + (page - 1) * 10,
            },
            {
                title: t("table_list.user_id"),
                dataIndex: "user_id",
                key: "user_id",
                sorter: (a, b) => a.user_id - b.user_id,
                sortOrder: sortedInfo.columnKey === "user_id" && sortedInfo.order,
                ellipsis: true,
                width: "20%",
            },
            {
                title: t("member_list.sponsor"),
                dataIndex: "sponsor_user_id",
                key: "sponsor_user_id",
                sorter: (a, b) => a.sponsor_user_id - b.sponsor_user_id,
                sortOrder: sortedInfo.columnKey === "sponsor_user_id" && sortedInfo.order,
                ellipsis: true,
                width: "20%",
            },
            {
                title: t("reward.roi_bonus"),
                dataIndex: "roi_bonus",
                key: "roi_bonus",
                sorter: (a, b) => a.roi_bonus - b.roi_bonus,
                sortOrder: sortedInfo.columnKey === "roi_bonus" && sortedInfo.order,
                ellipsis: true,
                width: "20%",
                align: "right",
            },
            {
                title: t("reward.bns_date"),
                dataIndex: "bns_date",
                key: "bns_date",
                sorter: (a, b) => a.bns_date - b.bns_date,
                sortOrder: sortedInfo.columnKey === "bns_date" && sortedInfo.order,
                ellipsis: true,
                width: "20%",
                align: "right",
            },
        ];

        const columns2 = [
            {
                title: t("table_list.no"),
                dataIndex: "index",
                key: "index",
                width: 50,
                render: (text, record, index) => index + 1 + (page - 1) * 10,
            },
            {
                title: t("table_list.user_id"),
                dataIndex: "user_id",
                key: "user_id",
                sorter: (a, b) => a.user_id - b.user_id,
                sortOrder: sortedInfo.columnKey === "user_id" && sortedInfo.order,
                ellipsis: true,
                width: "5%",
            },
            {
                title: t("member_list.sponsor"),
                dataIndex: "sponsor_user_id",
                key: "sponsor_user_id",
                sorter: (a, b) => a.sponsor_user_id - b.sponsor_user_id,
                sortOrder: sortedInfo.columnKey === "sponsor_user_id" && sortedInfo.order,
                ellipsis: true,
                width: "5%",
            },
            {
                title: t("reward.uni_level_bonus"),
                dataIndex: "unilevel_bonus",
                key: "unilevel_bonus",
                sorter: (a, b) => a.unilevel_bonus - b.unilevel_bonus,
                sortOrder: sortedInfo.columnKey === "unilevel_bonus" && sortedInfo.order,
                ellipsis: true,
                width: "10%",
                align: "right",
            },
            {
                title: t("reward.bns_date"),
                dataIndex: "bns_date",
                key: "bns_date",
                sorter: (a, b) => a.bns_date - b.bns_date,
                sortOrder: sortedInfo.columnKey === "bns_date" && sortedInfo.order,
                ellipsis: true,
                width: "10%",
                align: "right",
            },
        ];

        const columns3 = [
            {
                title: t("table_list.no"),
                dataIndex: "index",
                key: "index",
                width: 50,
                render: (text, record, index) => index + 1 + (page - 1) * 10,
            },
            {
                title: t("table_list.user_id"),
                dataIndex: "user_id",
                key: "user_id",
                sorter: (a, b) => a.user_id - b.user_id,
                sortOrder: sortedInfo.columnKey === "user_id" && sortedInfo.order,
                ellipsis: true,
                width: "5%",
            },
            {
                title: t("member_list.sponsor"),
                dataIndex: "sponsor_user_id",
                key: "sponsor_user_id",
                sorter: (a, b) => a.sponsor_user_id - b.sponsor_user_id,
                sortOrder: sortedInfo.columnKey === "sponsor_user_id" && sortedInfo.order,
                ellipsis: true,
                width: "5%",
            },
            {
                title: t("reward.win_bonus"),
                dataIndex: "win_bonus",
                key: "win_bonus",
                sorter: (a, b) => a.win_bonus - b.win_bonus,
                sortOrder: sortedInfo.columnKey === "win_bonus" && sortedInfo.order,
                ellipsis: true,
                width: "10%",
                align: "right",
            },
            {
                title: t("reward.bns_date"),
                dataIndex: "bns_date",
                key: "bns_date",
                sorter: (a, b) => a.bns_date - b.bns_date,
                sortOrder: sortedInfo.columnKey === "bns_date" && sortedInfo.order,
                ellipsis: true,
                width: "10%",
                align: "right",
            },
        ];

        let wallet_list;

        wallet_list = wallet_type.map(function (item, i) {
            return (
                <Option label={item.b_display_code} value={item.currency_code}>
                    {item.b_display_code}
                </Option>
            );
        });

        console.log(wallet_list)

        return (
            <PageContent
                page_title={t("report_transfer.transfer_list")}
                add_button_url=""
                main_menu_id={[8]}
                sub_menu_id={[28]}
            >
                <FilterFieldContainer>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("filter.user_id")}</label>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <Input value={user_id} onChange={this.handleUserId} />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 3 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <label>{t("filter.sponsor_user_id")}</label>
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
                            <label>{t("filter.date")}</label>
                        </Col>
                        <Col md={6} xs={24} sm={{ span: 24 }}>
                            <DatePicker.RangePicker
                                onChange={this.onDateChange}
                                className="w-10"
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 6 }} sm={{ span: 16 }} xs={{ span: 24 }}>
                            <Space>
                                <Button type="primary" onClick={this.handleSummit} loading={loading}>
                                    {t("filter.search")}
                                </Button>
                                <Button type="default" onClick={this.handleClear}>
                                    {t("filter.clear")}
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </FilterFieldContainer>
                <div className="bg-light m-5 p-2">
                    <Row>
                        <Col span={24} className="p-1">
                            <h2 className="H2">{t("reward.summary")}</h2>
                        </Col>
                    </Row>
                    <div className="reward-statement m-5">
                        <Row>
                            <Col md={{ span: 8}} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <label>{t("reward.roi_bonus")}</label>
                            </Col>
                            <Col md={{ span: 8}} sm={{ span: 24 }} xs={{ span: 24 }}>
                                {summary_data.roi_bonus}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 8}} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <label>{t("reward.uni_level_bonus")}</label>
                            </Col>
                            <Col md={{ span: 8}} sm={{ span: 24 }} xs={{ span: 24 }}>
                                {summary_data.unilevel_bonus}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 8}} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <label>{t("reward.win_bonus")}</label>
                            </Col>
                            <Col md={{ span: 8}} sm={{ span: 24 }} xs={{ span: 24 }}>
                                {summary_data.win_bonus}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 8}} sm={{ span: 24 }} xs={{ span: 24 }}>
                                <label>{t("reward.total_bonus")}</label>
                            </Col>
                            <Col md={{ span: 8}} sm={{ span: 24 }} xs={{ span: 24 }}>
                                {summary_data.total_bonus}
                            </Col>
                        </Row>
                    </div>
                    <Divider/>
                    <div className="reward-statement mt-4">
                        <Row>
                            <Col span={24} className="p-1">
                                <h2 className="H2">{t("reward.roi")}</h2>
                            </Col>
                        </Row>
                        <Table
                            rowKey="uid"
                            columns={columns}
                            dataSource={roi_data}
                            dataIndex={true}
                            scroll={{ x: 700 }}
                            onChange={this.handleChange}
                            loading={loading}
                            pagination={false}
                        />
                    </div>
                    <div className="reward-statement mt-4">
                        <Row>
                            <Col span={24} className="p-1">
                                <h2 className="H2">{t("reward.unilevel")}</h2>
                            </Col>
                        </Row>
                        <Table
                            rowKey="uid"
                            columns={columns2}
                            dataSource={uni_data}
                            dataIndex={true}
                            scroll={{ x: 700 }}
                            onChange={this.handleChange}
                            loading={loading}
                            pagination={false}
                        />
                    </div>
                    <div className="reward-statement mt-4">
                        <Row>
                            <Col span={24} className="p-1">
                                <h2 className="H2">{t("reward.win")}</h2>
                            </Col>
                        </Row>
                        <Table
                            rowKey="uid"
                            columns={columns3}
                            dataSource={win_data}
                            dataIndex={true}
                            scroll={{ x: 700 }}
                            onChange={this.handleChange}
                            loading={loading}
                            pagination={false}
                        />
                    </div>

                </div>
            </PageContent>
        );
    }
}
const mapStateToProps = (state) => {
    const { reward, header_data } = state;
    return {
        reward_data : reward.statement_data,
        header_data: header_data.data,
    };
};
const mapDispatchToProps = {
    postRewardStatement,
};
export default connect(mapStateToProps, mapDispatchToProps)(rewardStatement);
