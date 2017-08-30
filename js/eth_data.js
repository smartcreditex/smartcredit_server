
//var config = require('/js/config.js');
var Web3 = require('web3');
var ethhost = config.ethhost;

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


function update_sm_data() {

    var account = config.account;
    var password = config.password;
    var creditId = config.creditId;

    web3.personal.unlockAccount(account, password);

    var myContract = web3.eth.contract(abi);
    var myContractInstance = myContract.at(creditId);

    var i_box = myContractInstance.get_input_box.call({ from: account, gas: 478000 });
    var o_box = myContractInstance.get_output_box.call({ from: account, gas: 478000 });

    var b_sme = myContractInstance.get_balance_sme.call({ from: account, gas: 478000 });
    var b_crd = myContractInstance.get_cred_facility.call({ from: account, gas: 478000 });

    update_field("i_box", i_box);
    update_field("o_box", o_box);
    update_field("b_sme", b_sme);
    update_field("b_crd", b_crd);
}

function update_field(field, val_item) {
    document.getElementById(field).innerHTML = val_item;
}