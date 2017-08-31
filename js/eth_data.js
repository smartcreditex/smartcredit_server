
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

var myContractInstance;
var i_box;
var o_box;
var b_sme;
var b_crd;

var account = config.account;
var password = config.password;
var creditId = config.creditId;

function update_sm_data() {

    web3.personal.unlockAccount(account, password);

    var myContract = web3.eth.contract(abi);
    myContractInstance = myContract.at(creditId);

    i_box = myContractInstance.get_input_box.call({ from: account, gas: 478000 });
    o_box = myContractInstance.get_output_box.call({ from: account, gas: 478000 });

    b_sme = myContractInstance.get_balance_sme.call({ from: account, gas: 478000 });
    b_crd = myContractInstance.get_cred_facility.call({ from: account, gas: 478000 });

    update_field("i_box", i_box);
    update_field("o_box", o_box);
    update_field("b_sme", web3.fromWei(b_sme, 'ether'));
    update_field("b_crd", web3.fromWei(b_crd, 'ether'));

    //update fields
    //Timer 10 sec
    setTimeout(update_sm_data_btn, 10000);
    ;
}

function update_sm_data_btn() {

    reset_fields();
    window.location.reload(false);
}

function update_field(field, val_item) {
    if (val_item != "loading" && (field == 'b_sme' || field == 'b_crd')) {
        val_item = round(val_item, 3);
        val_item = val_item + " ETH";
    }
    document.getElementById(field).innerHTML = val_item;
}

function reset_fields() {
    var val_item = "loading";
    update_field("i_box", val_item);
    update_field("o_box", val_item);
    update_field("b_sme", val_item);
    update_field("b_crd", val_item);
}

function round(value, exp) {
    if (typeof exp === 'undefined' || +exp === 0)
        return Math.round(value);

    value = +value;
    exp = +exp;

    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
        return NaN;

    // Shift
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}
