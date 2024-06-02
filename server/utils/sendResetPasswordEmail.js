const sendEmail = require('./sendEmail');

const sendResetPasswordEmail = async ({ name, email, verificationCode }) => {
    const message = `<p>Your verification code is: <strong>${verificationCode}</strong></p>
                     <p>Please use this code to reset your password.</p>`;
    
    return sendEmail({
        to: email,
        subject: 'Password Reset',
        html: `<h4>Hello, ${name}</h4>${message}`,
    });
};

module.exports = sendResetPasswordEmail;