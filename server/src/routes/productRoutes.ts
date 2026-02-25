import { Router } from 'express';
import { autenticar } from '../middlewares/authMiddleware.js';
import { criarProduto, listarProdutos, apagarProduto, listarProdutoPorId } from '../controllers/productController.js';

const router = Router();

router.get('/', listarProdutos);
router.post('/', autenticar, criarProduto);
router.delete('/:id', autenticar, apagarProduto);
router.get('/:id', listarProdutoPorId);

export default router;