import axios from 'axios';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

const handleAsyncServerError = () => (error) => {
  throw new Error(error.message);
};

const avitoHost = process.env.AVITO_HOST;

/**
 * setAvitoSettingsController
 * Controller for setting the XML link and configuring autoload
 */

export const setAvitoSettingsController = async (req, res) => {
  try {
    const { accID } = req.params;
    const { body } = req;
    const link = `${avitoHost}/connect/${accID}`;
    const response = await axios.put(link, body)
      .catch(handleAsyncServerError());
    res
      .status(response.status)
      .send(response.statusText);
  } catch (error) {
    handleServerError(res, error);
  }
};
