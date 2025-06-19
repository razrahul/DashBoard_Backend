require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require("./propertyResolver");

// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

const sendOtpPhone = async (phoneNumber, otp) => {
  try {
    if (!phoneNumber ) {
      throw new Error(ERROR_MESSAGE.REQ_MOB_MESS);
    }

    const message = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: twilioPhoneNumber,
      to: `+91${phoneNumber}`,
    });

    return message.body;
  } catch (error) {
    throw new Error(error.message);
  }
};


const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendOtpEmail = async (email, otp) => {
  try {
    if (!email) {
      throw new Error(ERROR_MESSAGE.EMAIL_REQUIRED || "Email is required");
    }

    const msg = {
      to: email, // user email
      from: process.env.SENDGRID_VERIFIED_EMAIL, // verified email
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}`,
      html: `<p><strong>Your OTP is:</strong> ${otp}</p>`,
    };

    const response = await sgMail.send(msg);
    return response;
    
  } catch (error) {
    throw new Error(error.message);
  }
};



module.exports = { sendOtpPhone, sendOtpEmail };
