import { Router } from 'express';
import { getAllAccounts, getAccountById } from '../controllers/accountController';

const router = Router();

router.post('/all', getAllAccounts);
router.post('/single', getAccountById);

export default router;