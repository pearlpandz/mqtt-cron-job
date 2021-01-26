// For routing
const express = require('express');
const router = express.Router();
var multer = require('multer');

// middlewares
const middleware = require('./../middleware/jwt');

// Controllers

const mqtt = require('./../controllers/mqtt');
const scheduler = require('./../scheduler/scheduler');


// mqtt
router.get('/mqtt/getDeviceStatus', mqtt.getDeviceStatus);

router.get('/scheduler/start', scheduler.start);
router.get('/scheduler/stop', scheduler.stop);

module.exports = router; 