import { Router } from 'express';
import { cadastrar, login, promoverAdmin } from '../controllers/authController.js';

const router = Router();

router.post('/cadastrar', cadastrar);
router.post('/login', login);
router.post('/promover-admin', promoverAdmin);

export default router;