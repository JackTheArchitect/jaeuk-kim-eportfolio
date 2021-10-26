var express = require('express');
var router = express.Router();

/* GET Services page. */
router.get('/', function(req, res, next) {
  res.render('services', { title: 'Services',
  userName: req.user ? req.user.username : '' }); // Added for Assignment 2  
});


module.exports = router;
