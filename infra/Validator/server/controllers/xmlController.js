import fs from 'fs';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

export const loadXMLController = async (req, res) => {
  const { accID } = req.params;

  try {
    const fileStream = fs.createReadStream(`/app/xml-data/${accID}.xml`);
    res.set('Content-Type', 'text/xml');
    fileStream.pipe(res);
  } catch (error) {
    handleServerError(res, error);
  }
};
