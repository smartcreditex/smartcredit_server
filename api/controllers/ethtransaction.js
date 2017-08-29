'use strict';

var config = require('../../config.js');
var Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(config.ethhost));

var transaction = function (from, to) {
  web3.personal.unlockAccount(config.account, config.password);
  web3.eth.sendTransaction({
    from: '0x5dE3e444DeE834FB80cA1Aa8169C14A8c9D0Dc69',
    to: '0x1bD45306548786E326f1F006496618120D4a0607',
    value: web3.toWei(1, "ether")
  });
  console.log(from, to);
};

exports.do_transaction = function (req, res) {
  var from = req.params.from;
  var to = req.params.to;
  
  transaction(from, to);
  res.json({ from: from, to: to });
};