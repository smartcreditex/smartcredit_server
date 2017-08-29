pragma solidity ^0.4.6;

contract SmartCredit {

 // storage variables
 uint    input_box     = 0;
 uint    output_box    = 0;
 address bank = 0x751d5695dF8642f77b95619C36c139af366bd194; //should be address coming from the interface
 address sme  = 0x46F7Ab0D4a0854f5D6cCc1F7D3E9f9D11bd25646; //should be address coming from the interface
 uint    balance_sme   = 0;
 uint    cred_facility = 0;

 // events
 event box_incoming(uint comp_balance, uint cred_facility);


 function SmartCredit () payable {
   // constructor
   cred_facility = msg.value;
 }

 // item entering //send money from bank to sme
 function item_arrived() {
   input_box = input_box +1;
   //sending 10 weis money from bank to the sme
   if(!sme.send(10)){
revert();
   }
   //updating sme account
   balance_sme = balance_sme + 10;
   //decreasing cred facility
   cred_facility = cred_facility -10;
 }

 // item leaving //send money from sme to bank
 function item_delivered()  {
   output_box = output_box -1;
   //sending money from sme to thebank
   if(!bank.send(11)){
    revert();
   }
   //updating sme account
   balance_sme = balance_sme - 11;
 }

 // getter functions
 function get_input_box() returns (uint) {
   return input_box;
 }

 function get_output_box() returns (uint)  {
   return output_box;
 }

 function get_balance_sme() returns (uint) {
   return balance_sme;
 }

 function get_cred_facility() returns (uint)  {
   return cred_facility;
 }

}