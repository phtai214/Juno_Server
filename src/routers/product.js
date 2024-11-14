import express from 'express';
import * as controllers from '../controllers/index.js'
import uploadCloud from '../middleware/cloudinary.js';

const router = express.Router();


// Endpoint để tạo sản phẩm mới
router.post('/create', uploadCloud, controllers.handleCreateNewProduct);
router.get('/products', controllers.getProducts);
router.get('/:id', controllers.getProductById); // Lấy sản phẩm theo ID
router.get('/slug/:slug', controllers.getProductBySlug); // Lấy sản phẩm theo slug
router.put('/:id', uploadCloud, controllers.updateProduct); // Cập nhật sản phẩm
router.delete('/:id', controllers.deleteProduct); // Xóa sản phẩm

export default router;
