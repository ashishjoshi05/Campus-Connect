import express from 'express';
import { getNotices, createNotice, deleteNotice } from '../controllers/noticeController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getNotices)
  .post(protect, authorize('admin'), createNotice);

router.route('/:id')
  .delete(protect, authorize('admin'), deleteNotice);

export default router;