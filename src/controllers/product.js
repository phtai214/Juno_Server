import * as services from "../services";
import Joi from 'joi';
const cloudinary = require('cloudinary').v2;

export const handleCreateNewProduct = async (req, res) => {
    const fileData = req.files;
    const { name, description, price, quantity, category, variations, tag } = req.body; // Lấy các trường khác
    const { product_code, design, material, colors, origin, vat_included } = req.body.productDetails;

    // Lấy hình ảnh chính và bổ sung
    const image = fileData['image'] ? fileData['image'][0].path : null;
    const productImages = fileData['productImages'] ? fileData['productImages'].map(file => file.path) : [];

    try {
        // Validate dữ liệu đầu vào
        const productSchema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
            category: Joi.string().required(),
            tag: Joi.array().items(Joi.string()).required(),
            variations: Joi.array().items(
                Joi.object({
                    size: Joi.string().required(),
                    color: Joi.string().required(),
                    quantity: Joi.number().required(),
                    imageUrl: Joi.string().optional() // Chỉnh sửa ở đây để cho phép không có hình ảnh
                })
            ).required(),
            product_code: Joi.string().required(),
            design: Joi.string().required(),
            material: Joi.string().required(),
            colors: Joi.string().required(),
            origin: Joi.string().required(),
            vat_included: Joi.boolean().required()
        });

        const { error } = productSchema.validate({ name, description, price, quantity, category, variations, design, material, colors, origin, vat_included, product_code, tag });

        // Xử lý biến thể
        const variationsData = variations.map((variation, index) => ({
            size: variation.size,
            color: variation.color,
            quantity: variation.quantity,
            imageUrl: fileData[`variations[${index}][image]`] ? fileData[`variations[${index}][image]`][0].path : null
        }));

        if (error) {
            console.log('Validation Error:', error.details);
            return res.status(400).json({ error: error.details[0].message });
        }

        // Tạo chi tiết sản phẩm
        const productDetails = {
            product_code,
            design,
            material,
            colors,
            origin,
            vat_included
        };

        // Gọi service createNewProduct và truyền thêm productDetails
        const result = await services.createNewProduct({
            name,
            description,
            price,
            quantity,
            category,
            variations: variationsData,
            tag,
            image, // Thêm ảnh chính vào dữ liệu
            productImages, // Thêm các hình ảnh bổ sung vào dữ liệu
            productDetails // Thêm chi tiết sản phẩm
        });

        return res.status(201).json(result); // Trả về mã 201 khi tạo thành công
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(error);
    }
};


export const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là 1
        const limit = parseInt(req.query.limit) || 10; // Số sản phẩm trên mỗi trang, mặc định là 10

        const productsData = await services.getAllProducts(page, limit);

        return res.status(200).json(productsData);
    } catch (error) {
        console.error('Error in getProducts controller:', error);
        return res.status(500).json({ error: 'Failed to fetch products' });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await services.getProductById(id);
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return res.status(404).json({ error: 'Product not found' });
    }
};

export const getProductBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const product = await services.getProductBySlug(slug);
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product by slug:', error);
        return res.status(404).json({ error: 'Product not found' });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body; // Dữ liệu cập nhật từ client
    try {
        const product = await services.updateProduct(id, updatedData);
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(404).json({ error: 'Product not found' });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await services.deleteProduct(id);

        if (result.err) {
            // Nếu có lỗi trong quá trình xóa sản phẩm
            return res.status(404).json({ error: result.mes });
        }

        // Trả về thông báo thành công
        return res.status(200).json({ message: result.mes });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ error: 'Internal server error' }); // Trả về lỗi server
    }
};