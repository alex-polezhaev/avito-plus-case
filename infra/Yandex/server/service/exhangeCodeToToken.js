import axios from 'axios';

const exhangeCodeToToken = async (code) => axios.post(
  'https://oauth.yandex.ru/token',
  {
    code,
    grant_type: 'authorization_code',
    client_id: process.env.YANDEX_CLIENT_ID,
    client_secret: process.env.YANDEX_CLIENT_SECRET,
  },
  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
)
  .then(({ data }) => data)
  .then(({ access_token: token, expires_in: expiresIn, refresh_token: refreshToken }) => {
    if (!token) throw new Error('Token is undefined');
    const expirationDateInMS = Date.now() + expiresIn * 1000;
    const expirationDate = new Date(expirationDateInMS);
    return { token, expirationDate, refreshToken };
  });

export default exhangeCodeToToken;
