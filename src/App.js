import React, { useState } from 'react';
import styled from 'styled-components';

import { Layout, Input, Typography, Row, Col, Space } from 'antd';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

const StyledTitle = styled(Title)`
  color: white !important;
`

const App = ({ web3 }) => {
    const [address, setAddress] = useState(null);
    const [balance, setBalance] = useState(0);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Layout>
            <Header>
                <StyledTitle>Address {address} information</StyledTitle>
            </Header>
            <Content>
                <Row justify="center" align="middle">
                    <Col offset={1} span={4}>
                        <Space direction="vertical">
                            <Text>Write an address to know its balance</Text>
                            {error ? <Text strong type="danger">{error.message}</Text> : <Text strong>{`Balance: ${balance} ETH`}</Text>}
                        </Space>
                    </Col>
                    <Col offset={1} span={6}>
                        <Search
                            loading={isLoading}
                            placeholder="Address"
                            enterButton
                            onSearch={(value) => {
                                try {
                                    setIsLoading(true);
                                    web3.eth.getBalance(value, (err,res) => {
                                        setBalance(web3.utils.fromWei(res, 'ether'));
                                        setAddress(value);
                                        setIsLoading(false);
                                    });
                                    setError(null); //reset previous error
                                } catch (e) {
                                    setError(e);
                                    setAddress(null); //reset previous address
                                    setIsLoading(false);
                                }
                            }}
                        />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default App;
