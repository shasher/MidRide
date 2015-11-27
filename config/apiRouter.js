var express = require('express');
var router = express.Router();

router.route('/events')
  .get(function (req, res) {
    res.status(200).send('ok')
});

module.exports = router;