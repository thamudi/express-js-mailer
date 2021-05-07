'use strict';
const express = require('express');
const router = express.Router();

const sendMail = require('../controllers/mail.controller');

router.post('/send-mail', sendMail);

module.exports = router;