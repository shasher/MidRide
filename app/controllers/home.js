var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Events = mongoose.model('Events');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.render('index')
});


