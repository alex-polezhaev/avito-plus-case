import mongoose from 'mongoose';
import Task from '../models/Task.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

export const createTaskController = async (req, res) => {
  try {
    const payload = req.body;

    // Reject if the payload is empty
    if (Object.keys(payload).length === 0 || !payload) {
      return res.status(400).end('empty body payload');
    }

    try {
      new Task(payload)
        .save()
        .then((task) => res.status(201).json(task))
        .catch((err) => res.status(400).end(err.message));
    } catch (error) {
      handleServerError(res, error);
    }
  } catch (error) {
    handleServerError(res, error);
  }
};

export const updateTaskController = async (req, res) => {
  const payload = req.body;
  const { taskID } = req.params;

  // Reject if the payload is empty
  if (Object.keys(payload).length === 0 || !payload) {
    return res.status(400).end('empty body payload');
  }

  // Reject if the id is not a valid mongo id
  if (!mongoose.Types.ObjectId.isValid(taskID)) {
    return res.status(400).end('invalid mongo id');
  }

  try {
    const task = await Task.findByIdAndUpdate(taskID, payload, {
      new: true,
    });

    if (task) res.status(200).json(task);
    else res.status(404).end('task not found');
  } catch (error) {
    handleServerError(res, error);
  }
};

export const getSlidesTasksByAccIdController = (req, res) => {
  try {
    const { accID } = req.params;
    if (!accID) {
      return res
        .status(400)
        .json({ message: 'No account ID' });
    }
    Task.find({ service: 'slides', is_used: false })
      .sort([['createdAt', -1]])
      .then((tasks) => {
        res.status(200).json(tasks);
      });
  } catch (error) {
    handleServerError(res, error);
  }
};

export const updateUsedTasksByAccIdController = (req, res) => {
  try {
    const { accID } = req.params;
    const {
      service,
      date,
    } = req.body;

    if (!accID || !service || !date) {
      return res
        .status(400)
        .json({
          message: 'Not enough data',
          data: {
            accID,
            service,
            date,
          },
        });
    }

    const filter = {
      acc_id: accID,
      service,
      createdAt: {
        $lt: new Date(date),
      },
    };

    const update = {
      is_used: true,
    };

    Task
      .updateMany(filter, update)
      .then(() => {
        res
          .status(200)
          .json({ message: 'Successfully updated' });
      });
  } catch (error) {
    handleServerError(res, error);
  }
};
