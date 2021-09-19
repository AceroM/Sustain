const { getExpectedTwilioSignature } = require('twilio/lib/webhooks/webhooks');

// Retrieve your auth token from the environment instead of hardcoding it
const authToken = process.env.TWILIO_AUTH_TOKEN;
console.log(`authToken :>> `, authToken)

// Declare any paramaeters being sent to your Function
const payload = {
  Body: 'Miguel is sending you Pizza in 3 hours, from 1580 Point W Blvd, Coppell, TX 75019!',
};

// Use the Twilio helper to generate your valid signature!
// The first argument is your Twilio auth token.
// The second is the full URL of your Function.
// The third is any payload you are sending (or {} if none).
const xTwilioSignature = getExpectedTwilioSignature(
  authToken,
  'https://pinnacle-6257.twil.io/text',
  payload
);

// Print the signature to the console for use with your HTTP client of choice
console.log('xTwilioSignature: ', xTwilioSignature);

// For example, output will look like this:
// xTwilioSignature: coGTEaFEMv8ejgNGtgtUsbL8r7c