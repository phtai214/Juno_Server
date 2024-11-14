import { Router } from 'express';
import express from 'express';

import * as controllers from '../controllers/index.js'

const router = Router();

router.use(express.json());

router.post('/', controllers.createNewOrderItem);
router.get('/', controllers.fetchAllOrderItems);
router.get('/:id', controllers.fetchOrderItemById);
router.get('/order/:orderId', controllers.fetchOrderItems);
router.put('/:id', controllers.modifyOrderItem);
router.delete('/:id', controllers.removeOrderItem);



export default router;
