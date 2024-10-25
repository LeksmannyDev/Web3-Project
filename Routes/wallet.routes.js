import { Router } from 'express';
import { createWallet } from '../Controllers/walletController.js';

// Create a router instance
const router = Router();


router.post('/create-wallet', createWallet);

export default router;
