import { api } from '../api/index.js';
import createFolder from '../service/createFolder.js';
import exhangeCodeToToken from '../service/exhangeCodeToToken.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

/**
 * @api {get} /yandex/token Get yandex token
 * @apiName getYandexToken
 * @apiGroup Token
 *
 * @apiParam {String} code
 * @apiParam {String} state:accID
 */
export const getYandexToken = async (req, res) => {
  const { code, state: accID } = req.query;

  if (!code || !accID) {
    return res.status(400).end('can not found code or accID');
  }

  try {
    await exhangeCodeToToken(code)
      .then(({ token, expirationDate, refreshToken }) => api('mongo')
        .patch(`/accounts/${accID}`, {
          yandex_token: {
            token,
            refresh_token: refreshToken,
            expiration_date: expirationDate,
          },
        }))
      .then(() => createFolder(accID));

    return res.status(200).send(`${process.env.FRONTEND_DOMAIN}/accounts`);
  } catch (error) {
    handleServerError(res, error);
  }
};
