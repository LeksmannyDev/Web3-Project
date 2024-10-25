import express from 'express';
import walletRoutes from './Routes/wallet.routes.js';
import {router as sendToken}  from './Routes/sendTk.routes.js'
import balanceRoutes from './Routes/balance.routes.js';
import transactionRoutes from './Routes/transactions.routes.js';

const app = express();
app.use(express.json());


app.use('/api/wallet', walletRoutes);

app.use('/api/sendToken', sendToken);

app.use('/api/wallet', balanceRoutes);

app.use('/api', transactionRoutes);



export default app;

