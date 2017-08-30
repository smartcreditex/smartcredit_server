'use strict';

var config = require('../../config.js');

exports.createConfig = function (req, res) {
  //res.json({ text: "delivered" });
  res.status(200).send('var config = ' + JSON.stringify(config));
};