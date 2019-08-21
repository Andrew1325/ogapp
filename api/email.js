const express = require('express')
const nodemailer = require('nodemailer')

const app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({limit: "5mb", extended: true, parameterLimit:5000}));

// app.use(express.json())

app.get('/', function (req, res) {
  res.status(405).json({ error: 'sorry!' })
})

app.post('/', function (req, res) {
  sendMail(req.body)
  res.status(200).json({ 'message': 'OH YEAH' })
})

module.exports = {
  path: '/api/email',
  handler: app
}

const sendMail = (mailData) => {
  let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
  })
  transporter.sendMail({
    from: 'admin@ordinarygoddesses.com.au',
    to: 'notyourthyme@gmail.com',
    bcc: mailData.to,
    subject: mailData.subject,
    text: mailData.body,
    attachments:[{
      filename: mailData.fileName,
      path: __dirname+'/../static/'+mailData.fileName
  }]
  })
}