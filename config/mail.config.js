// Load Environment Variables from the .env file
require('dotenv').config({ path: './config/.env' });
const nodemailer = require('nodemailer');

const EMAIL = process.env.EMAIL;
const EMAIL_PASS = process.env.EMAIL_PASS;
const path = require('path');
const hbs = require('nodemailer-express-handlebars');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: EMAIL_PASS,
    },
});

transporter.use(
    'compile',
    hbs({
        viewEngine: {
            extName: '.hbs',
            partialsDir: path.resolve(__dirname, '../views/mail/'),
            defaultLayout: false,
        },

        viewPath: path.resolve(__dirname, '../views/mail/'),

        extName: '.hbs',
    })
);


module.exports = transporter;