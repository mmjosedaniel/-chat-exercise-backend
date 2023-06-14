import { Router } from 'express';
import { login, signup } from '../controllers/auth';



const router = Router();

router.put('/signup', signup);

router.post('/login', login);

export default router;