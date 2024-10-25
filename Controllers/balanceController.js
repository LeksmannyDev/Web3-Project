import { ethers } from 'ethers';
import { testnetJSONRPC } from "../helpers/rpc.js";
import { tokenABI } from '../helpers/tokenABI.js';

export const getErc20Balance = async (req, res, next) => {
    const { walletAddress, erc20ContractAddress } = req.body;

    if (!walletAddress || !erc20ContractAddress) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    const provider = new ethers.JsonRpcProvider(testnetJSONRPC.polygonZkEVM);

    try {
        const tokenContract = new ethers.Contract(erc20ContractAddress, tokenABI, provider);

        const balance = await tokenContract.balanceOf(walletAddress);
        const decimals = await tokenContract.decimals();

        const convertedBalance = ethers.formatUnits(balance, decimals);

        res.json({ erc20Balance: convertedBalance });
    } catch (error) {
        console.error("Error fetching ERC20 balance:", error);
        next(error);
    }
};




export const nativeBalance = async (req, res, next) => {
    const { walletAddress } = req.body;

    if (!walletAddress) {
        return res.status(400).json({ error: 'Missing required parameter: walletAddress' });
    }

    const provider = new ethers.JsonRpcProvider(testnetJSONRPC.polygonZkEVM);

    try {
        const balance = await provider.getBalance(walletAddress);

        const convertedBalance = ethers.formatEther(balance);

        res.json({ nativeBalance: convertedBalance });
    } catch (error) {
        console.error("Error fetching native balance:", error);
        next(error);
    }
};
