import { Router } from 'express';
import express from 'express';

import * as controllers from '../controllers/index.js'

const router = Router();

router.use(express.json());

router.post('/', controllers.createNewTransaction);
router.get('/', controllers.fetchAllTransactions);
router.get('/:id', controllers.fetchTransactionByOrderId);
router.put('/:id', controllers.modifyTransaction);
router.delete('/:id', controllers.removeTransaction);
router.post('/create-order', controllers.createOrderController);



export default router;
