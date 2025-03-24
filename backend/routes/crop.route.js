import express from 'express';

import { getCrops, createCrop, updateCrop, deleteCrop } from '../controllers/crop.controller.js';

const router = express.Router();

router.get('/', getCrops);
router.post('/', createCrop);
router.put('/:id', updateCrop);
router.delete("/:id", deleteCrop);

export default router;