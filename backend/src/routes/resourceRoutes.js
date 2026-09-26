import express from 'express';
import { getResources, createResource, deleteResource } from '../controllers/resourceController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getResources)
  .post(protect, authorize('faculty', 'admin'), createResource);

router.route('/:id')
  .delete(protect, authorize('faculty', 'admin'), deleteResource);

export default router;