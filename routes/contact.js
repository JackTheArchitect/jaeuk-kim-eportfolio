var express = require('express');
var router = express.Router();


/* GET Contact page. */
router.get('/', function(req, res, next) {
  res.render('contact', 
  { title: 'Contact Me',
  userName: req.user ? req.user.username : '' }); // Added for Assignment 2
});

module.exports = router;
