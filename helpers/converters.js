import { ethers } from 'ethers';

/**
 * Converts a human-readable token amount to the smallest unit.
 * @param {string} amount - The human-readable amount (e.g., 0.2 for USDC)
 * @param {number} decimals - The number of decimals the token uses (e.g., 6 for USDC)
 * @returns {BigNumber} The amount in the smallest unit
 */
const convertToTokenUnits = (amount, decimals) => {
    return ethers.parseUnits(amount, decimals);
};

/**
 * Converts an amount from the smallest unit to human-readable format.
 * @param {BigNumber} amount - The amount in the smallest unit
 * @param {number} decimals - The number of decimals the token uses (e.g., 6 for USDC)
 * @returns {string} The human-readable token amount
 */
const convertFromTokenUnits = (amount, decimals) => {
    return ethers.formatUnits(amount, decimals);
};

export { convertFromTokenUnits, convertToTokenUnits };
