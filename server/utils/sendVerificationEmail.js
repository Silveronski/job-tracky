const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({ name, email, verificationCode }) => {
  const message = `<p>Your verification code is: <strong>${verificationCode}</strong></p>
                     <p>Please use this code to verify your email address.</p>`;

  return sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `<h4>Hello, ${name}</h4>${message}`,
  });
};

module.exports = sendVerificationEmail;
