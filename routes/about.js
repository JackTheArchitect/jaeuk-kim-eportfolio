var express = require('express');
var router = express.Router();

/* GET About Me. */
router.get('/', function(req, res, next) {
  res.render('about', 
  { title: 'About Me',
  userName: req.user ? req.user.username : '' }); 
  
});

module.exports = router;
