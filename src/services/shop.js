import db from "../models/index";
import cloudinary from "cloudinary"; // Đảm bảo bạn đã import Cloudinary

// Create a new shop
export const createShop = async ({ name, location, phone_number, img, url_map }) => {
    try {
        // Upload ảnh lên Cloudinary
        let uploadedImageUrl = null;
        if (img) {
            const uploadedImage = await cloudinary.uploader.upload(img);
            uploadedImageUrl = uploadedImage.secure_url;
        }

        // Tạo cửa hàng mới
        const newShop = await db.Shop.create({
            name,
            location,
            phone_number,
            img: uploadedImageUrl, // Sử dụng URL ảnh đã tải lên
            url_map
        });

        return {
            err: 0,
            mes: 'Shop created successfully.',
            shop: newShop,
        };
    } catch (error) {
        console.error('Error creating shop:', error);
        throw error;
    }
};

// Get all shops
export const getAllShops = async () => {
    try {
        const shops = await db.Shop.findAll();
        return shops;
    } catch (error) {
        console.error('Error fetching shops:', error);
        throw error;
    }
};

// Get shop by ID
export const getShopById = async (shopId) => {
    try {
        const shop = await db.Shop.findByPk(shopId);
        if (!shop) {
            throw new Error('Shop not found');
        }
        return shop;
    } catch (error) {
        console.error('Error fetching shop by ID:', error);
        throw error;
    }
};

// Update a shop
export const updateShop = async (shopId, updatedData) => {
    try {
        const shop = await db.Shop.findByPk(shopId);
        if (!shop) {
            throw new Error('Shop not found');
        }

        // Xử lý tải ảnh mới lên Cloudinary nếu có
        let uploadedImageUrl = shop.img; // Giữ nguyên ảnh cũ nếu không có ảnh mới
        if (updatedData.img) {
            const uploadedImage = await cloudinary.uploader.upload(updatedData.img);
            uploadedImageUrl = uploadedImage.secure_url; // Cập nhật URL ảnh mới
        }

        // Cập nhật thông tin cửa hàng
        const updatedShop = await shop.update({
            name: updatedData.name,
            location: updatedData.location,
            phone_number: updatedData.phone_number,
            img: uploadedImageUrl, // Sử dụng URL ảnh đã tải lên
            url_map: updatedData.url_map
        });

        return {
            err: 0,
            mes: 'Shop updated successfully.',
            shop: updatedShop,
        };
    } catch (error) {
        console.error('Error updating shop:', error);
        return {
            err: 1,
            mes: 'Failed to update shop.',
        };
    }
};
// Delete a shop
export const deleteShop = async (shopId) => {
    try {
        const shop = await db.Shop.findByPk(shopId);
        if (!shop) {
            throw new Error('Shop not found');
        }
        await shop.destroy();
        return { message: 'Shop deleted successfully' };
    } catch (error) {
        console.error('Error deleting shop:', error);
        throw error;
    }
};
