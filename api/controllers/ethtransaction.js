'use strict';

exports.do_transaction = function(req, res) {
    var from = req.params.from;
    var to = req.params.to;
    console.log(from, to);
    res.json({ from: from, to: to });
  };