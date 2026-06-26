import axios from 'axios';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

const handleAsyncServerError = (res) => (error) => {
  console.error(error);
  res.status(500).json({ error });
};

const mongoHost = process.env.MONGO_HOST;
const googleHost = process.env.GOOGLE_HOST;
const yandexHost = process.env.YANDEX_HOST;

const getUserById = async (id) => {
  const url = `${mongoHost}/users/${id}`;
  const user = await axios.get(url)
    .then((resp) => resp.data);
  return user;
};

const updateUserById = async (id, data) => {
  const url = `${mongoHost}/users/${id}`;
  const user = await axios.patch(url, data)
    .then((resp) => resp.data);
  return user;
};

const updateAccById = async (id, data) => {
  const url = `${mongoHost}/accounts/${id}`;
  const acc = await axios.patch(url, data)
    .then((resp) => resp.data);
  return acc;
};

const getAccsByUserId = async (id) => {
  const url = `${mongoHost}/accounts/byUser/${id}`;
  const accs = await axios.get(url)
    .then((resp) => resp.data);
  return accs;
};

const getSpecsByAccId = async (id) => {
  const url = `${mongoHost}/specs/byAcc/${id}`;
  const specs = await axios.get(url)
    .then((resp) => resp.data);
  return specs;
};

const getAccById = async (id) => {
  const url = `${mongoHost}/accounts/${id}`;
  const acc = await axios.get(url)
    .then((resp) => resp.data);
  return acc;
};

const getFields = async () => {
  const url = `${mongoHost}/fields`;
  const fields = await axios.get(url)
    .then((resp) => resp.data);
  return fields;
};

const editSpreadsheetTitle = async (spreadsheetId, newTitle) => {
  const body = { spreadsheetId, newTitle };
  const url = `${googleHost}/table/title`;
  const result = await axios.patch(url, body)
    .then((resp) => resp.data);
  return result;
};

const editFolderTitle = async (acc, newTitle) => {
  const body = { acc, newTitle };
  const url = `${yandexHost}/folder`;
  const result = await axios.patch(url, body)
    .then((resp) => resp.data);
  return result;
};

const createTask = async (body) => {
  const url = `${mongoHost}/tasks`;
  const result = await axios.post(url, body)
    .then((resp) => resp.data);
  return result;
};

// User

export const getUserByIdController = (req, res) => {
  try {
    getUserById(req.user.id)
      .then((user) => {
        const successTransactions = user.transactions
          .filter(({ success }) => success)
          .sort((a, b) => b.date - a.date);
        const newUser = {
          ...user,
          transactions: successTransactions,
        };
        res
          .status(200)
          .json(newUser);
      }).catch(handleAsyncServerError(res));
  } catch (error) {
    handleServerError(res, error);
  }
};

export const updateUserFirstnameByIdController = (req, res) => {
  const { firstname } = req.body;
  updateUserById(req.user.id, { firstname })
    .then((result) => {
      res
        .status(200)
        .json(result);
    }).catch(handleAsyncServerError(res));
};

// Account

export const updateAccByIdController = (req, res) => {
  console.log(`ACCOUNT DATA UPDATE REQUEST ${req.body}`);
  const {
    yandex_token: token, avito, renewable, archived, automatic,
  } = req.body;

  updateAccById(req.params.accID, {
    yandex_token: token, avito, renewable, archived, automatic,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(handleAsyncServerError(res));
};

export const getAccsByUserIdController = (req, res) => {
  getAccsByUserId(req.user.id)
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch(handleAsyncServerError(res));
};

export const getAccsAndSpecsByUserIdController = (req, res) => {
  getAccsByUserId(req.user.id)
    .then((accounts) => Promise.all(
      accounts.map(async (acc) => {
        const account = { ...acc };
        account.specs = await getSpecsByAccId(acc._id);
        return account;
      }),
    ))
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch(handleAsyncServerError(res));
};

export const editAccountTitleController = async (req, res) => {
  const { accID } = req.params;
  const { newTitle } = req.body;

  try {
    const acc = await getAccById(accID);

    if (acc.title === newTitle) {
      return res.status(200).send('Account have the same title');
    }

    // Update the title in the database
    await updateAccById(accID, { title: newTitle })
      .catch((err) => {
        console.error(err);
        throw new Error('Error while updating title in db');
      });

    // Update the spreadsheet name
    await editSpreadsheetTitle(acc.table_id, newTitle)
      .catch((err) => {
        console.error(err);
        throw new Error('Error while updating title in google sheet');
      });

    if (acc?.yandex_token?.token) {
      // Update the folder name on Yandex Disk
      await editFolderTitle(acc, newTitle)
        .catch((err) => {
          console.error(err);
          throw new Error('Error while updating title in yandex sheet');
        });
    }

    return res.status(200).send('Account title updated successfully');
  } catch (error) { handleServerError(res); }
};

// Specs

export const getSpecsByAccIdController = (req, res) => {
  getSpecsByAccId(req.params.accID)
    .then((specs) => {
      res
        .status(200)
        .json(specs);
    }).catch(handleAsyncServerError(res));
};

// Fields

// Get all available categories
export const getFieldsController = (req, res) => {
  getFields()
    .then((fields) => {
      const newFields = fields
        .filter((field) => field.categoryName !== 'General tags')
        .map(({ fullName }) => fullName)
        .sort();
      res.status(200).json(newFields);
    })
    .catch(handleAsyncServerError(res));
};

export const getPossibleFieldsController = async (req, res) => {
  try {
    const allFields = await getFields()
      .then((fields) => fields
        .filter((field) => field.categoryName !== 'General tags'));
    const accSpecs = await getSpecsByAccId(req.params.accID);

    const specs = await Promise.all(allFields, accSpecs).then(() => {
      const fullNames = allFields.map((spec) => spec.fullName);
      const accCategories = accSpecs.map((spec) => spec.category);
      return fullNames.filter((fullName) => !accCategories.includes(fullName));
    });

    const result = allFields
      .map((field) => {
        let output;
        specs.forEach((el) => {
          if (el === field.fullName) {
            output = el;
          }
        });
        if (output) {
          output = field;
        }
        return output;
      })
      .filter((n) => n)
      .map(({ fullName }) => fullName)
      .sort();

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

// Tasks

export const createTaskController = (req, res) => {
  try {
    const { body } = req;
    createTask(body)
      .then((tasks) => {
        res.status(201).json(tasks);
      })
      .catch((error) => {
        if (error.response.status) {
          return res
            .status(error.response.status)
            .end();
        }
        handleServerError(res, error);
      });
  } catch (error) {
    handleServerError(res, error);
  }
};
