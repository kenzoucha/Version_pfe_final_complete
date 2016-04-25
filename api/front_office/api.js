var express = require('express');
var passport = require('passport');

var router = express.Router();

require(appRoot +'/api/front_office/auth/auth')(router,passport);
require('./adress')(router);
require('./panier')(router);
module.exports = router;




