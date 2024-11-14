import * as services from "../services";

// Create a new shop
export const createNewShop = async (req, res) => {
    try {
        // Lấy dữ liệu từ request body
        const { name, location, phone_number, url_map } = req.body;

        // Lấy file ảnh từ request
        const img = req.file ? req.file.path : null; // Giả sử file ảnh được lưu trong req.file.path

        // Tạo đối tượng shopData
        const shopData = {
            name,
            location,
            phone_number,
            img,
            url_map
        };

        const newShop = await services.createShop(shopData);
        return res.status(201).json({
            err: 0,
            mes: 'Shop created successfully.',
            shop: newShop,
        });
    } catch (error) {
        console.error('Error in createNewShop controller:', error);
        return res.status(500).json({ error: 'Failed to create shop' });
    }
};

// Get all shops
export const fetchAllShops = async (req, res) => {
    try {
        const shops = await services.getAllShops();
        return res.status(200).json(shops);
    } catch (error) {
        console.error('Error in fetchAllShops controller:', error);
        return res.status(500).json({ error: 'Failed to fetch shops' });
    }
};

// Get shop by ID
export const fetchShopById = async (req, res) => {
    try {
        const shopId = req.params.id;
        const shop = await services.getShopById(shopId);
        return res.status(200).json(shop);
    } catch (error) {
        console.error('Error in fetchShopById controller:', error);
        return res.status(404).json({ error: 'Shop not found' });
    }
};

// Update a shop
export const modifyShop = async (req, res) => {
    try {
        const shopId = req.params.id;

        // Lấy dữ liệu từ req.body và req.file (nếu có tệp ảnh)
        const updatedData = {
            name: req.body.name,
            location: req.body.location,
            phone_number: req.body.phone_number,
            img: req.file ? req.file.path : null, // Giả sử bạn đã cấu hình multer để lưu tệp
            url_map: req.body.url_map,
        };

        const updatedShop = await services.updateShop(shopId, updatedData);
        return res.status(200).json(updatedShop);
    } catch (error) {
        console.error('Error in modifyShop controller:', error);
        return res.status(500).json({ error: 'Failed to update shop' });
    }
};

// Delete a shop
export const removeShop = async (req, res) => {
    try {
        const shopId = req.params.id;
        await services.deleteShop(shopId);
        return res.status(200).json({ message: 'Shop deleted successfully' });
    } catch (error) {
        console.error('Error in removeShop controller:', error);
        return res.status(500).json({ error: 'Failed to delete shop' });
    }
};
