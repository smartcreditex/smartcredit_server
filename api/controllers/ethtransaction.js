'use strict';

var config = require('../../config.js');
var Web3 = require('web3');
var ethhost = process.env.ETHHOST || config.ethhost;

const web3 = new Web3(new Web3.providers.HttpProvider(ethhost));

var abi = [{
  "constant": false, "inputs": [], "name": "get_balance_sme", "outputs": [{ "name": "", "type": "uint256" }],
  "payable": false, "type": "function"
},
{
  "constant": false, "inputs": [], "name": "item_arrived", "outputs": [],
  "payable": false, "type": "function"
}, {
  "constant": false, "inputs": [],
  "name": "get_cred_facility", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function"
}, {
  "constant": false, "inputs": [],
  "name": "get_output_box", "outputs": [{ "name": "", "type": "uint256" }],
  "payable": false, "type": "function"
}, {
  "constant": false, "inputs": [],
  "name": "get_input_box", "outputs": [{ "name": "", "type": "uint256" }],
  "payable": false, "type": "function"
}, {
  "constant": false, "inputs": [],
  "name": "item_delivered", "outputs": [], "payable": true, "type": "function"
},
{ "inputs": [], "payable": true, "type": "constructor" }];

var transaction = function () {
  var account = process.env.ACCOUNT || config.account;
  var password = process.env.PASSWORD || config.password;
  var creditId = process.env.CREDITID || config.creditId;

  web3.personal.unlockAccount(account, password);

  var MyContract = web3.eth.contract(abi);
  var myContractInstance = MyContract.at(creditId);
  myContractInstance.item_arrived({ from: account, gas: 478000 });
}

var transaction_from_to = function (from, to) {
  transaction();

  /*
  web3.eth.sendTransaction({
    from: '0x5dE3e444DeE834FB80cA1Aa8169C14A8c9D0Dc69',
    to: '0x1bD45306548786E326f1F006496618120D4a0607',
    value: web3.toWei(1, "ether")
  });
  */
  console.log(from, to);
};

exports.do_transaction = function (req, res) {
  var from = req.params.from;
  var to = req.params.to;

  transaction_from_to(from, to);
  res.json({ from: from, to: to });
};

exports.do_count = function (req, res) {
  transaction();
  res.json({ text: "counted" });
};

exports.do_arrived = function (req, res) {
  var account = process.env.ACCOUNT || config.account;
  var password = process.env.PASSWORD || config.password;
  var creditId = process.env.CREDITID || config.creditId;

  web3.personal.unlockAccount(account, password);

  var MyContract = web3.eth.contract(abi);
  var myContractInstance = MyContract.at(creditId);
  myContractInstance.item_arrived({ from: account, gas: 478000 });
  res.json({ text: "arrived" });
};

exports.do_delivered = function (req, res) {
  var account = process.env.ACCOUNT || config.account;
  var password = process.env.PASSWORD || config.password;
  var creditId = process.env.CREDITID || config.creditId;

  web3.personal.unlockAccount(account, password);

  var MyContract = web3.eth.contract(abi);
  var myContractInstance = MyContract.at(creditId);
  myContractInstance.item_delivered({ from: account, value: web3.toWei(0.011, 'ether'), gas: 478000 });
  res.json({ text: "delivered" });
};