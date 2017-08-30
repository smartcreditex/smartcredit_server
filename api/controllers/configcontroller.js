'use strict';

var config = require('../../config.js');

exports.createConfig = function (req, res) {
  //res.json({ text: "delivered" });
  var newconfig = {
    account: process.env.ACCOUNT || config.account,
    password: process.env.PASSWORD || config.password,
    creditId: process.env.CREDITID || config.creditId,
    ethhost: process.env.ETHHOST || config.ethhost,

  }
  res.status(200).send('var config = ' + JSON.stringify(newconfig));
};