pragma solidity ^0.4.6;

contract SmartCredit {

// storage variables
int    input_box     = 0;
int    output_box    = 0;
address bank = 0xC0503Ab8823BC8DAB9d09B7C9D6E45c29aDFBe63; //should be address coming from the interface
address sme  = 0x0941C9D77C8201cC0073401985C99CebE77329E1; //should be address coming from the interface
int    balance_sme   = 0;
uint    cred_facility = 0;
uint    int_paid = 0;
uint    princ_paid = 0;

// events
// event box_incoming(uint comp_balance, uint cred_facility);


function SmartCredit () payable {
  // constructor
  cred_facility = msg.value;
}

// item entering //send money from bank to sme
function item_arrived() {
  input_box = input_box +1;
  //sending 10 weis money from bank to the sme
  if(!sme.send(10000000000000000)){
revert();
  }
  //updating sme account
  balance_sme = balance_sme + 10000000000000000;
  //decreasing cred facility
  cred_facility = cred_facility -10000000000000000;
}

// item leaving //send money from sme to bank
function item_delivered() payable {
  output_box = output_box +1;
  //sending money from sme to thebank
  cred_facility = cred_facility + msg.value - 1000000000000000;
  princ_paid = princ_paid + msg.value - 1000000000000000;
  if(!bank.send(1000000000000000)){
   revert();
  }
  int_paid = int_paid + 1000000000000000;
  //updating sme account
  //balance_sme = balance_sme - 1000000000000000;
}

// getter functions
function get_input_box() returns (int) {
  return input_box;
}

function get_output_box() returns (int)  {
  return output_box;
}

function get_balance_sme() returns (int) {
  return balance_sme;
}

function get_cred_facility() returns (uint)  {
  return cred_facility;
}

function get_int_paid() returns (uint)  {
  return int_paid;
}

function get_princ_paid() returns (uint)  {
  return princ_paid;
}

}