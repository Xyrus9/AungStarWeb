import express from 'express';
const router = express.Router();
import { getProducts,getProductById,createProduct,updateProduct,deleteProduct} from '../controllers/productController.js';

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.route('/').post(createProduct);
router.route('/:id').put(updateProduct);
router.route('/:id').delete(deleteProduct);

export default router;  