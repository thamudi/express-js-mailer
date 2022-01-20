'use strict';
/* 
------------------ 
Controller Dependencies
------------------ 
*/
const transporter = require('../config/mail.config');
require('dotenv').config({ path: './config/.env' });
const EMAIL = process.env.EMAIL;

function sendMail(request, response) {
  const participant = request.body;
  const mailOptions = {
    from: participant.email,
    to: EMAIL,
    subject: `${participant.subject} - From ${participant.firstName} ${participant.lastName}`,
    template: 'index',
    context: { participant: participant, received: new Date() },
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      response.json({ status: false });
    } else {
      console.log('Email sent: ' + info.response);
      sendResponse(participant);
      response.json({ status: true });
    }
  });
}

function sendResponse(params) {
  const mailOptions = {
    from: EMAIL,
    to: params.email,
    subject: `Thank you ${params.firstName} for contacting me`,
    template: 'response',
    context: { participant: params },
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      response.json({ status: false });
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


module.exports = sendMail;