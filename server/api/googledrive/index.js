'use strict';

var express = require('express');
var controller = require('./googledrive.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/listFile/:pagesize', controller.listFile);
router.get('/listFiles', controller.listFiles);
router.get('/createFiles/:file/:name/:typeparam1/:typeparam2', controller.createFiles);

module.exports = router;
