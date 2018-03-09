var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'blacksmithpostroan@gmail.com',
    pass: 'blacksmithpost'
  }
});

var mailOptions = {
  from: 'blacksmithpostroanl@gmail.com',
  to: 'kevin36615@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

var send = function() {transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})
};

module.exports.transporter = transporter;


