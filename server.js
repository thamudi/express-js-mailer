'use strict';

/* 
------------------ 
Server Dependencies
------------------ 
*/
const express = require('express');
require('dotenv').config({ path: './config/.env' });
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

/* 
------------------ 
Server Setup
------------------ 
*/
const app = express();
const PORT = process.env.PORT;
// Load Routes
const mailRouter = require('./routes/mail.route');

/* 
------------------ 
Express Middleware
------------------ 
*/
// Enable cors for the client
app.use(cors());
// Use bodyParser 
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// load static files
app.use(express.static(path.join(__dirname, 'public')));
// Use Routes
app.use('/mail', mailRouter);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

// App Start
app.listen(PORT, () => {
  console.log('======================================');
  console.info(`Server started on port: ${PORT}`);
});
