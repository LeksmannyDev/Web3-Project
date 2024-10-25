import { Router } from 'express';
import { getErc20Balance, nativeBalance } from '../Controllers/balanceController.js';

const router = Router();

// Route to query ERC20 balance
router.post('/erc20-balance', getErc20Balance);

router.post('/native-balance', nativeBalance);

export default router;