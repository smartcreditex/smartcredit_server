'use strict';
module.exports = function (app) {
  var ethtransaction = require('../controllers/ethtransaction');

  app.route('/transaction/:from/:to')
    .get(ethtransaction.do_transaction);

  app.route('/count')
    .get(ethtransaction.do_count);
};
