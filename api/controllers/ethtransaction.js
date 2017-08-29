'use strict';

var config = require('../../config.js');
var Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(config.ethhost));

var abi = [{
  "constant": false, "inputs": [], "name": "get_balance_sme", "outputs": [{ "name": "", "type": "uint256" }],
  "payable": false, "type": "function"
}, {
  "constant": false, "inputs": [], "name": "item_arrived", "outputs": [],
  "payable": false, "type": "function"
}, {
  "constant": false, "inputs": [], "name": "get_cred_facility", "outputs": [{ "name": "", "type": "uint256" }],
  "payable": false, "type": "function"
}, {
  "constant": false, "inputs": [], "name": "get_output_box", "outputs": [{ "name": "", "type": "uint256" }],
  "payable": false, "type": "function"
}, {
  "constant": false, "inputs": [], "name": "get_input_box", "outputs": [{ "name": "", "type": "uint256" }],
  "payable": false, "type": "function"
}, {
  "constant": false, "inputs": [], "name": "item_delivered", "outputs": [],
  "payable": false, "type": "function"
}, { "inputs": [], "payable": true, "type": "constructor" },
{
  "anonymous": false, "inputs": [{ "indexed": false, "name": "comp_balance", "type": "uint256" },
  { "indexed": false, "name": "cred_facility", "type": "uint256" }],
  "name": "box_incoming", "type": "event"
}];

var transaction = function (from, to) {
  web3.personal.unlockAccount(config.account, config.password);

  var MyContract = web3.eth.contract(abi);

  // initiate contract for an address
  var myContractInstance = MyContract.at(config.creditId);

  myContractInstance.item_arrived({ from: config.account, gas: 478000 });

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

  transaction(from, to);
  res.json({ from: from, to: to });
};