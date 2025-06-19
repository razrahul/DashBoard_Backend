require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require("./propertyResolver");

// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

// async function createMessage() {
//   const message = await client.messages.create({
//     body: "This is the ship that made the Kessel Run in fourteen parsecs?",
//     from: "+15017122661",
//     to: "+15558675310",
//   });

//   console.log(message.body);
// }

// createMessage();

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
    // console.log("@@@@message", message);

    // console.log(`OTP sent to ${phoneNumber}: ${message}`);
    return message.body;
  } catch (error) {
    console.error(`Error sending OTP to ${phoneNumber}: ${error.message}`);
    throw error;
  }
};

module.exports = { sendOtpPhone };
