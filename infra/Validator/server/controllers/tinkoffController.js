import axios from 'axios';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

const handleAsyncServerError = (res) => (error) => {
  console.error(error);
  res.status(500).json({ error });
};

const tinkoffHost = process.env.TINKOFF_HOST;

export const paymentInitController = async (req, res) => {
  const { amount, userID } = req.body;
  const body = { amount, userID };
  try {
    const link = `${tinkoffHost}/payment/init`;
    const response = await axios
      .post(link, body)
      .catch(handleAsyncServerError(res));
    res.status(response.status).json(response.data);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const catchPaymentController = async (req, res) => {
  try {
    res.status(302).redirect(`${process.env.FRONTEND_DOMAIN}/subscription`);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const changeTariffController = async (req, res) => {
  try {
    const { accID, newMonthPrice } = req.body;
    const body = { accID, newMonthPrice };
    const link = `${tinkoffHost}/tariff/change`;
    const response = await axios
      .patch(link, body)
      .catch(handleAsyncServerError(res));
    res.status(response.status).send(response.statusText);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const renewTariffController = async (req, res) => {
  try {
    const { accID } = req.body;
    const body = { accID };
    const link = `${tinkoffHost}/tariff/renew`;
    const response = await axios
      .patch(link, body)
      .catch(handleAsyncServerError(res));
    res.status(response.status).send(response.statusText);
  } catch (error) {
    handleServerError(res, error);
  }
};

// https://developer.tinkoff.ru/docs/intro/webhook
export const statusPaymentController = async (req, res) => {
  try {
    const { PaymentId, Status } = req.body;

    if (!PaymentId) {
      return res.status(400).json({ message: 'PaymentId required ' });
    }
    if (!Status || Status !== 'CONFIRMED') {
      return res.status(400).json({ message: 'Status is not "CONFIRMED" ' });
    }

    const link = `${tinkoffHost}/payment/status`;
    await axios
      .post(link, req.body)
      .then((response) => {
        res.status(response.status).send(response.data);
      })
      .catch((error) => {
        if (error.response.status) {
          return res.status(error.response.status).json(error.response.data);
        }
        throw new Error(error.message);
      });
  } catch (error) {
    handleServerError(res, error);
  }
};
