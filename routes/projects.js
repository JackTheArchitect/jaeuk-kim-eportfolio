var express = require('express');
var router = express.Router();

/* GET Projects page. */
router.get('/', function(req, res, next) {
  res.render('projects', { title: 'Projects',
  userName: req.user ? req.user.username : '' }); // Added for Assignment 2
});


module.exports = router;
