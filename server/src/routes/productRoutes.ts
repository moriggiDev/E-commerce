import { Router } from 'express';
import { autenticar } from '../middlewares/authMiddleware.js';
import { criarProduto, listarProduto, apagarProduto } from '../controllers/productController.js';

const router = Router();

router.get('/', listarProduto);
router.post('/', autenticar, criarProduto);
router.delete('/:id', autenticar, apagarProduto);

export default router;