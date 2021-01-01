import React, { Component } from "react";
import { connect } from "react-redux";
import { t, setLocale } from "react-i18nify";
import {
    Form,
    Button,
    message,
    Steps,
    Select,
    Row,
    Col,
    Card,
    Spin,
    InputNumber,
    Slider,
} from "antd";
import { postTranslationUpdate } from "../../../store/ducks/translation/actions";
import {
    postGameSetting,
    postMachCode,
    postMachUpdate,
} from "../../../store/ducks/gameSetting/actions";
import PageContent from "../../../components/Content";

import "./index.scss";

// import item1 from "../../../public/images/item1.png";
// import item2 from "../../../public/images/item2.png";
// import item3 from "../../../public/images/item3.png";
// import item4 from "../../../public/images/item4.png";
// import item5 from "../../../public/images/item5.png";
// import item6 from "../../../public/images/item6.png";
// import item7 from "../../../public/images/item7.png";
// import item8 from "../../../public/images/item8.png";
// import item9 from "../../../public/images/item9.png";
// import item10 from "../../../public/images/item10.png";

class machEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mach_code:
                this.props.location.state === undefined
                    ? ""
                    : this.props.location.state.data.mach_code,
            win_rate:
                this.props.location.state === undefined
                    ? ""
                    : this.props.location.state.data.win_rate,
            win_big_rate:
                this.props.location.state === undefined
                    ? ""
                    : this.props.location.state.data.win_big_rate,
            cur_pay_line:
                this.props.location.state === undefined
                    ? ""
                    : this.props.location.state.data.cur_pay_line,
            cur_bet:
                this.props.location.state === undefined
                    ? ""
                    : this.props.location.state.data.cur_bet,
            free_symbol:
                this.props.location.state === undefined
                    ? ""
                    : this.props.location.state.data.free_symbol,
            free_line:
                this.props.location.state === undefined
                    ? ""
                    : this.props.location.state.data.free_line,
            free_token:
                this.props.location.state === undefined
                    ? ""
                    : this.props.location.state.data.free_token,
            free_hit:
                this.props.location.state === undefined
                    ? ""
                    : this.props.location.state.data.free_hit,
            description:
                this.props.location.state === undefined
                    ? ""
                    : this.props.location.state.data.mach_desc,
            total_pay_line: 0,
            current: 2,
            data: [],
            loading: false,
            spin: true,
            cur_active_line: 0,
            slot_bet_size: [],
            active_bet: [],
            status: "",
        };
        const data = {};
        data.mach_code = this.state.mach_code;

        this.props.postMachCode(data);

        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.handleWinRate = this.handleWinRate.bind(this);
        this.handleWinBigRate = this.handleWinBigRate.bind(this);
        this.handleCurPay = this.handleCurPay.bind(this);
        this.handleCurBet = this.handleCurBet.bind(this);
        this.handleFreeSymbol = this.handleFreeSymbol.bind(this);
        this.handleFreeLine = this.handleFreeLine.bind(this);
        this.handleFreeToken = this.handleFreeToken.bind(this);
        this.handleFreeHit = this.handleFreeHit.bind(this);
        this.handlePayLine = this.handlePayLine.bind(this);
        this.handleActiveBet = this.handleActiveBet.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
    }

    handleStatus(e) {
        this.setState({ status: e });
    }

    handleActiveBet(e) {
        this.setState({ active_bet: e });
    }

    handleWinRate(e) {
        this.setState({ win_rate: e });
    }

    handleWinBigRate(e) {
        this.setState({ win_big_rate: e });
    }

    handleCurPay(e) {
        this.setState({ cur_pay_line: e });
    }

    handleCurBet(e) {
        this.setState({ cur_bet: e });
    }

    handleFreeSymbol(e) {
        this.setState({ free_symbol: e });
    }

    handleFreeLine(e) {
        this.setState({ free_line: e });
    }

    handleFreeToken(e) {
        this.setState({ free_token: e });
    }

    handleFreeHit(e) {
        this.setState({ free_hit: e });
    }

    handlePayLine(e) {
        this.setState({ cur_active_line: e });
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    UNSAFE_componentWillMount() {
        setLocale(sessionStorage.getItem("lang"));
    }

    componentDidMount() {
        if (sessionStorage.getItem("tokenExpired") === "true") {
            sessionStorage.setItem("tokenExpired", "false");
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.mach_data !== this.props.mach_data) {
            if (nextProps.mach_data.statusCode === 200) {
                if (nextProps.mach_data.status === "success") {
                    let active_bet = [];
                    for (
                        var i = 0;
                        i < nextProps.mach_data.data.slot_bet_size.length;
                        i++
                    ) {
                        if (nextProps.mach_data.data.slot_bet_size[i].status === "A") {
                            active_bet.push(
                                nextProps.mach_data.data.slot_bet_size[i].bet_token
                            );
                        }
                    }

                    this.setState(
                        {
                            data: nextProps.mach_data.data.slot_pay_token,
                            total_records: nextProps.mach_data.total_records,
                            total_pay_line: nextProps.mach_data.data.total_pay_line,
                            cur_active_line:
                            nextProps.mach_data.data.mach_setting.cur_active_line,
                            slot_bet_size: nextProps.mach_data.data.slot_bet_size,
                            status: nextProps.mach_data.data.mach_setting.status,
                            active_bet: active_bet,
                            loading: false,
                            current: 0,
                            spin: false,
                        },
                        () => {}
                    );
                }
            } else {
                message.error(nextProps.game_setting_data.msg);
            }
        }

        if (nextProps.update_data !== this.props.update_data) {
            if (nextProps.update_data.statusCode === 200) {
                if (nextProps.update_data.status === "success") {
                    message.success(nextProps.update_data.status);
                    this.setState({
                        loading: false,
                    });

                    setTimeout(function () {
                        window.location.href = "/setting/mach-list";
                    }, 1000);
                }
            } else {
                message.error(nextProps.update_data.msg);
                this.setState({
                    loading: false,
                });
            }
        }

        if (nextProps.header_data !== this.props.header_data) {
            this.setState({});
        }
    }

    render() {
        const {
            current,
            mach_code,
            win_rate,
            win_big_rate,
            cur_pay_line,
            cur_bet,
            free_symbol,
            free_line,
            free_token,
            free_hit,
            data,
            total_pay_line,
            loading,
            spin,
            cur_active_line,
            slot_bet_size,
            description,
            active_bet,
            status,
        } = this.state;

        const { Step } = Steps;
        const { Option } = Select;
        // const items = [
        //     item1,
        //     item2,
        //     item3,
        //     item4,
        //     item5,
        //     item6,
        //     item7,
        //     item8,
        //     item9,
        //     item10,
        // ];
        const steps = [
            {
                title: t("mach.first"),
                content: "First-content",
            },
            {
                title: t("mach.second"),
                content: "Second-content",
            },
        ];

        const marks = {
            0: "0",
            100: "100",
        };

        const marks2 = {
            1: "1",
            10: "10",
        };

        const marks4 = {
            3: "3",
            5: "5",
        };

        const layout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 10 },
        };

        const onChange = (current) => {
            this.setState({ current });
        };

        const onFinish = (values) => {
            const machine = this.state.data;
            const data = {};

            data.mach_code = mach_code;
            data.win_rate = parseInt(win_rate);
            data.win_big_rate = parseInt(win_big_rate);
            data.cur_pay_line = parseInt(cur_pay_line);
            data.cur_bet = parseInt(cur_bet);
            data.free_symbol = parseInt(free_symbol);
            data.free_line = parseInt(free_line);
            data.free_token = parseInt(free_token);
            data.free_hit = parseInt(free_hit);
            data.total_pay_line = parseInt(cur_active_line);
            data.pay_token = [];
            data.active_bet = active_bet;
            data.status = status;

            for (var i = 0; i < 10; i++) {
                const pay_token = {};
                pay_token.symbol_code = i;
                pay_token.pay_token = {};
                for (var j = 2; j <= 5; j++) {
                    if (values[`${i}[${j}]`] !== undefined) {
                        pay_token.pay_token[j] = parseInt(values[`${i}[${j}]`]);
                    } else {
                        for (var k = 0; k < 4; k++) {
                            if (machine[i].combinations[k].combination_count === j)
                                pay_token.pay_token[j] = machine[i].combinations[k].pay_token;
                        }
                    }
                }
                data.pay_token.push(pay_token);
            }
            this.props.postMachUpdate(data);

            this.setState({
                loading: true,
            });
        };

        let game_list = [];
        let slot_list = [];
        let symbol_list = [];
        let active_list = [];

        if (data !== null && data !== undefined) {
            symbol_list = data.map((item, i) => {
                return (
                    <Option
                        // width={'100%'}
                        label={<img width="29px" height="auto" src={`${process.env.PUBLIC_URL}/symbols/${this.state.mach_code}/item${item.symbol_code + 1}.png`} alt="s" />}
                        // label={<img alt="example" src={items[i]} width="30" height="30" />}
                        // title={`Symbol Code -${item.symbol_code}`}
                        value={item.symbol_code}
                    >
                        {<img width="50" height="50" src={`${process.env.PUBLIC_URL}/symbols/${this.state.mach_code}/item${item.symbol_code + 1}.png`} alt="sym" />}
                        {/* {<img alt="example" src={items[i]} width="50" height="50" />} */}
                    </Option>
                );
            });

            game_list = data.map((item, i) => {
                // console.log(item)
                if (i === 5) {
                    return (
                        <React.Fragment>
                            <Col
                                md={{ offset: 2 }}
                                xs={{ offset: 0 }}
                                sm={{ offset: 0 }}
                            ></Col>
                            <Col
                                md={{ offset: 2 }}
                                xs={{ offset: 0 }}
                                sm={{ offset: 0 }}
                            ></Col>
                            <Col md={{ span: 4 }} xs={{ span: 24 }} sm={{ span: 24 }}>
                                <Card
                                    style={{ width: "100%" }}
                                    // cover={<img alt="example" src={items[i]} />}
                                    cover={<img className="sym" width="50" height="50" src={`${process.env.PUBLIC_URL}/symbols/${this.state.mach_code}/item${item.symbol_code + 1}.png`} alt="dice" />}
                                >
                                    {item.combinations.map(function (data, i) {
                                        return (
                                            <Form.Item
                                                name={`${item.symbol_code}[${data.combination_count}]`}
                                                label={data.combination_count}
                                                initialValue={parseInt(data.pay_token)}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: t("validate.field_required"),
                                                    },

                                                    {
                                                        type: "number",
                                                        min: 0,
                                                        message: t("validate.min") + " 0",
                                                    },
                                                ]}
                                            >
                                                <InputNumber style={{ width: "100%" }} />
                                            </Form.Item>
                                        );
                                    })}
                                </Card>
                            </Col>
                        </React.Fragment>
                    );
                } else {
                    return (
                        <React.Fragment>
                            <Col md={{ span: 4 }} xs={{ span: 24 }} sm={{ span: 24 }}>
                                <Card
                                    style={{ width: "100%" }}
                                    cover={<img width="50" height="50" src={`${process.env.PUBLIC_URL}/symbols/${this.state.mach_code}/item${item.symbol_code + 1}.png`} alt="sym" />}
                                    // cover={<img alt="example" src={items[i]} />}
                                >
                                    {item.combinations.map(function (data, i) {
                                        return (
                                            <Form.Item
                                                name={`${item.symbol_code}[${data.combination_count}]`}
                                                label={data.combination_count}
                                                initialValue={parseInt(data.pay_token)}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: t("validate.field_required"),
                                                    },

                                                    {
                                                        type: "number",
                                                        min: 0,
                                                        message: t("validate.min") + " 0",
                                                    },
                                                ]}
                                            >
                                                <InputNumber style={{ width: "100%" }} />
                                            </Form.Item>
                                        );
                                    })}
                                </Card>
                            </Col>
                        </React.Fragment>
                    );
                }
            });
        }

        slot_list = slot_bet_size.map(function (item, i) {
            return (
                <Option label={item.bet_token} value={item.bet_token}>
                    {item.bet_token}
                </Option>
            );
        });

        if (slot_bet_size !== null && slot_bet_size !== undefined) {
            for (var i = 0; i < slot_bet_size.length; i++) {
                if (slot_bet_size[i].status === "A") {
                    active_list.push(slot_bet_size[i].bet_token);
                }
            }
        }

        return (
            <PageContent page_title={description + "(" + mach_code + ")"}>
                <div className="bg-light p-4 m-5">
                    <Row>
                        <Col
                            md={{ offset: 2, span: 20 }}
                            xs={{ span: 24 }}
                            sm={{ span: 24 }}
                        >
                            <Steps current={current} onChange={onChange}>
                                {steps.map((item) => (
                                    <Step key={item.title} title={item.title} />
                                ))}
                            </Steps>
                        </Col>
                    </Row>
                    <Form
                        {...layout}
                        name="normal_login"
                        id="admin-login"
                        className="machine-form mt-6"
                        onFinish={onFinish}
                        onSubmit={this.handleAdminLogin}
                        initialValues={{
                            win_rate: win_rate,
                            win_big_rate: win_big_rate,
                            cur_pay_line: cur_pay_line,
                            cur_bet: cur_bet,
                            free_symbol: free_symbol,
                            free_line: free_line,
                            free_token: free_token,
                            free_hit: free_hit,
                        }}
                        action="/admin"
                    >
                        <Row>
                            <Col md={{ span: 12 }} xs={{ span: 24 }} sm={{ span: 24 }}>
                                {current === 0 && !spin && (
                                    <div>
                                        <Form.Item
                                            name="win_rate"
                                            label={t("mach.win_rate")}
                                            labelAlign="left"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t("validate.field_required"),
                                                },

                                                {
                                                    type: "number",
                                                    max: 100,
                                                    message: t("validate.max") + " 100",
                                                },

                                                {
                                                    type: "number",
                                                    min: 1,
                                                    message: t("validate.min") + " 1",
                                                },
                                            ]}
                                        >
                                            <Row>
                                                <Col span={16}>
                                                    <div>
                                                        <Slider
                                                            min={1}
                                                            max={100}
                                                            marks={marks}
                                                            onChange={this.handleWinRate}
                                                            value={
                                                                typeof win_rate === "number" ? win_rate : 0
                                                            }
                                                        />
                                                    </div>
                                                </Col>
                                                <Col offset={3} span={4}>
                                                    <div className="rate">{win_rate}</div>
                                                </Col>
                                            </Row>
                                        </Form.Item>

                                        <Form.Item
                                            name="win_big_rate"
                                            label={t("mach.win_big_rate")}
                                            labelAlign="left"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t("validate.field_required"),
                                                },

                                                {
                                                    type: "number",
                                                    max: 100,
                                                    message: t("validate.max") + " 100",
                                                },

                                                {
                                                    type: "number",
                                                    min: 1,
                                                    message: t("validate.min") + " 1",
                                                },
                                            ]}
                                        >
                                            <Row>
                                                <Col span={16}>
                                                    <div>
                                                        <Slider
                                                            min={1}
                                                            max={100}
                                                            marks={marks}
                                                            onChange={this.handleWinBigRate}
                                                            value={
                                                                typeof win_big_rate === "number"
                                                                    ? win_big_rate
                                                                    : 0
                                                            }
                                                        />
                                                    </div>
                                                </Col>
                                                <Col offset={3} span={4}>
                                                    <div className="rate">{win_big_rate}</div>
                                                </Col>
                                            </Row>
                                        </Form.Item>

                                        <Form.Item
                                            name="cur_pay_line"
                                            label={t("mach.cur_pay_line")}
                                            labelAlign="left"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t("validate.field_required"),
                                                },

                                                {
                                                    type: "number",
                                                    max: 10,
                                                    message: t("validate.max") + " 10",
                                                },

                                                {
                                                    type: "number",
                                                    min: 1,
                                                    message: t("validate.min") + " 1",
                                                },
                                            ]}
                                        >
                                            <Row>
                                                <Col span={16}>
                                                    <div>
                                                        <Slider
                                                            min={1}
                                                            max={10}
                                                            marks={marks2}
                                                            onChange={this.handleCurPay}
                                                            value={
                                                                typeof cur_pay_line === "number"
                                                                    ? cur_pay_line
                                                                    : 0
                                                            }
                                                        />
                                                    </div>
                                                </Col>
                                                <Col offset={3} span={4}>
                                                    <div className="rate">{cur_pay_line}</div>
                                                </Col>
                                            </Row>
                                            {/* <InputNumber placeholder={cur_pay_line} onChange={this.handleCurPay}/> */}
                                        </Form.Item>

                                        <Form.Item
                                            name="cur_bet"
                                            label={t("mach.cur_bet")}
                                            labelAlign="left"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please enter free token",
                                                },
                                            ]}
                                        >
                                            <Select
                                                defaultValue={cur_bet}
                                                style={{ width: "30%" }}
                                                onChange={this.handleCurBet}
                                                required={true}
                                            >
                                                {slot_list}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name="total_pay_line"
                                            label={t("mach.total_pay_line")}
                                            labelAlign="left"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t("validate.field_required"),
                                                },
                                            ]}
                                        >
                                            <InputNumber
                                                defaultValue={cur_active_line}
                                                onChange={this.handlePayLine}
                                                className="w-2"
                                                type="number"
                                            />
                                            <label> {"/" + total_pay_line}</label>
                                        </Form.Item>

                                        <Form.Item
                                            labelAlign="left"
                                            name="status"
                                            label={t("mach.status")}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please select Status!",
                                                },
                                            ]}
                                        >
                                            <Select
                                                defaultValue={status}
                                                style={{ width: "50%" }}
                                                onChange={this.handleStatus}
                                                required={true}
                                            >
                                                <Option value="I">{t("filter.inactive") }</Option>
                                                <Option value="A">{t("filter.active") }</Option>
                                                <Option value="L">{t("filter.locked") }</Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                )}
                            </Col>
                            <Col md={{ span: 12 }} xs={{ span: 24 }} sm={{ span: 24 }}>
                                {current === 0 && !spin && (
                                    <div>
                                        <Form.Item
                                            name="free_symbol"
                                            labelAlign="left"
                                            label={t("mach.free_symbol")}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t("validate.field_required"),
                                                },

                                                {
                                                    type: "number",
                                                    max: 9,
                                                    message: t("validate.max") + " 9",
                                                },

                                                {
                                                    type: "number",
                                                    min: 0,
                                                    message: t("validate.min") + " 0",
                                                },
                                            ]}
                                        >
                                            <Select
                                                width={'100%'}
                                                defaultValue={free_symbol}
                                                required={true}
                                                listHeight={350}
                                                dropdownMatchSelectWidth={56}
                                                style={{ width: "30%" }}
                                                optionLabelProp="label"
                                                onChange={this.handleFreeSymbol}
                                            >
                                                {symbol_list}
                                            </Select>
                                            {/* <InputNumber placeholder={free_symbol} onChange={this.handleFreeSymbol}/> */}
                                        </Form.Item>

                                        <Form.Item
                                            name="free_line"
                                            labelAlign="left"
                                            label={t("mach.free_line")}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t("validate.field_required"),
                                                },

                                                {
                                                    type: "number",
                                                    max: 10,
                                                    message: t("validate.max") + " 10",
                                                },

                                                {
                                                    type: "number",
                                                    min: 1,
                                                    message: t("validate.min") + " 1",
                                                },
                                            ]}
                                        >
                                            <Row>
                                                <Col span={16}>
                                                    <div>
                                                        <Slider
                                                            min={1}
                                                            max={10}
                                                            marks={marks2}
                                                            onChange={this.handleFreeLine}
                                                            value={
                                                                typeof free_line === "number" ? free_line : 0
                                                            }
                                                        />
                                                    </div>
                                                </Col>
                                                <Col offset={3} span={4}>
                                                    <div className="rate">{free_line}</div>
                                                </Col>
                                            </Row>
                                            {/* <InputNumber placeholder={free_line} onChange={this.handleFreeLine}/> */}
                                        </Form.Item>
                                        <Form.Item
                                            labelAlign="left"
                                            name="free_hit"
                                            label={t("mach.free_hit")}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t("validate.field_required"),
                                                },

                                                {
                                                    type: "number",
                                                    max: 5,
                                                    message: t("validate.max") + " 5",
                                                },

                                                {
                                                    type: "number",
                                                    min: 3,
                                                    message: t("validate.min") + " 3",
                                                },
                                            ]}
                                        >
                                            <Row>
                                                <Col span={16}>
                                                    <div>
                                                        <Slider
                                                            min={3}
                                                            max={5}
                                                            marks={marks4}
                                                            onChange={this.handleFreeHit}
                                                            value={
                                                                typeof free_hit === "number" ? free_hit : 0
                                                            }
                                                        />
                                                    </div>
                                                </Col>
                                                <Col offset={3} span={4}>
                                                    <div className="rate">{free_hit}</div>
                                                </Col>
                                            </Row>
                                            {/* <InputNumber placeholder={free_hit} onChange={this.handleFreeHit}/> */}
                                        </Form.Item>

                                        <Form.Item
                                            labelAlign="left"
                                            name="free_token"
                                            label={t("mach.free_token")}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please enter free token",
                                                },
                                            ]}
                                        >
                                            <Select
                                                defaultValue={free_token}
                                                style={{ width: "30%" }}
                                                onChange={this.handleFreeToken}
                                                required={true}
                                            >
                                                {slot_list}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            labelAlign="left"
                                            name="active_bet"
                                            label={t("mach.active_bet")}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please select active bet!",
                                                },
                                            ]}
                                        >
                                            <Select
                                                mode="multiple"
                                                defaultValue={active_list}
                                                style={{ width: "50%" }}
                                                onChange={this.handleActiveBet}
                                                required={true}
                                            >
                                                {slot_list}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                )}
                            </Col>
                        </Row>

                        {current === 1 && data != null && !spin && (
                            <div className="card-list mt-6">
                                <Row>
                                    <Col
                                        md={{ offset: 2 }}
                                        xs={{ offset: 0 }}
                                        sm={{ offset: 0 }}
                                    ></Col>
                                    {game_list}
                                </Row>
                            </div>
                        )}

                        {current === 1 && data == null && (
                            <p className="no-data text-center">{t("global.no_data")}</p>
                        )}
                        {spin && (
                            <div className="spin text-center">
                                <Spin />
                            </div>
                        )}
                        {!spin && (
                            <div className="steps-action text-center mt-3">
                                {current < steps.length - 1 && (
                                    <Button type="primary" onClick={() => this.next()}>
                                        {t("global.next")}
                                    </Button>
                                )}
                                {current > 0 && (
                                    <Button
                                        style={{ margin: "0 8px" }}
                                        onClick={() => this.prev()}
                                    >
                                        {t("global.previous")}
                                    </Button>
                                )}
                                {current === steps.length - 1 && (
                                    <Button type="primary" htmlType="submit" loading={loading}>
                                        {t("global.submit")}
                                    </Button>
                                )}
                            </div>
                        )}
                    </Form>
                </div>
            </PageContent>
        );
    }
}

const mapStateToProps = (state) => {
    const { translation, gameSetting, header_data } = state;

    return {
        translation_update_data: translation.update_data,
        game_setting_data: gameSetting.data,
        mach_data: gameSetting.mach_data,
        update_data: gameSetting.update_data,
        header_data: header_data.data,
    };
};

const mapDispatchToProps = {
    postTranslationUpdate,
    postGameSetting,
    postMachCode,
    postMachUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)(machEdit);
