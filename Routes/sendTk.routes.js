import { Router } from 'express';
import { sendERC20Token, sendNativeToken } from '../Controllers/sendTkController.js';

export const router = Router();

// Define a POST route for sending ERC20 tokens
router.post('/erc20', sendERC20Token);

router.post('/native', sendNativeToken);

export default router;
