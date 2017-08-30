'use strict';
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
};
