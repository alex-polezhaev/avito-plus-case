import sendGrid from '@sendgrid/mail';
import verificationTemplate from './templates/verificationTemplate.js';
import changePassTemplate from './templates/changePassTemplate.js';

sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendVerificationLink = (email, verificationLink) => {
  const verificationLayout = verificationTemplate(verificationLink);
  sendGrid.send({
    to: email,
    from: 'no-reply@your-domain.example',
    subject: 'Account confirmation',
    html: verificationLayout,
  });
};

export const sendResetLink = (email, resetLink) => {
  const changePassLayout = changePassTemplate(resetLink);
  sendGrid.send({
    to: email,
    from: 'no-reply@your-domain.example',
    subject: 'Password recovery',
    html: changePassLayout,
  });
};
