import express from 'express';
import {
  createTaskController,
  getSlidesTasksByAccIdController,
  updateTaskController,
  updateUsedTasksByAccIdController,
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/tasks/slides/:accID', getSlidesTasksByAccIdController);
router.post('/tasks', createTaskController);
router.patch('/tasks/:taskID', updateTaskController);
router.patch('/tasks/update_used/:accID', updateUsedTasksByAccIdController);

export default router;
