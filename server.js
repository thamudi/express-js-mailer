"use strict";

// Load Environment Variables from the .env file
require("dotenv").config();

// Application Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");

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

transporter.use(
  "compile",
  hbs({
    // viewEngine: "express-handlebars",
    // viewPath: "./views/",
    viewEngine: {
      extName: ".hbs",
      partialsDir: path.resolve(__dirname, "./views/"),
      defaultLayout: false,
      // partialsDir: [
      //   //  path to your partials
      //   path.join(__dirname, "./views/partials"),
      // ],
    },

    viewPath: path.resolve(__dirname, "./views/"),

    extName: ".hbs",
  })
);

// Route Definitions
app.post("/send-mail", sendMail);

function sendMail(request, response) {
  const participant = request.body;
  const mailOptions = {
    from: participant.email,
    to: EMAIL,
    subject: `${participant.subject} - From ${participant.firstName} ${participant.lastName}`,
    template: "index",
    context: { participant: participant, received: new Date() },
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      response.json({ status: false });
    } else {
      console.log("Email sent: " + info.response);
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
    template: "response",
    context: { participant: params },
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      response.json({ status: false });
    } else {
      console.log("Email sent: " + info.response);
      // response.json({ status: true });
    }
  });
}

// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
