var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
  { title: 'Home', 
  userName: req.user ? req.user.username : '' }); // Added for Assignment 2
});

module.exports = router;
