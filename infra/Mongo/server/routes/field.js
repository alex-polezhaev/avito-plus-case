import express from 'express';
import {
  getAllFieldsController,
  getFieldByCategoryController,
  getFieldByFullnameController,
  getTagsFromFieldsController,
} from '../controllers/fieldController.js';

const router = express.Router();

router.get('/fields', getAllFieldsController);
router.get('/fields/:category', getFieldByCategoryController);
router.get('/tags_from_fields', getTagsFromFieldsController);
router.get('/fields/full/:fullName', getFieldByFullnameController);

export default router;
