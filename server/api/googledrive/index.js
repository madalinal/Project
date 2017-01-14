'use strict';

var express = require('express');
var controller = require('./googledrive.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/listFiles', controller.listFiles);
router.get('/createFiles', controller.createFiles);

module.exports = router;
