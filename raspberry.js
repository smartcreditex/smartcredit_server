'use strict'

var config = require('./config.js')
var Web3 = require('web3')
var Gpio = require('onoff').Gpio

var ethhost = process.env.ETHHOST || config.ethhost

const web3 = new Web3(new Web3.providers.HttpProvider(ethhost))

var abi = [{ 'constant': false, 'inputs': [], 'name': 'get_balance_sme', 'outputs': [{ 'name': '', 'type': 'int256' }], 'payable': false, 'type': 'function' },
  { 'constant': false, 'inputs': [], 'name': 'item_arrived', 'outputs': [], 'payable': false, 'type': 'function' },
  {
    'constant': false, 'inputs': [], 'name': 'get_cred_facility', 'outputs': [{ 'name': '', 'type': 'uint256' }],
    'payable': false, 'type': 'function'
  }, {
    'constant': false, 'inputs': [], 'name': 'get_output_box', 'outputs': [{ 'name': '', 'type': 'int256' }],
    'payable': false, 'type': 'function'
  }, {
    'constant': false, 'inputs': [], 'name': 'get_princ_paid', 'outputs': [{ 'name': '', 'type': 'uint256' }],
    'payable': false, 'type': 'function'
  }, {
    'constant': false, 'inputs': [], 'name': 'get_int_paid', 'outputs': [{ 'name': '', 'type': 'uint256' }],
    'payable': false, 'type': 'function'
  }, {
    'constant': false, 'inputs': [], 'name': 'get_input_box', 'outputs': [{ 'name': '', 'type': 'int256' }],
    'payable': false, 'type': 'function'
  }, { 'constant': false, 'inputs': [], 'name': 'item_delivered', 'outputs': [], 'payable': true, 'type': 'function' },
  { 'inputs': [], 'payable': true, 'type': 'constructor' }]

var account = process.env.ACCOUNT || config.account
var password = process.env.PASSWORD || config.password
var creditId = process.env.CREDITID || config.creditId

web3.personal.unlockAccount(account, password)

var MyContract = web3.eth.contract(abi)
var myContractInstance = MyContract.at(creditId)

var inBox = 0
var outBox = 0

var ledIn = new Gpio(3, 'out')
var ledOut = new Gpio(2, 'out')

var getInBox = function () {
  var i_box = myContractInstance.get_input_box.call({ from: account, gas: 478000 })
  return i_box
}

var getOutBox = function () {
  var o_box = myContractInstance.get_output_box.call({ from: account, gas: 478000 })
  return o_box
}

var iv
var iv_in
var iv_out

var blinkIn = function () {
  iv_in = setInterval(function () {
    ledIn.writeSync(ledIn.readSync() === 0 ? 1 : 0)
  }, 500)
  setTimeout(function () {
    clearInterval(iv_in)
    ledIn.writeSync(0)
  }, 5000)
}

var blinkOut = function () {
  iv_out = setInterval(function () {
    ledOut.writeSync(ledOut.readSync() === 0 ? 1 : 0)
  }, 500)
  setTimeout(function () {
    clearInterval(iv_out)
    ledOut.writeSync(0)
  }, 5000)
}

iv = setInterval(function () {
  var bIn = getInBox()
  if (bIn !== inBox) {
    inBox = bIn
    blinkIn()
  }

  var bOut = getOutBox()
  if (bOut !== outBox) {
    outBox = bOut
    blinkOut()
  }
}, 10000)
