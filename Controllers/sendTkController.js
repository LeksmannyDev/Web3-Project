import { ethers } from 'ethers';
import { testnetJSONRPC } from "../helpers/rpc.js";
import { tokenABI } from "../helpers/tokenABI.js";
import { decrypt } from "../helpers/env_helpers.js"

//Send ERC20 Token Controller
export const sendERC20Token = async (req, res, next) => {
    const { senderPrivateKey, recipientAddress, amount, contractAddress } = req.body;


    if (!senderPrivateKey || !recipientAddress || !amount || !contractAddress) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const provider = new ethers.JsonRpcProvider(testnetJSONRPC.polygonZkEVM);
        const wallet = new ethers.Wallet(senderPrivateKey, provider);

        const tokenContract = new ethers.Contract(contractAddress, tokenABI, wallet);

        const decimals = await tokenContract.decimals();
        const numberOfTokens = ethers.parseUnits(amount.toString(), decimals);


        const tx = await tokenContract.transfer(recipientAddress, numberOfTokens);
        const receipt = await tx.wait();

        res.json({
            message: 'ERC20 token sent successfully',
            transactionHash: receipt.transactionHash
        });

    } catch (error) {
        console.error('Error sending ERC20 token:', error);
        next(error);
    }
};



// Send Native Token Controller
export const sendNativeToken = async (req, res, next) => {
    const { toAddress, amount, privateKey } = req.body;

    if (!toAddress || !amount || !privateKey) {
        return res.status(400).json({ error: 'Missing required fields' });
    }


    try {
        const provider = new ethers.JsonRpcProvider(testnetJSONRPC.polygonZkEVM);
        const decryptedPrivateKey = decrypt(privateKey);

        const walletInstance = new ethers.Wallet(decryptedPrivateKey, provider);

        const tx = await walletInstance.sendTransaction({
            to: toAddress,
            value: ethers.parseEther(amount.toString())
        });

        const receipt = await tx.wait();

        res.json({
            message: 'Native token sent successfully',
            transactionHash: receipt.transactionHash
        });

    } catch (error) {
        console.error('Error making transfer:', error);

        next(error);
    }
};
