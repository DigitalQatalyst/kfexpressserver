import { Router } from 'express';
import { getAllProducts, getProductById } from '../controllers/productController';

const router = Router();

router.post('/all', getAllProducts);
router.post('/single', getProductById);

export default router;