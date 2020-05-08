const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, prenom) => {
  const msg = {
    to: email,
    from: "christopher@bunji.fr",
    subject: "Bienvenue sur Bunji APP",
    text: `Bonjour ${prenom}, bienvenue sur Bunji. `,
  };
  sgMail.send(msg);
};

const sendCancelationEmail = (email, prenom) => {
  const msg = {
    to: email,
    from: "christopher@bunji.fr",
    subject: "Au revoir",
    text: `Bonjour ${prenom}, nous sommes triste de vous voir partir. Qu'aurions pu faire autrement ? `,
  };
  sgMail.send(msg);
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
