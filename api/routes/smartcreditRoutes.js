'use strict';
module.exports = function(app) {
  var ethtransaction = require('../controllers/ethtransaction');

  // todoList Routes
  app.route('/transaction/:from/:to')
    .get(ethtransaction.do_transaction);

};
