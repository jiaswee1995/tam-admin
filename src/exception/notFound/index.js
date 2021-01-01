import React, { Component } from 'react';

import { Layout, Result, Button } from 'antd';

import './index.scss';

class NotFound extends Component{
    state = {
        targetLocation: "/login"
    }

    UNSAFE_componentWillMount = () => {
        this.setState({
            targetLocation: (sessionStorage.getItem("accessToken")) ? "/home" : "/login"
        })
    }

    render() {
        return (
            <Layout>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={
                        <Button type="primary" onClick={() => this.props.history.goBack()}>
                            Back
                        </Button>
                    }
                />
            </Layout>
        )
    }
}

export default NotFound;
