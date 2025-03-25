import express from 'express';

import { getResources, createResource, updateResource, deleteResource } from '../controllers/resource.controller.js';

const router = express.Router();

router.get('/', getResources);
router.post('/', createResource);
router.put('/:id', updateResource);
router.delete('/:id', deleteResource);

export default router;