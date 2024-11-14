import { Router } from 'express';
import express from 'express';
import uploadCloud2 from '../middleware/cloudinary2.js'

import * as controllers from '../controllers/index.js'

const router = Router();

router.use(express.json());

router.post('/shops', uploadCloud2, controllers.createNewShop);
router.get('/shops', controllers.fetchAllShops);
router.get('/shops/:id', controllers.fetchShopById);
router.put('/shops/:id', uploadCloud2, controllers.modifyShop);
router.delete('/shops/:id', controllers.removeShop);



export default router;
