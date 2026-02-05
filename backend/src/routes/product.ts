import { Router } from 'express';
import { getAllProducts, createProduct } from '../controllers/product';
import { validateProductBody } from '../middlewares/validation';

const router = Router();

router.get('/', getAllProducts);
router.post('/', validateProductBody, createProduct);

export default router;
