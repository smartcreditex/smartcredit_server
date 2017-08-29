'use strict';

var config = require('../../config.js');
var Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(config.ethhost));

var abi = [{ "constant": false, "inputs": [], "name": "item_arrived", "outputs": [], "payable": false, "type": "function" },
{ "constant": false, "inputs": [], "name": "item_delivered", "outputs": [], "payable": false, "type": "function" },
{
  "inputs": [{
    "name": "cred", "type": "uint256", "index": 0,
    "typeShort": "uint", "bits": "256", "displayName": "cred", "template": "elements_input_uint", "value": "2"
  }],
  "payable": true, "type": "constructor"
}];

var transaction = function (from, to) {
  //web3.personal.unlockAccount(config.account, config.password);

  var MyContract = web3.eth.contract(abi);

  // initiate contract for an address
  var myContractInstance = MyContract.at('0x99a43C07dDE441D7156757c8398d3B7753014D2a');

  myContractInstance.item_arrived({ gas: 478000 });

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