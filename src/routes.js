const express = require('express');

const controller = require('./controller');

const router = express.Router();

router.get('/topActiveUsers', controller.getTopActiveUsers);

router.get('/users', controller.getUserInfo);

module.exports = router;
