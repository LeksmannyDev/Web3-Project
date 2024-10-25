import express from 'express';
import { getTransactionHistory } from '../Controllers/trasactionsController.js';

const router = express.Router();

router.post('/transactions', getTransactionHistory);

export default router;
