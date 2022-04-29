const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'hello@josephvillajin.com',
        subject: 'Thanks for joining in - Task App',
        text: `Welcome to the app, ${name}. Your account was been created. Let me know how you get along with the app.`,
    });
};

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'hello@josephvillajin.com',
        subject: 'Sad to see you go! - Task App',
        text: `${name}, we are sad to see you go, but completely understand. Your account was been canceled. Is there anything we could have done to keep you?`,
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail,
};
