var express = require('express');
var router = express.Router();

/* GET users listing. */ /* APp에서 라우팅 해서 오므로 get()에다가 /user 할 필요 없음  */
router.get('/', function(req, res, next) { 
  res.render('users', { 
    title: 'Users',
    userName: 'Jack'
   });
});

module.exports = router;
