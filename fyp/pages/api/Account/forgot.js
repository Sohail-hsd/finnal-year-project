import connectDB from "../../../middleware/Connection"
import User from '../../../model/User'
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');


// Step 1 # : Client will send email in req.body.
// Step 2 # : If the email is varified, Then find the user in User collection.
// Step 3 # : If user exists, Then send the password reset link to the user, through email. (SMTP)
// Step 4 # : Else return error.

const SendEmail = (email, subject, text) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com',
            pass: 'yourpassword'
        }
    });

    mailOptions = {
        from: 'youremail@gmail.com',
        to: email,
        subject: subject,
        html: '<h1>Welcome</h1><p>That was easy!</p>'
      }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export default async function handler(req, res) {
    const { email } = req.body
    try {
        const user = await User.findOne({ email: email })
        if (user) {
            // Pending -----
        }
        return res.status(200).json({ status: true, message: `Password reset email is sent to your email : ${email}` })
    } catch (error) {
        return res.status(200).json({ status: false, error })
    }
}


