import express from 'express';
const router = express.Router();
import { getProducts,getProductById,createProduct,updateProduct,deleteProduct} from '../controllers/productController.js';
import upload from '../middleware/uploadMiddleware.js';

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.route('/').post(upload.single('image'), createProduct);
router.route('/:id').put(upload.single('image'), updateProduct);
router.route('/:id').delete(deleteProduct);

export default router;  