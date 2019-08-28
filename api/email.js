const express = require('express')
const mailjet = require('node-mailjet').connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

const app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({limit: "5mb", extended: true, parameterLimit:5000}));

// app.use(express.json())

app.get('/', function (req, res) {
  res.status(405).json({ error: 'sorry!' })
})

app.post('/', function (req, res) {
  
  const request = mailjet.post("send", {'version': 'v3.1'}).request({
    "Messages": [
      {
        "From": {
          "Email": "noreply@ordinarygoddesses.com.au",
            "Name": "Ordinary Goddesses"
        },
        "To": [
          {
            "Email": `${req.body.to}`,
            "Name": "Goddess"
          }
        ],
        "Subject": `${req.body.subject}`,
        "TextPart": "This is a message from Ordinary Goddesses",
        "HTMLPart": `Dear Goddess<br><br>${req.body.email}`
      }
    ]
  })
  
  request.then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })


  res.status(200).json({ 'message': 'OH YEAH' })
})

module.exports = {
  path: '/api/email',
  handler: app
}
