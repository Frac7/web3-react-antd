import React from 'react';
import ReactDOM from 'react-dom';

import Web3 from 'web3';

import App from './App';

import 'antd/dist/antd.css';

const start = () => {
    ReactDOM.render(<App web3={window.web3} />, document.getElementById('root'));
}

window.addEventListener('load', function () {
    if (typeof window.web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        //window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.log('No web3? You should consider trying MetaMask!')
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    window.ethereum.enable(start());
});


