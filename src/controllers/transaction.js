import * as services from "../services";
export const createOrderController = async (req, res) => {
    const totalAmount = req.body.totalAmount;
    try {
        const orderId = await services.createPaypalOrder(totalAmount);
        console.log("check controller>>>", orderId)
        res.status(200).json({ message: orderId });
    } catch (error) {
        console.error("Error creating PayPal order:", error);
        res.status(500).json({ error: "Failed to create PayPal order" });
    }
};
export const initiatePayment = async (req, res) => {
    const { amount, orderInfo, redirectUrl, ipnUrl } = req.body;

    try {
        const paymentResponse = await services.createPayment(amount, orderInfo, redirectUrl, ipnUrl);
        res.json(paymentResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Create a new transaction
export const createNewTransaction = async (req, res) => {
    try {
        const transactionData = req.body;
        const newTransaction = await services.createTransaction(transactionData);
        return res.status(201).json(newTransaction);
    } catch (error) {
        console.error('Error in createNewTransaction controller:', error);
        return res.status(500).json({ error: 'Failed to create transaction' });
    }
};

// Get all transactions
export const fetchAllTransactions = async (req, res) => {
    try {
        const transactions = await services.getAllTransactions();
        return res.status(200).json(transactions);
    } catch (error) {
        console.error('Error in fetchAllTransactions controller:', error);
        return res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};

// Get transaction by ID
export const fetchTransactionByOrderId = async (req, res) => {
    try {
        const orderId = req.params.id; // Lấy orderId từ tham số URL
        const transaction = await services.getTransactionByOrderId(orderId); // Gọi hàm dịch vụ tương ứng
        return res.status(200).json(transaction);
    } catch (error) {
        console.error('Error in fetchTransactionByOrderId controller:', error);
        return res.status(404).json({ error: 'Transaction not found for this order' });
    }
};

// Update a transaction
export const modifyTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const updatedData = req.body;
        const updatedTransaction = await services.updateTransaction(transactionId, updatedData);
        return res.status(200).json(updatedTransaction);
    } catch (error) {
        console.error('Error in modifyTransaction controller:', error);
        return res.status(500).json({ error: 'Failed to update transaction' });
    }
};

// Delete a transaction
export const removeTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        await services.deleteTransaction(transactionId);
        return res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Error in removeTransaction controller:', error);
        return res.status(500).json({ error: 'Failed to delete transaction' });
    }
};
