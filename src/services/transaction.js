import db from "../models/index";
import paypal from "@paypal/checkout-server-sdk";
require('dotenv').config();

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;


const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export const createPaypalOrder = async (totalAmount) => {
    const price = parseFloat(totalAmount);
    console.log("check >>", totalAmount)
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                reference_id: 'default',
                amount: {
                    currency_code: 'USD',
                    value: price.toFixed(2),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: price.toFixed(2),
                        },
                    },
                },
                items: [
                    {
                        name: "Book of React",
                        description: "A book about React",
                        quantity: "1",
                        unit_amount: {
                            currency_code: "USD",
                            value: price.toFixed(2),
                        },
                    },
                ],
            },
        ],
    });

    try {
        const response = await client.execute(request);
        console.log("PayPal order response:", response.result.id);
        return response.result.id;
    } catch (error) {
        console.log("check err >>>", error)
        console.error("Error creating PayPal order:", error);
        throw new Error("Failed to create PayPal order");
    }

};


// Create a new transaction
export const createTransaction = async (transactionData) => {
    try {
        const newTransaction = await db.Transaction.create(transactionData);
        return newTransaction;
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw error;
    }
};

// Get all transactions
export const getAllTransactions = async () => {
    try {
        const transactions = await db.Transaction.findAll();
        return transactions;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
};

// Get transaction by ID
export const getTransactionByOrderId = async (orderId) => {
    try {
        const transaction = await db.Transaction.findOne({
            where: { order_id: orderId } // Tìm giao dịch dựa trên order_id
        });
        if (!transaction) {
            throw new Error('Transaction not found for this order');
        }
        return transaction;
    } catch (error) {
        console.error('Error fetching transaction by order ID:', error);
        throw error;
    }
};

// Update a transaction
export const updateTransaction = async (transactionId, updatedData) => {
    try {
        const transaction = await db.Transaction.findByPk(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        const updatedTransaction = await transaction.update(updatedData);
        return updatedTransaction;
    } catch (error) {
        console.error('Error updating transaction:', error);
        throw error;
    }
};

// Delete a transaction
export const deleteTransaction = async (transactionId) => {
    try {
        const transaction = await db.Transaction.findByPk(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        await transaction.destroy();
        return { message: 'Transaction deleted successfully' };
    } catch (error) {
        console.error('Error deleting transaction:', error);
        throw error;
    }
};
