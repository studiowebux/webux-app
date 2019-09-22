function InitWebuxMailer() {
  console.log(`\x1b[33mWebuxJS - Configure Mailer\x1b[0m`);
  return webuxMailer.init(this.config.mailer, this.app, this.log);
}

function SendMail(sender, recipient, subject, text, body) {
  console.log(`\x1b[33mWebuxJS - Configure Mailer\x1b[0m`);
  return webuxMailer.mail(sender, recipient, subject, text, body);
}

module.exports = {
  InitWebuxMailer,
  SendMail
};
