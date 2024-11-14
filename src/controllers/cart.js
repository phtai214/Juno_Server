import * as services from '../services'

// Create a new Cart
export const createNewCart = async (req, res) => {
    try {
        const cartData = req.body;
        const newCart = await services.createCart(cartData);
        return res.status(201).json(newCart);
    } catch (error) {
        console.error('Error in createNewCart controller:', error);
        return res.status(500).json({ error: 'Failed to create cart' });
    }
};

// Get all Carts
export const fetchAllCarts = async (req, res) => {
    try {
        const carts = await services.getAllCarts();
        return res.status(200).json(carts);
    } catch (error) {
        console.error('Error in fetchAllCarts controller:', error);
        return res.status(500).json({ error: 'Failed to fetch carts' });
    }
};

// Get Cart by ID
export const fetchCartById = async (req, res) => {
    try {
        const cartId = req.params.id;
        const cart = await services.getCartById(cartId);
        return res.status(200).json(cart);
    } catch (error) {
        console.error('Error in fetchCartById controller:', error);
        return res.status(404).json({ error: 'Cart not found' });
    }
};
export const fetchCartByUserId = async (req, res) => {
    try {
        const userId = req.params.userId; // Lấy userId từ params
        const cart = await services.getCartByUserId(userId);

        // Nếu tìm thấy cart, trả về nó
        return res.status(200).json(cart);
    } catch (error) {
        console.error('Error in fetchCartByUserId controller:', error);
        // Trả về thông báo nếu không tìm thấy cart
        return res.status(200).json({ message: 'Cart not found for this user' });
    }
}
// Update a Cart
export const modifyCart = async (req, res) => {
    try {
        const cartId = req.params.id;
        const updatedData = req.body;
        const updatedCart = await services.updateCart(cartId, updatedData);
        return res.status(200).json(updatedCart);
    } catch (error) {
        console.error('Error in modifyCart controller:', error);
        return res.status(500).json({ error: 'Failed to update cart' });
    }
};

// Delete a Cart
export const removeCart = async (req, res) => {
    try {
        const cartId = req.params.id;
        await services.deleteCart(cartId);
        return res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        console.error('Error in removeCart controller:', error);
        return res.status(500).json({ error: 'Failed to delete cart' });
    }
};
