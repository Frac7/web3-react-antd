import React from 'react';

import { Typography, Space } from 'antd';

const { Text } = Typography;

const AddressInformation = ({ balance, network, block }) => (
    <Space direction="vertical" size="small">
        <Text strong>{`Balance: ${balance} ETH`}</Text>
        <Text strong>{`Network: ${network}`}</Text>
        <Text strong>{`Block number: ${block}`}</Text>
    </Space>
)

export default AddressInformation;
