var settings = require('../settings');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Alamo Square Victorian', 
                        email: settings.email,
                        apiToken: settings.apiToken });
});

module.exports = router;
