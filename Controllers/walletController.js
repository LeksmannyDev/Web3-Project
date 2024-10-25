import { ethers } from 'ethers';

export const createWallet = (req, res, next) => {
    try {
        const wallet = ethers.Wallet.createRandom();
        res.json({
            address: wallet.address,
            privateKey: wallet.privateKey
        });
    } catch (error) {
        console.error("Error creating wallet:", error);
        next(error);
    }
};


