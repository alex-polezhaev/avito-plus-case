import axios from 'axios';

const avitoAuth = async (clientId, clientSecret) => {
  const response = await axios.post(
    'https://api.avito.ru/token',
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
    {
      params: {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      },
    },
  );
  return response.data.access_token;
};

export default avitoAuth;

