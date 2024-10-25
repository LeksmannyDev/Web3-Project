import axios from 'axios';


export const getTransactionHistory = async (req, res, next) => {
    const { address } = req.body;
    const apiKey = process.env.POLYGONSCAN_API_KEY;
    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }


    const url = `https://api-cardona-zkevm.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`
    try {
        const response = await axios.get(url);

        if (response.data.status !== '1') {
            return res.status(400).json({ error: response.data.message });
        }

        res.json(response.data.result);
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        next(error);
    }
};
