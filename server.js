const nodemailer = require('nodemailer')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mail = require('./email.js')
app.use(express.static('./public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email.getGmail(),
    pass: email.getGmailPass()
  }
})


function sendEmail(mail) {
  var mailOptions = {
    from: email.getGmail(),
    to: mail.to,
    subject: mail.subject,
    html: mail.body
  }

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err)
    }
    else {
      console.log('Email sent: ' + info.response)
    }
  })
}


app.post('/send_email_form', (req, res) => {
  mail = {
    to: req.body.to_address,
    subject: req.body.subject,
    body: req.body.email_body
  }
    sendEmail(mail)
    res.redirect('/')

})



app.listen(80, () => {
  console.log('Server is running @ port 80')
})