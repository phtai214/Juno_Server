import db from "../models/index"

// Create new Cart
export const createCart = async (cartData) => {
    try {
        const newCart = await db.Cart.create(cartData);
        return newCart;
    } catch (error) {
        console.error('Error creating cart:', error);
        throw error;
    }
};

// Get all Carts
export const getAllCarts = async () => {
    try {
        const carts = await db.Cart.findAll({
            include: ['user'] // Include related model User
        });
        return carts;
    } catch (error) {
        console.error('Error fetching carts:', error);
        throw error;
    }
};

// Get Cart by ID
export const getCartById = async (cartId) => {
    try {
        const cart = await db.Cart.findByPk(cartId, {
            include: ['user'] // Include related model User
        });
        if (!cart) {
            throw new Error('Cart not found');
        }
        return cart;
    } catch (error) {
        console.error('Error fetching cart by ID:', error);
        throw error;
    }
};

// Get Cart by User ID
export const getCartByUserId = async (userId) => {
    try {
        const cart = await db.Cart.findOne({
            where: { user_id: userId },
            include: ['user', 'cartItems'] // Include related models User and CartItems
        });

        // Nếu không tìm thấy cart, trả về null thay vì ném lỗi
        return cart; // Nếu cart không tồn tại, sẽ trả về null
    } catch (error) {
        console.error('Error fetching cart by user ID:', error);
        throw error; // Ném lỗi nếu có lỗi khác xảy ra
    }
};

// Update a Cart
export const updateCart = async (cartId, updatedData) => {
    try {
        const cart = await db.Cart.findByPk(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }
        const updatedCart = await cart.update(updatedData);
        return updatedCart;
    } catch (error) {
        console.error('Error updating cart:', error);
        throw error;
    }
};

// Delete a Cart
export const deleteCart = async (cartId) => {
    try {
        const cart = await db.Cart.findByPk(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }
        await cart.destroy();
        return { message: 'Cart deleted successfully' };
    } catch (error) {
        console.error('Error deleting cart:', error);
        throw error;
    }
};
