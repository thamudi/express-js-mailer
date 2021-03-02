"use strict";

// Load Environment Variables from the .env file
require("dotenv").config();

// Application Dependencies
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

// Application Setup
const PORT = process.env.PORT;
const EMAIL = process.env.EMAIL;
const EMAIL_PASS = process.env.EMAIL_PASS;
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: EMAIL_PASS,
  },
});

// Route Definitions
app.post("/send-mail", sendMail);

function sendMail(request, response) {
  console.log(request.body);
  const participant = request.body;
  const mailOptions = {
    from: participant.email,
    to: EMAIL,
    subject: `${participant.subject} - From ${participant.firstName} ${participant.lastName}`,
    text: participant.message,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      response.json({ status: false });
    } else {
      console.log("Email sent: " + info.response);
      response.json({ status: true });
    }
  });
}

// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
