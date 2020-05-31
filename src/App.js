import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Layout, Input, Typography, Row, Col } from 'antd';

import AddressInformation from './components/index';

import { networks } from './map';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

const StyledTitle = styled(Title)`
  color: white !important;
`

const App = ({ web3 }) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [address, setAddress] = useState(null);

    const [balance, setBalance] = useState(0);
    const [network, setNetwork] = useState(null);
    const [blockNumber, setBlockNumber] = useState(null);

    const onError = (err) => {
        setAddress(null);

        setError(err);
        setIsLoading(false);
    }

    const onSuccess = (input, result) => {
        setAddress(input);
        setBalance(web3.toDecimal(result, 'ether'));

        setError(null);
        setIsLoading(false);
    }

    useEffect(() => {
        web3.version.getNetwork((err, id) => {
            if (err) {
                setError(err);
            } else {
                setNetwork(networks[id]);
            }
        });

        web3.eth.getBlockNumber((err, res) => {
            if (err) {
                setError(err);
            } else {
                setBlockNumber(web3.toDecimal(res));
            }
        })
    }, [web3]);

    return (
        <Layout>
            <Header>
                <StyledTitle>Address {address} information</StyledTitle>
            </Header>
            <Content>
                <Row justify="center" align="middle">
                    <Col offset={1} span={6}>
                        <Search
                            loading={isLoading}
                            placeholder="Address"
                            enterButton
                            onSearch={(value) => {
                                if (web3.isAddress(value)) {
                                    try {
                                        setIsLoading(true);
                                        web3.eth.getBalance(value, (err, res) => {
                                            if (err) {
                                                onError(err);
                                            } else {
                                                onSuccess(value, res);
                                            }
                                        });
                                    } catch (err) {
                                        onError(err);
                                    }
                                } else {
                                    onError(new Error('Invalid address'));
                                }
                            }}
                        />
                    </Col>
                    <Col offset={1} span={4}>
                        {error ?
                            <Text strong type="danger">{error.message}</Text> :
                            <AddressInformation
                                balance={balance}
                                network={network}
                                block={blockNumber}
                            />}
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default App;
