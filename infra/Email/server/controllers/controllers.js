import sendGrid from '@sendgrid/mail';
import verificationTemplate from '../templates/verificationTemplate.js';
import changePassTemplate from '../templates/changePassTemplate.js';

sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

const dataByType = {
  verification: {
    subject: 'Account confirmation',
    template: verificationTemplate,
  },
  changePass: {
    subject: 'Password recovery',
    template: changePassTemplate,
  },
};

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

/**
 * @api {post} /email/send Send email
 * @apiName sendEmail
 * @apiGroup Email
 * @apiBody {Object} Example: {
 *  type: 'verification',
 *  link: 'http://example.com',
 *  email: 'example@mail.com'
 * }
 */

export const sendEmailController = (req, res) => {
  const {
    type,
    link,
    email,
  } = req.body;
  try {
    const data = dataByType[type];
    if (!data) {
      return res.status(404).json({ message: `Type ${type} does not exist` });
    }
    const { subject, template } = data;
    const layout = template(link);
    sendGrid.send({
      to: email,
      from: 'service@your-domain.example',
      subject,
      html: layout,
    });
    res
      .status(202)
      .json({ message: 'Letter sent' });
  } catch (error) {
    handleServerError(res, error);
  }
};
