'use strict';
var express = require('express');

module.exports = function (app) {
  var ethtransaction = require('../controllers/ethtransaction');

  app.route('/transaction/:from/:to')
    .get(ethtransaction.do_transaction);

    app.route('/count')
    .get(ethtransaction.do_count);

    app.route('/arrived')
    .get(ethtransaction.do_arrived);

    app.route('/delivered')
    .get(ethtransaction.do_delivered);

  // static sites
  app.use(express.static('data'));
  app.use(express.static('dist'));
  app.use(express.static('js'));
  app.use(express.static('less'));
  app.use(express.static('pages'));
  app.use(express.static('vendor'));

  app.use('/data', express.static('data'));
  app.use('/dist', express.static('dist'));
  app.use('/js', express.static('js'));
  app.use('/less', express.static('less'));
  app.use('/pages', express.static('pages'));
  app.use('/vendor', express.static('vendor'));
  app.use('/', express.static('pages/index.html'));
  app.use('/', express.static('config.js'));
};
