import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, message } from "antd";
import Headers from "../../components/Header";

import "./index.scss";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: "dark",
            current: "1",
        };
    }

    componentDidMount() {
        if (sessionStorage.getItem("tokenExpired") === "true") {
            sessionStorage.setItem("tokenExpired", "false");
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.admin_data !== this.props.admin_data) {
            if (nextProps.admin_data.data.statusCode === 200) {
                if (nextProps.admin_data.data.status === "success") {
                    window.location.href = "/admin";
                }
            } else {
                message.error("Error");
            }
        }
    }
    render() {
        const { Content } = Layout;

        return (
            <Layout>
                {/*<SideBar />*/}
                <Layout>
                    <Headers />
                    <Content />
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    const { adminLogin } = state;

    return {
        admin_data: adminLogin.data,
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
