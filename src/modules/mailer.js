const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const { host, por, user, pass } = require('../config/mail.json');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: {user, pass}
  });

  transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: Path2D.resolve('./src/resources/mail'),
    extName: '.html',
  }));

  module.exports = transport;